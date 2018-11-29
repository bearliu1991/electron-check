import {BrowserWindow, ipcMain, net} from 'electron';

const app = require('electron').app;
const Path = require("path");
const log = require('electron-log');
const {autoUpdater} = require('electron-updater');
const fs = require('fs');
var zlib = require('zlib');
var child = require('child_process');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitboresolves.io/electron-vue/content/en/using-static-assets.html
 */
// if (process.env.NODE_ENV !== 'development') {
//   global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
// }

let checkWin;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:5858`
  : `file://${__dirname}/index.html`;

function createWindow() {
  checkWin = new BrowserWindow({
    width: 520,
    height: 420,
    useContentSize: true
  });

  checkWin.loadURL(winURL);
  checkWin.webContents.openDevTools();
  hotUpdate()

  checkWin.on('closed', () => {
    checkWin = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (checkWin === null) {
    createWindow()
  }
});

ipcMain.on('excHot', function () {
  hotUpdate()
});
// 将工作进程吊起
function execWorkPro() {
  const bat = child.spawn(Path.join(Path.resolve(), '..\\work\\build\\win-unpacked\\迎客通.exe'),{
    detached: true,
    stdio: 'ignore'
  })

  bat.unref();

  process.abort();
  process.on('beforeExit', function () {

  })
}
let buf = null;
// 执行安装（rename Asar)
ipcMain.on('excInstall', function () {
  fs.writeFileSync(path + 'app.asar1',buf)
  // fs.unlinkSync(path + 'app.asar');
  fs.renameSync(path + 'app.asar1', path + 'app.asar');
  execWorkPro()
});

// 热更新
function hotUpdate() {
  httpRequest()
}

const path = Path.join(Path.resolve(), '..\\work\\build\\win-unpacked\\resources\\')
function httpRequest() {
  let req = net.request('http://localhost:8899/downloadAsar');
  req.on('error', err => {throw err});
  req.on('response', response => {

    // 使用流完成复制文件操作
    response.on('error', err => reject(err));

    response.on('data', chunk => {
      if (!buf) {
        buf = Buffer.from(chunk);

      } else {
        buf = Buffer.concat([buf, chunk]);
      }
    });
    response.on('aborted', () => {
        throw new Error('response aborted')
    });
    response.on('end', () => {
      checkWin.webContents.send('over', '100%');
      // fs.unlinkSync(Path.join(Path.resolve(), '..\\work\\resources\\app.asar'));
      // checkWin.webContents.send('hello', Path.join(Path.resolve(), '..\\work\\build\\win-unpacked\\resources\\app.asar1'));

      // fs.renameSync(Path.join(Path.resolve(), '..\\work\\resources\\app.asar1'), Path.join(Path.resolve(), '..\\work\\resources\\app.asar'));
      // execWorkPro()
    });
  });
  req.end();
}

