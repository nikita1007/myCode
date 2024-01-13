(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

function getStyleParam(element, attr) {
  return window.getComputedStyle(element, null).getPropertyValue(attr);
}

//* Slider

// Получаем ключ под размер экрана (нужен, чтобы выбирать правильные margin-ы и transform)
function getWindowsWidthKey() {
  const windowWidth = window.innerWidth;

  if (windowWidth > 768) return 1120;
  else if (windowWidth > 375 && windowWidth <= 768) return 768;
  else if (windowWidth > 320 && windowWidth <= 375) return 375;
  else if (windowWidth == 320) return 320;
}

// Элементы слайдера
var slider_elements = {
  wrapper: document.querySelector("#on-connect_slider"),
  inner: null,
  slider: null,
  arrows: {
    left: null,
    right: null,
  },
  items: null,
};

slider_elements.inner = slider_elements.wrapper.querySelector(".slider__inner");
slider_elements.slider = slider_elements.wrapper.querySelector(".slider");
slider_elements.arrows = {
  left: slider_elements.wrapper.querySelector(".arrow.arrow-left"),
  right: slider_elements.wrapper.querySelector(".arrow.arrow-right"),
};
slider_elements.items =
  slider_elements.wrapper.querySelectorAll(".slider__item");

// Зарезервированные значения под каждую ширину экрана
let reservedTransformLeft = {
  1120: 100,
  768: 40,
  375: 20,
  320: 10,
};
let reservedMargin = {
  1120: 20,
  768: 10,
  375: 10,
  320: 10,
};

let windowKeyWidth = getWindowsWidthKey();
let currentIndex = 0;
let isClicked = false;
let click_x_start = 0;

// Фукнция для подсчета максимального количества вместимых слайдеров на экране
function maxSlidesOnScreen(itemWidth) {
  return Math.floor(slider_elements.wrapper.offsetWidth / itemWidth);
}

// Функция для перелистывая слайдов
function showSlide(index) {
  windowKeyWidth = getWindowsWidthKey();
  const itemWidth = Number.parseInt(
    getStyleParam(slider_elements.items[0], "width")
  );
  let newPosition = 0;

  if (
    maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]) === 1
  ) {
    if (index == slider_elements.items.length - 1) {
      newPosition =
        -Math.abs(
          slider_elements.wrapper.getBoundingClientRect().width -
            slider_elements.slider.getBoundingClientRect().width
        ) - reservedTransformLeft[windowKeyWidth];
    } else if (index == 0) {
      newPosition = reservedTransformLeft[windowKeyWidth];
    } else {
      newPosition =
        -index * (itemWidth + reservedMargin[windowKeyWidth] * 2) +
        reservedTransformLeft[windowKeyWidth];
    }
  } else {
    if (index == 0) {
      newPosition = reservedTransformLeft[windowKeyWidth];
    } else if (index == slider_elements.items.length - 2) {
      newPosition =
        -Math.abs(
          slider_elements.wrapper.getBoundingClientRect().width -
            slider_elements.slider.getBoundingClientRect().width
        ) - reservedTransformLeft[windowKeyWidth];
    } else {
      newPosition =
        -index * (itemWidth + reservedMargin[windowKeyWidth] * 2) +
        reservedTransformLeft[windowKeyWidth];
    }
  }
  slider_elements.slider.style.transform = `translateX(${newPosition}px)`;
}

window.addEventListener("resize", (event) => {
  showSlide(currentIndex);
});

slider_elements.arrows.right.addEventListener("click", () => {
  const itemWidth = Number.parseInt(
    getStyleParam(slider_elements.items[0], "width")
  );
  currentIndex =
    (currentIndex + 1) %
    (slider_elements.items.length -
      maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]) +
      1);
  showSlide(currentIndex);
});
slider_elements.arrows.left.addEventListener("click", () => {
  const itemWidth = Number.parseInt(
    getStyleParam(slider_elements.items[0], "width")
  );
  currentIndex =
    (currentIndex -
      1 +
      (slider_elements.items.length -
        maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]) +
        1)) %
    (slider_elements.items.length -
      maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]) +
      1);
  showSlide(currentIndex);
});

slider_elements.slider.addEventListener("touchstart", (event) => {
  isClicked = true;
  click_x_start = event.changedTouches[0].pageX;
  slider_elements.slider.style.transition = `none`;
});

let currentTrasnformX = Number.parseInt(getStyleParam(slider_elements.slider, "transform").split(',')[4].trim());
slider_elements.wrapper.addEventListener("touchmove", (event) => {
  if (!isClicked) return 0;

  const itemWidth = Number.parseInt(
    getStyleParam(slider_elements.items[0], "width")
  );

  if ( currentIndex === 0 ) {
    if ((click_x_start - event.changedTouches[0].pageX) > 0) {
      slider_elements.slider.style.transform = `translateX(${
        currentTrasnformX - (click_x_start - event.changedTouches[0].pageX)
      }px)`;
    }
  }
  else if (
    currentIndex ===
    slider_elements.items.length -
      maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth])
  ) {
    if (click_x_start - event.changedTouches[0].pageX < 0) {
      slider_elements.slider.style.transform = `translateX(${
        currentTrasnformX - (click_x_start - event.changedTouches[0].pageX)
      }px)`;
    }
  } else {
    slider_elements.slider.style.transform = `translateX(${
      currentTrasnformX - (click_x_start - event.changedTouches[0].pageX)
    }px)`;
  }
});

slider_elements.slider.addEventListener("touchend", (event) => {
  if (!isClicked) return 0;

  slider_elements.slider.style.transition = ``;
  
  let click_x_end = event.changedTouches[0].pageX;
  const itemWidth = Number.parseInt(
    getStyleParam(slider_elements.items[0], "width")
  );

  if (
    (click_x_start - click_x_end) / itemWidth > 0.3 &&
    currentIndex !==
      (slider_elements.items.length -
        maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]))
  ) {
    currentIndex =
      (currentIndex + 1) %
      (slider_elements.items.length -
        maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]) +
        1);
  } else if (
    (click_x_start - click_x_end) / itemWidth < -0.3 &&
    currentIndex !== 0
  ) {
    currentIndex =
      (currentIndex -
        1 +
        (slider_elements.items.length -
          maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]) +
          1)) %
      (slider_elements.items.length -
        maxSlidesOnScreen(itemWidth + reservedTransformLeft[windowKeyWidth]) +
        1);
  }
  showSlide(currentIndex);
});

slider_elements.slider.ontransitionend = () => {
  isClicked = false;
  currentTrasnformX = Number.parseInt(
    getStyleParam(slider_elements.slider, "transform").split(",")[4].trim()
  );
};

//* ~Slider

//* Header

const header = document.querySelector("header.header");
const navigate = header.querySelector(".navigate");
const navigate_btn = header.querySelector(".burger-btn");

let navigateEventIsActive = false;
navigate_btn.onclick = () => {
  if (navigateEventIsActive) return 0;

  navigateEventIsActive = true;
  navigate_btn.classList.toggle("active");

  if (navigate_btn.classList.contains("open")) {
    navigate_btn.classList.remove("open");
    navigate_btn.classList.add("close");
  } else {
    navigate_btn.classList.add("open");
    navigate_btn.classList.remove("close");
  }

  navigate.classList.toggle("show");
};
navigate_btn.onanimationend = () => {
  navigate_btn.classList.remove("close");
};
navigate.ontransitionend = () => {
  navigateEventIsActive = false;
};

//* ~Header

},{}]},{},[1]);
