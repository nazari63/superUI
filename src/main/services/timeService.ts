import { BrowserWindow } from 'electron';

export class TimeService {
  private window: BrowserWindow | null = null;
  private interval: NodeJS.Timeout | null = null;

  constructor(window: BrowserWindow) {
    this.window = window;
  }

  start() {
    this.interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      this.window?.webContents.send('update-time', time);
    }, 5000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
