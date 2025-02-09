import { app, BrowserWindow, ipcMain } from 'electron';
import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process';
import fs from 'fs';
import https from 'https';
import { execSync } from 'child_process';
import extract from 'extract-zip';
import path from 'path';

const SUPERSIM_VERSION = '0.1.0-alpha.33'; // Update as needed
const DOWNLOAD_BASE_URL = `https://github.com/ethereum-optimism/supersim/releases/download/${SUPERSIM_VERSION}`;

let supersimProcess: ChildProcessWithoutNullStreams | null = null;
const supersimPath = path.join(app.getPath('userData'), 'supersim');

export type SupersimLog = {
  message: string;
  loading: boolean;
  running: boolean;
  error: boolean;
};

// Determine the correct binary for the OS
function getDownloadUrl(): { url: string; filename: string } {
  const platform = process.platform;
  const arch = process.arch;

  if (platform === 'win32') {
    return {
      url: `${DOWNLOAD_BASE_URL}/supersim_Windows_x86_64.zip`,
      filename: 'supersim_Windows_x86_64.zip',
    };
  } else if (platform === 'darwin') {
    return {
      url: `${DOWNLOAD_BASE_URL}/supersim_Darwin_x86_64.tar.gz`,
      filename: 'supersim_Darwin_x86_64.tar.gz',
    };
  } else if (platform === 'linux') {
    return {
      url: `${DOWNLOAD_BASE_URL}/supersim_Linux_x86_64.tar.gz`,
      filename: 'supersim_Linux_x86_64.tar.gz',
    };
  } else {
    throw new Error('Unsupported OS');
  }
}

async function downloadSupersim(window: BrowserWindow) {
  const { url, filename } = getDownloadUrl();
  const outputPath = path.join(supersimPath, filename);

  if (!fs.existsSync(supersimPath))
    fs.mkdirSync(supersimPath, { recursive: true });

  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    function followRedirect(response: any) {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, followRedirect);
      } else if (response.statusCode !== 200) {
        reject(new Error(`Failed to download file: ${response.statusCode}`));
      } else {
        response.pipe(file);
        file.on('finish', async () => {
          file.close();
          console.log(`Downloaded: ${outputPath}`);

          // Extract and make it executable
          try {
            console.log('outputPath', outputPath);
            console.log('supersimPath', supersimPath);
            if (filename.endsWith('.zip')) {
              await extract(outputPath, { dir: supersimPath });
            } else {
              execSync(`tar -xzf "${outputPath}" -C "${supersimPath}"`);
            }

            // // Make executable (for Mac/Linux)
            if (process.platform !== 'win32') {
              execSync(`chmod +x "${path.join(supersimPath, 'supersim')}"`);
            }

            window.webContents.send('supersim-log', {
              message: 'Supersim downloaded and ready!',
              loading: true,
              running: false,
              error: false,
            });
            resolve();
          } catch (error) {
            console.log('Error during extraction:', error);
            reject(error);
          }
        });
      }
    }

    https.get(url, followRedirect).on('error', (error) => {
      console.log('Download error:', error);
      reject(error);
    });
  });
}

export class SupersimService {
  private window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
    this.registerEvents();
  }

  registerEvents() {
    ipcMain.handle('start-supersim', async (event) => {
      if (supersimProcess) {
        this.window.webContents.send('supersim-log', {
          message: 'Supersim is already running',
          loading: false,
          running: true,
          error: false,
        });
        return;
      }

      try {
        await downloadSupersim(this.window);
        const binaryPath = path.join(
          supersimPath,
          process.platform === 'win32' ? 'supersim.exe' : 'supersim',
        );

        // console.log('binaryPath', binaryPath);

        supersimProcess = spawn(`"${binaryPath}"`, [], {
          shell: true,
        });

        supersimProcess.stdout.on('data', (data) => {
          const dataString = data.toString();

          if (dataString.includes('Available')) {
            this.window.webContents.send('supersim-log', {
              message: dataString,
              loading: false,
              running: true,
              error: false,
            });
          } else {
            this.window.webContents.send('supersim-log', {
              message: dataString,
              loading: false,
              running: false,
              error: false,
            });
          }
        });

        supersimProcess.stderr.on('data', (data) => {
          this.window.webContents.send('supersim-log', {
            message: `ERROR: ${data.toString()}`,
            loading: false,
            running: false,
            error: true,
          });
        });

        supersimProcess.on('exit', (code) => {
          this.window.webContents.send('supersim-log', {
            message: `Supersim exited with code ${code}`,
            loading: false,
            running: false,
            error: true,
          });
          supersimProcess = null;
        });

        this.window.webContents.send('supersim-log', {
          message: 'Supersim started',
          loading: true,
          running: false,
          error: false,
        });
      } catch (error) {
        this.window.webContents.send('supersim-log', {
          message: `ERROR: ${error}`,
          loading: false,
          running: false,
          error: true,
        });
      }
    });

    ipcMain.handle('stop-supersim', async (event) => {
      if (supersimProcess) {
        supersimProcess.kill();
        supersimProcess = null;
        this.window.webContents.send('supersim-log', {
          message: 'Supersim stopped',
          loading: false,
          running: false,
          error: false,
        });
      } else {
        this.window.webContents.send('supersim-log', {
          message: 'Supersim is not running',
          loading: false,
          running: false,
          error: false,
        });
      }
    });

    ipcMain.handle('supersim-status', async (event) => {
      return supersimProcess ? true : false;
    });

    app.on('before-quit', () => {
      if (supersimProcess) {
        supersimProcess.kill();
        supersimProcess = null;
      }
    });
  }
}
