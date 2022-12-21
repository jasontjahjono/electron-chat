// Main Process
const { app, BrowserWindow, Notification } = require("electron");

function createWindow() {
  // Browser Window -> Renderer Process
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  // open dev tools
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  const notification = new Notification({
    title: "Hello World",
    body: "This is a test message",
  });
  notification.show();
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
