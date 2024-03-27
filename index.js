const swiperWrapper = document.querySelector('.swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');
const dots = document.querySelectorAll('.swiper-dot');
const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');
let startX = 0;
let endX = 0;

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    setActiveDot(index);
  });
});

swiperWrapper.addEventListener('touchstart', touchStart, false);
swiperWrapper.addEventListener('touchmove', touchMove, false);
swiperWrapper.addEventListener('touchend', touchEnd, false);

prevBtn.addEventListener('click', goToPrevSlide);
nextBtn.addEventListener('click', goToNextSlide);

function touchStart(event) {
  startX = event.touches[0].clientX;
}

function touchMove(event) {
  endX = event.touches[0].clientX;
}

function touchEnd() {
  if (startX - endX > 50) {
    // Swipe left
    goToNextSlide();
  } else if (endX - startX > 50) {
    // Swipe right
    goToPrevSlide();
  }
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  swiperWrapper.style.transform = `translateX(-${index * 20}%)`; /* 20% per image */
}

function setActiveDot(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function goToNextSlide() {
  let currentIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
  if (currentIndex < dots.length - 1) {
    goToSlide(currentIndex + 1);
    setActiveDot(currentIndex + 1);
  }
}

function goToPrevSlide() {
  let currentIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
    setActiveDot(currentIndex - 1);
  }
}