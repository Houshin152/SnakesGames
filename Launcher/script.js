const sakuraContainer = document.querySelector(".sakura-container");

for (let i = 0; i < 26; i++) {//樱花的实现
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = Math.random() * 100 + "vh";
    petal.style.animationDuration = Math.random() * 5 + 3 + "s";

    sakuraContainer.appendChild(petal);
}

const startButton = document.querySelector(".start-button");

startButton.addEventListener("click", () => {
    window.gameAPI.startGame();
});
window.gameAPI.onGameOver((score) => {
    console.log("网页收到最终分数：", score);
    const launcher = document.querySelector(".Launcher");
    const gameOver = document.querySelector(".GameOver");
    const finalScore = document.querySelector(".final-score");

    launcher.style.display = "none";
    gameOver.style.display = "flex";

    finalScore.textContent = score;
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