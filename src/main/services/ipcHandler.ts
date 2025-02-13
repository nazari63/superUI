import { ipcMain, BrowserWindow } from 'electron';
import { TimeService } from './timeService';
import { AccountService } from './accountService';
import { FoundryService } from './foundry';
import { SupersimService } from './supersimService';
import { AppService } from './app';
import { AppUpdater } from 'electron-updater';

export class IpcHandler {
  private timeService: TimeService;
  private accountService: AccountService;
  private foundryService: FoundryService;
  private supersimService: SupersimService;
  private appService: AppService;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    this.timeService = new TimeService(window, appUpdater);
    this.accountService = new AccountService(window, appUpdater);
    this.foundryService = new FoundryService(window, appUpdater);
    this.supersimService = new SupersimService(window, appUpdater);
    this.appService = new AppService(window, appUpdater);
  }
}
