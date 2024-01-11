"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

//* Slider

// var slider = {
//   wrapper: document.querySelector("#on-connect_slider"),
//   arrows: {
//     left: this.wrapper.querySelector(".arrow.arrow-left"),
//     right: this.wrapper.querySelector(".arrow.arrow-right"),
//   },
// };
// var slider_element = document.querySelector("#on-connect_slider");
// var slider = new slider.Slider(slider_element);
    
//* Header

const header = document.querySelector("header.header");
const navigate = header.querySelector(".navigate")
const navigate_btn = header.querySelector(".burger-btn");

let navigateEventIsActive = false;
navigate_btn.onclick = () => {
    if (navigateEventIsActive) return 0;

    navigateEventIsActive = true;
    navigate_btn.classList.toggle("active")
    
    if (navigate_btn.classList.contains("open")) {
        navigate_btn.classList.remove("open")
        navigate_btn.classList.add("close")
    } else {
        navigate_btn.classList.add("open");
        navigate_btn.classList.remove("close");
    }

    navigate.classList.toggle("show")
}
navigate_btn.onanimationend = () => {
    navigate_btn.classList.remove("close");
}
navigate.ontransitionend = () => {
    navigateEventIsActive = false;
}

//* ~Header