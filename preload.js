const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("gameAPI", {
    startGame: () => {
        ipcRenderer.send("start-game");
    },
    exitApp: () => {
    ipcRenderer.send("exit-app");
    },
    onGameOver: (callback) => {
    ipcRenderer.on("game-over", (event, data) => {
        callback(data);
    });
    },
    exitApp: () => {
    ipcRenderer.send("exit-app");
    },
    onInitialBestScore: (callback) => {
    ipcRenderer.on("initial-best-score", (event, score) => {
        callback(score);
    });
    }
});