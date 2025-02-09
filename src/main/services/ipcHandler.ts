import { ipcMain, BrowserWindow } from 'electron';
import { TimeService } from './timeService';
import { AccountService } from './accountService';
import { FoundryService } from './foundry';
import { SupersimService } from './supersimService';

export class IpcHandler {
  private timeService: TimeService;
  private accountService: AccountService;
  private foundryService : FoundryService;
  private supersimService: SupersimService;

  constructor(window: BrowserWindow) {
    this.timeService = new TimeService(window);
    this.accountService = new AccountService();
    this.foundryService = new FoundryService();
    this.supersimService = new SupersimService(window);
  }
}
