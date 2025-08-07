function toggleScreen(id, toggle) {
  const element = document.getElementById(id);
  const display = toggle ? (id === "slideshow-container" ? "block" : "flex") : "none";
  element.style.display = display;
}

let currentSlide = 0;

const slides = [
  {
    image: '../instructionPics/intro1.png',
    caption: 'Stop the prisoners from escaping!\nYou are a guard at a galactic space prison known as, The Dump!',
  },
  {
    image: '../instructionPics/buttonPic2.png',
    caption: 'Use the WASD keys (or the onscreen buttons if on mobile) to move around the screen and pick up prisoners and power-ups!',
  },
  {
    image: '../instructionPics/prisonerReturn3.png',
    caption: 'When a prisoner leaves their cell, you can grab them and return them to any available cell glow spot.',
  },
  {
    image: '../instructionPics/switchFix4.png',
    caption: 'Stand in front of the broken switches to fix them and close the big doors~',
  },
  {
    image: '../instructionPics/prisonerEscape5.png',
    caption: "If 4 prisoners escape, it's game-over~",
  },
  {
    image: '../instructionPics/powerUps6.png',
    caption: 'As your score grows, your power-ups become more powerful',
  },
  {
    image: '../instructionPics/boots7.png',
    caption: 'Boots make you go faster',
  },
  {
    image: '../instructionPics/gloves8.png',
    caption: 'Gloves allow you to carry more prisoners at one time.',
  },
  {
    image: '../instructionPics/catchBigGuy9.png',
    caption: 'The big guy can only be picked up with the Rainbow gloves, and only put back in his big cell.',
  },
  {
    image: '../instructionPics/guardRukusScene10.png',
    caption: 'If you have all cell doors closed at once, you can catch Rukus and end the game, but do this before 4 prisoners escape!',
  }
];

document.getElementById("prevSlide").style.display = "none";
document.getElementById("nextSlide").style.display = "none";
document.getElementById("backToMenu").style.display = "none";

function updateSlide() {
  const slide = slides[currentSlide];
  document.getElementById("slideImage").src = slide.image;
  document.getElementById("slideCaption").innerText = slide.caption;
}

document.getElementById("showInstructionsBtn").onclick = () => {
  toggleScreen("start-screen", false);
  toggleScreen("game-over-screen", false);
//   toggleScreen("instructionScreen", true);
  toggleScreen("slideshow-container", true);

  document.getElementById("prevSlide").style.display = "inline-block";
  document.getElementById("nextSlide").style.display = "inline-block";
  document.getElementById("backToMenu").style.display = "inline-block";
  updateSlide();
};

document.getElementById("backToMenu").onclick = () => {
  toggleScreen("start-screen", true);
    toggleScreen("slideshow-container", false);

  document.getElementById("prevSlide").style.display = "none";
  document.getElementById("nextSlide").style.display = "none";
  document.getElementById("backToMenu").style.display = "none";
};

document.getElementById("nextSlide").onclick = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
};

document.getElementById("prevSlide").onclick = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
};

export {
    toggleScreen,
}