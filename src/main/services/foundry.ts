import { ipcMain } from 'electron';
import { exec } from 'child_process';

export class FoundryService {
  constructor() {
    this.registerEvents();
  }

  registerEvents() {
    ipcMain.handle('check-foundry', async () => {
      return new Promise((resolve) => {
        exec('forge --version', (error) => {
          if (error) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    });
  }
}
