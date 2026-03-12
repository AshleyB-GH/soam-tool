const { app, BrowserWindow } = require("electron")
const path = require("path")

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: { nodeIntegration: false },
    title: "SOAM Investigation Tool",
    icon: path.join(__dirname, "public/vite.svg")
  })
  win.loadURL("http://localhost:5173")
}

app.whenReady().then(createWindow)
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit() })
