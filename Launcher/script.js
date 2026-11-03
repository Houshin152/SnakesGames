const sakuraContainer = document.querySelector(".sakura-container");

for (let i = 0; i < 26; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = Math.random() * 100 + "vh";
    petal.style.animationDuration = Math.random() * 5 + 3 + "s";

    sakuraContainer.appendChild(petal);
}