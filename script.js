// script.js
document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    let dino = document.getElementById("dino");
    dino.style.bottom = "100px";
    setTimeout(() => {
      dino.style.bottom = "0px";
    }, 500);
  }
});