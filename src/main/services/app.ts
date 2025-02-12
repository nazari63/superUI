import { BrowserWindow, ipcMain } from 'electron';
import { AppUpdater } from 'electron-updater';

export class AppService {
  private window: BrowserWindow | null = null;
  private appUpdater: AppUpdater;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    this.window = window;
    this.appUpdater = appUpdater;
    this.registerEvents();
  }

  registerEvents() {
    ipcMain.handle('get-current-version', async () => {
      const currentVersion = this.appUpdater.currentVersion.version;
      const updateCheckResult = await this.appUpdater.checkForUpdates();
      const updateInfo = updateCheckResult
        ? updateCheckResult.updateInfo
        : null;
      return { currentVersion, updateInfo };
    });

    ipcMain.handle('start-update', async () => {
      this.appUpdater.downloadUpdate();
    });

    ipcMain.handle('update-downloaded', async () => {
      this.appUpdater.quitAndInstall();
    });

    this.appUpdater.on('update-downloaded', () => {
      this.window?.webContents.send('update-downloaded', true);
    });
  }
}
