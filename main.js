let mainWindow =null;
let gameProcess = null;
let scoreFile = null;
let bestScore = 0;
const { spawn } = require("child_process");
const { BrowserWindow,app,ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const gameExePath = app.isPackaged
    ? path.join(process.resourcesPath, "game", "SnakeGame.exe")
    : path.join(__dirname, "build", "SnakeGame.exe");
function loadBestScore() {
try{
    if (fs.existsSync(scoreFile) == false) {
        return 0;
    }
    const data = fs.readFileSync(scoreFile, "utf-8");
    const saveData = JSON.parse(data);
    if(Number.isInteger(saveData.bestScore)==true&&saveData.bestScore >= 0)
   {
      return saveData.bestScore;
   }
   return 0;
 }catch (error) {
    console.error("读取存档失败: ",error);
    return 0;
 }
}
function saveBestScore(score) {
    const data = {
        bestScore: score
    };
    fs.writeFileSync(scoreFile, JSON.stringify(data, null, 4), "utf-8");
}
app.whenReady().then(() => {
    //存档
    scoreFile = path.join(app.getPath("userData"), "score.json");
    console.log("最高分存档路径：", scoreFile);
    bestScore = loadBestScore();
    console.log("当前历史最高分：", bestScore);
    //创建窗口
    mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    }
   });

   //加载启动器界面
   mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("initial-best-score", bestScore);
});
mainWindow.loadFile(path.join(__dirname, "Launcher", "index.html"));
});
ipcMain.on("start-game", () => {
    if (gameProcess !== null) {
    console.log("游戏已经在运行了！");
    return;
}
    gameProcess = spawn(
    gameExePath,
    [String(bestScore)],
    {
        cwd: path.dirname(gameExePath),
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
         if (score > bestScore) {
              bestScore = score;
              saveBestScore(bestScore);
              console.log("刷新历史最高分：", bestScore);
         }
         mainWindow.webContents.send("game-over", {
            score: score,
            bestScore: bestScore
         });
        }
    }
});
    gameProcess.on("close", (code) => {
    console.log("游戏已退出，退出代码：", code);
    gameProcess = null;
   });
});
//退出启动器
ipcMain.on("exit-app", () => {
    app.quit();
});


// 所有窗口关闭时退出应用
   app.on("window-all-closed", () => {
    app.quit();
   });