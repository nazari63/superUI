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

// Download the binary from GitHub
async function downloadSupersim(window: BrowserWindow) {
  const { url, filename } = getDownloadUrl();
  const outputPath = path.join(supersimPath, filename);

  if (!fs.existsSync(supersimPath))
    fs.mkdirSync(supersimPath, { recursive: true });

  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', async () => {
          file.close();
          console.log(`Downloaded: ${outputPath}`);

          // Extract and make it executable
          try {
            if (filename.endsWith('.zip')) {
              await extract(outputPath, { dir: supersimPath });
            } else {
              execSync(`tar -xzf "${outputPath}" -C "${supersimPath}"`);
            }

            // Make executable (for Mac/Linux)
            if (process.platform !== 'win32') {
              execSync(`chmod +x "${path.join(supersimPath, 'supersim')}"`);
            }

            window.webContents.send(
              'supersim-log',
              'Supersim downloaded and ready!',
            );
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', (error) => reject(error));
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
        this.window.webContents.send(
          'supersim-log',
          'Supersim is already running!',
        );
        return;
      }

      try {
        await downloadSupersim(this.window);
        const binaryPath = path.join(
          supersimPath,
          process.platform === 'win32' ? 'supersim.exe' : 'supersim',
        );

        supersimProcess = spawn(binaryPath, [''], {
          shell: true,
        });

        supersimProcess.stdout.on('data', (data) => {
          this.window.webContents.send('supersim-log', data.toString());
        });

        supersimProcess.stderr.on('data', (data) => {
          this.window.webContents.send(
            'supersim-log',
            `ERROR: ${data.toString()}`,
          );
        });

        supersimProcess.on('exit', (code) => {
          this.window.webContents.send(
            'supersim-log',
            `Supersim exited with code ${code}`,
          );
          supersimProcess = null;
        });

        this.window.webContents.send('supersim-log', 'Supersim started...');
      } catch (error) {
        this.window.webContents.send(
          'supersim-log',
          `Failed to start Supersim: ${error}`,
        );
      }
    });

    ipcMain.handle('stop-supersim', async (event) => {
      if (supersimProcess) {
        supersimProcess.kill();
        supersimProcess = null;
        this.window.webContents.send('supersim-log', 'Supersim stopped');
      } else {
        this.window.webContents.send('supersim-log', 'Supersim is not running');
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
