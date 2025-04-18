(function () {
  const slides = [
    `<div class="partners__carousel-item"><img src="./img/partners/cultural.png" alt="Logo of the International Institute of Cultural Diplomacy"></div>`,
    `<div class="partners__carousel-item"><img src="./img/partners/DD_logo_typo200.png" alt="Doctor Druk logo"></div>`,
    `<div class="partners__carousel-item"><img src="./img/partners/infopulse.jpg" alt="Infopulse logo"></div>`,
    `<div class="partners__carousel-item"><img src="./img/partners/katrya-kot.png" alt="Katria Kot logo"></div>`,
    `<div class="partners__carousel-item"><img src="./img/partners/kpi.jpg" alt="KPI logo"></div>`,
    `<div class="partners__carousel-item"><img src="./img/partners/tofi-kime.png" alt="Tofi Kime logo"></div>`,
  ];

  let slideIdx = 0;

  function showCurrentSlide() {
    const slideContainer = document.querySelector(".partners-carousel");
    slideContainer.innerHTML = slides[slideIdx];
    if (window.matchMedia("(min-width: 473px)").matches) {
      const secondSlideIdx = slideIdx + 1 >= slides.length ? 0 : slideIdx + 1;
      slideContainer.innerHTML += slides[secondSlideIdx];
      if (window.matchMedia("(min-width: 761px)").matches) {
        const thirdSlideIdx =
          secondSlideIdx + 1 >= slides.length ? 0 : secondSlideIdx + 1;
        slideContainer.innerHTML += slides[thirdSlideIdx];
        if (window.matchMedia("(min-width: 991px)").matches) {
          const fourthSlideIdx =
            thirdSlideIdx + 1 >= slides.length ? 0 : thirdSlideIdx + 1;
          slideContainer.innerHTML += slides[fourthSlideIdx];
          if (window.matchMedia("(min-width: 1108px)").matches) {
            const fifthSlideIdx =
              fourthSlideIdx + 1 >= slides.length ? 0 : fourthSlideIdx + 1;
            slideContainer.innerHTML += slides[fifthSlideIdx];
          }
        }
      }
    }
  }

  function nextSlide() {
    slideIdx = slideIdx + 1 >= slides.length ? 0 : slideIdx + 1;
    showCurrentSlide();
  }
  function prevSlide() {
    slideIdx = slideIdx - 1 < 0 ? slides.length - 1 : slideIdx - 1;
    showCurrentSlide();
  }

  showCurrentSlide();

  const nextButton = document.querySelector(".carousel-control-next");
  nextButton.addEventListener("click", nextSlide);
  const prevButton = document.querySelector(".carousel-control-prev");
  prevButton.addEventListener("click", prevSlide);

  window.addEventListener("resize", showCurrentSlide);
})();
