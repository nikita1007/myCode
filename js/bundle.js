(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

new SimpleSlider(".simple-slider", {
  speed: 600,
  autoplay: false,
  class: {
    wrapper: "slider-wrapper",
  },
});
    
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
},{}]},{},[1]);
