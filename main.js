// Main Process
const { app, BrowserWindow } = require("electron");

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

app.whenReady().then(createWindow);
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
