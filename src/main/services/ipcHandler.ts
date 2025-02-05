import { ipcMain, BrowserWindow } from 'electron';
import { TimeService } from './timeService';
import { AccountService } from './accountService';

export class IpcHandler {
  private timeService: TimeService;
  private accountService: AccountService;

  constructor(window: BrowserWindow) {
    this.timeService = new TimeService(window);
    this.accountService = new AccountService();
  }
}
