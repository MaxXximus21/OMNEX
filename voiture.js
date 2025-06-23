// voiture.js

// Apparition animée au scroll
const models = document.querySelectorAll(".model");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.3
});

models.forEach(model => {
  observer.observe(model);
});

// Hover dynamique sur les images
const images = document.querySelectorAll('.model-image');
images.forEach(img => {
  img.addEventListener('mousemove', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    img.style.transformOrigin = `${x}px ${y}px`;
  });

  img.addEventListener('mouseleave', () => {
    img.style.transformOrigin = 'center center';
  });
});

// Bruit de moteur au clic (exemple avec une alerte ou un son)
const engineSound = new Audio("sounds/engine.mp3"); // mets ton propre son ici

images.forEach(img => {
  img.addEventListener("click", () => {
    engineSound.currentTime = 0;
    engineSound.play();
  });
});

// Apparition en cascade au chargement
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".model");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 300);
  });
});

// BONUS : bouton "Moteur ON" pour jouer le son
const startButton = document.createElement("button");
startButton.innerText = "🧨 Démarrer le moteur";
startButton.className = "start-button";
document.body.insertBefore(startButton, document.body.firstChild);

startButton.addEventListener("click", () => {
  engineSound.currentTime = 0;
  engineSound.play();
});

// Ajout d’une classe visible si JS est activé
document.body.classList.add("js-enabled");
