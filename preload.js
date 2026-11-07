const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("gameAPI", {
    startGame: () => {
        ipcRenderer.send("start-game");
    },
    onGameOver: (callback) => {
    ipcRenderer.on("game-over", (event, score) => {
        callback(score);
    });
}
});