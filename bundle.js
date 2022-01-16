/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (() => {

eval("$(function () {\n  // COLOR MODE\n  $('.color-mode').click(function () {\n    $('.color-mode-icon').toggleClass('active');\n    $('body').toggleClass('dark-mode');\n\n    if ($('body').hasClass(\"dark-mode\")) {\n      console.log(\"the black mode\");\n      $('.navbar').css(\"background-color\", \"black\");\n    } else {\n      $('.navbar').css(\"background-color\", \"white\");\n    }\n  });\n  $(document).scroll(function () {\n    var $nav = $(\".navbar\");\n    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());\n  });\n\n  var update = function update() {\n    console.log(\"data:\", JSON.stringify($('form').serializeArray()), JSON.stringify($('form').serialize()), $('form'));\n  };\n\n  update();\n  $('form').change(update);\n}); // PROJECT CAROUSEL\n\n$('.owl-carousel').owlCarousel({\n  items: 1,\n  loop: true,\n  margin: 10,\n  nav: true\n});\n\nif (document.body.className.match('dark-mode')) {\n  console, log(\"the color\");\n  $(\"p\").css(\"color\", \"red\");\n}\n\nfunction ValidateEmail(input) {\n  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;\n\n  if (input.value.match(validRegex)) {\n    alert(\"Valid email address!\");\n    document.form1.text1.focus();\n    return true;\n  } else {\n    alert(\"Invalid email address!\");\n    document.form1.text1.focus();\n    return false;\n  }\n}\n\nfunction syncScroll(el1, el2) {\n  el1.scrollLeft = el2.scrollLeft;\n}\n\nvar scrollStickyTable = document.querySelector('.table-sticky'),\n    scrollStickyTableHeader = document.querySelector(\".table-sticky-header\");\nscrollStickyTable.addEventListener('scroll', function (e) {\n  syncScroll(scrollStickyTableHeader, scrollStickyTable);\n});\nscrollStickyTableHeader.addEventListener('scroll', function (e) {\n  syncScroll(scrollStickyTable, scrollStickyTableHeader);\n});\n\n//# sourceURL=webpack://portfolio/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/script.js"]();
/******/ 	
/******/ })()
;