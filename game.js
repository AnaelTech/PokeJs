const canvas = document.createElement("canvas");
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const ctx = canvas.getContext("2d");
