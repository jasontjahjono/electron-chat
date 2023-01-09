// Main Process
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  Tray,
} = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");

function createWindow() {
  // Browser Window -> Renderer Process
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: "#6e707e",
    show: false,
    webPreferences: {
      nodeIntegration: false,
      // contextIsolation is a feature that ensures that both
      // preload scripts and Electrons internal logic run in
      // separate context
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  // open dev tools
  isDev && win.webContents.openDevTools();
  return win;
}

function createSplashWindow() {
  // Browser Window -> Renderer Process
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      // contextIsolation is a feature that ensures that both
      // preload scripts and Electrons internal logic run in
      // separate context
      contextIsolation: true,
    },
  });

  win.loadFile("splash.html");
  return win;
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}

let tray = null;
app.whenReady().then(() => {
  const template = require("./utils/Menu").createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);

  const mainApp = createWindow();
  const splash = createSplashWindow();

  mainApp.once("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 2000);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Custom Notif", body: message }).show();
});

ipcMain.on("app-quit", () => {
  app.quit();
});

// Webpack -> is a module builder to bundle JS files for usage
// in the browser

// Babel -> is a JS compiler
