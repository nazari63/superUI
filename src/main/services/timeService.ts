import { BrowserWindow } from 'electron';
import { ParentService } from './parentService';
import { AppUpdater } from 'electron-updater';

export class TimeService extends ParentService {
  private interval: NodeJS.Timeout | null = null;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    super(window, appUpdater);
  }

  start() {
    this.interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      if (this.isActive()) {
        this.window?.webContents.send('update-time', time);
      }
    }, 5000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
