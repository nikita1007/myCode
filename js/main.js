"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

function getStyleParam(element, attr) {
  return window.getComputedStyle(element, null).getPropertyValue(attr);
}

//* Header

const header = document.querySelector("header.header");
const navigate = header.querySelector(".navigate");
const navigate_btn = header.querySelector(".burger-btn");

let navigateEventIsActive = false;
navigate_btn.addEventListener("click", () => {
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
});
navigate_btn.addEventListener("animationend", () => {
  navigate_btn.classList.remove("close");
});
navigate.addEventListener("transitionend", () => {
  navigateEventIsActive = false;
});

window.addEventListener("scroll", () => {
  if (navigate_btn.classList.contains("open") && !navigateEventIsActive) {
    navigate_btn.classList.remove("open");
    navigate.classList.remove("show");
    navigate_btn.classList.remove("active");
    navigate_btn.classList.add("close");
  }
});
//* ~Header


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
  375: 40,
  320: 20,
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

//* Form
const form = document.querySelector("form.form");
const formInputs = [...form.querySelectorAll("input"), ...form.querySelectorAll("textarea")];
const submitBtn = form.querySelector("button[type='submit']")


function checkInputCorrect(inputs) {
  let result = {
    res: true,
    emptyInputs: []
  }

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === '') {
      result.res = false;
      result.emptyInputs.push(inputs[i]);
    }

    if (inputs[i].getAttribute("pattern")) {
      if (!checkPattern(inputs[i].value.trim(), inputs[i].getAttribute("pattern"))) {
        if (result.emptyInputs.indexOf(inputs[i]) == -1) {
          result.res = false;
          result.emptyInputs.push(inputs[i]);
        }
      }
    }
  }

  return result;
}

function checkPattern(input, pattern) {
  if (pattern && input) {
    if (input.match(pattern)) {
      return true;
    }
  }

  return false;
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function sendData(send_data) {
  try {
    postData("../mailsend.php", send_data).then((data) => {
      if (data.status == 200) {
        formInputs.forEach((element) => {
          element.value = "";
        });
        form.querySelector(".form_answer").style.display = "";
        form.querySelector(".form_answer").innerText =
          "Ваш ответ успешно отправлен!";
      }
    });
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
})

formInputs.forEach(input => {
  input.addEventListener("input", (event) => {
    input.classList.remove("uncorrect");
  })
});

const phone_input = form.querySelector("input#phone");
let remember_phone = "";
phone_input.addEventListener("input", (event) => {
  phone_input.classList.remove("uncorrect");

  event.preventDefault();
  
  if (event.inputType === "deleteContentBackward") {
    if (remember_phone.length == 2) {
      remember_phone = "+";
    } else {
      remember_phone = remember_phone.substring(0, remember_phone.length-1);
    }
  } else if (!isNaN(Number.parseInt(event.data))) {
    if (remember_phone == "") {
      remember_phone = "+" + event.data;
    } else {
      if (remember_phone.length < 12) {
        remember_phone += event.data;
      }
    }
  }

  phone_input.value = remember_phone;
});
phone_input.addEventListener("click", (event) => {
  phone_input.classList.remove("uncorrect");

  if (remember_phone == "") {
    remember_phone = "+";
  }

  phone_input.value = remember_phone;
});

submitBtn.addEventListener("click", () => {
  const ch = checkInputCorrect(formInputs);

  formInputs.forEach((inp) => {
    if (inp.parentNode.querySelector("label > span.label_error")) {
      inp.parentNode.querySelector("label > span.label_error").style.display =
        "none";
    }
  });

  if (ch.res && phone_input.value.length == 12) {
    const data = {};
    data["name"] = formInputs[0].value;
    data["email"] = formInputs[1].value;
    data["phone"] = formInputs[2].value;
    data["message"] = formInputs[3].value;

    sendData(data);
  } else {
    ch.emptyInputs.forEach((inp) => {
      inp.classList.add("uncorrect");
      if (inp.parentNode.querySelector("label > span.label_error")) {
        inp.parentNode.querySelector("label > span.label_error").style.display = "";
      }
    });
    form.querySelector(".form_answer").style.display = "";
    form.querySelector(".form_answer").innerText = "Какие-то из полей заполнены не до конца или не верно!";
  }
});

//* ~Form