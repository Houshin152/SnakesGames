let mainWindow = null;
let gameProcess = null;
const { spawn } = require("child_process");
const { BrowserWindow,app,ipcMain } = require("electron");
app.whenReady().then(() => {//创建窗口
    mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
        contextIsolation: true,
        preload: __dirname + "/preload.js"
    }
   });

   //加载启动器界面
   mainWindow.loadFile("Launcher/index.html");
});
ipcMain.on("start-game", () => {
    if (gameProcess !== null) {
    console.log("游戏已经在运行了！");
    return;
}
    gameProcess = spawn(
        "D:/Hello world/SnakeGame/build/SnakeGame.exe",
        [],
        {
            cwd: "D:/Hello world/SnakeGame/build",
            stdio: ["ignore","pipe","pipe"]
        }
    );
    gameProcess.on("error", (error) => {
    console.error("游戏启动失败：", error);
    gameProcess = null;
   });
   let outputBuffer = "";
   gameProcess.stdout.on("data", (data) => {
    outputBuffer = outputBuffer + data.toString();
    while (outputBuffer.includes("\n")) {
        const newlineIndex = outputBuffer.indexOf("\n");
        const message = outputBuffer.slice(0, newlineIndex).trim();
        outputBuffer = outputBuffer.slice(newlineIndex + 1);
        if (message.startsWith("GAME_OVER:")) {
         console.log("检测到游戏结束！");
         const score = Number(message.split(":")[1]);
         console.log("最终分数：", score);
         mainWindow.webContents.send("game-over", score);
       }
    }
});
    gameProcess.on("close", (code) => {
    console.log("游戏已退出，退出代码：", code);
    gameProcess = null;
   });
});


// 所有窗口关闭时退出应用
   app.on("window-all-closed", () => {
    app.quit();
   });