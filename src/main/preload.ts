// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { getAccountsResponse } from './services/accountService';

export type Channels = 'ipc-example' | 'send-message';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  accounts: {
    getAccounts: (chain: any) => ipcRenderer.invoke('get-accounts', chain) as Promise<getAccountsResponse>,
    // updateAccount: (id: string, name: string) => ipcRenderer.invoke('update-account', id, name),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;

(window as any).togglePesticide = () => {
  const existingStyle = document.getElementById('pesticide-style');
  if (existingStyle) {
    existingStyle.remove();
  } else {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/gh/mrmrs/pesticide/pesticide.css';
    style.id = 'pesticide-style';
    document.head.appendChild(style);
  }
};
