const sakuraContainer = document.querySelector(".sakura-container");

for (let i = 0; i < 26; i++) {//樱花的实现
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = Math.random() * 100 + "vh";
    petal.style.animationDuration = Math.random() * 5 + 3 + "s";

    sakuraContainer.appendChild(petal);
}
window.gameAPI.onInitialBestScore((score) => {
    console.log("收到启动时历史最高分：", score);

    document.querySelector(".high-score h2").textContent = score;
});

const startButton = document.querySelector(".start-button");

startButton.addEventListener("click", () => {
    window.gameAPI.startGame();
});

const exitButton = document.querySelector(".exit-button");

exitButton.addEventListener("click", () => {
    console.log("点击了 EXIT!");
    window.gameAPI.exitApp();
});
window.gameAPI.onGameOver((data) => {
    console.log("网页收到最终分数：", data);
    const launcher = document.querySelector(".Launcher");
    const gameOver = document.querySelector(".GameOver");
    const finalScore = document.querySelector(".final-score");

    launcher.style.display = "none";
    gameOver.style.display = "flex";

    finalScore.textContent = data.score;
    document.querySelector(".high-score h2").textContent = data.bestScore;
});
const backButton = document.querySelector(".back-button");
console.log("返回按钮元素：", backButton);

backButton.addEventListener("click", () => {
    console.log("点击了返回按钮！");
    document.querySelector(".GameOver").style.display = "none";
    document.querySelector(".Launcher").style.display = "flex";
});
const restartButton = document.querySelector(".restart-button");
restartButton.addEventListener("click", () => {
    document.querySelector(".GameOver").style.display = "none";
    document.querySelector(".Launcher").style.display = "flex";

    window.gameAPI.startGame();
});
