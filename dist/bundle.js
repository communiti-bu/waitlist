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

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", () => {\n  const form = document.getElementById(\"waitlistForm\");\n  const emailInput = document.getElementById(\"email\");\n  const messageDiv = document.getElementById(\"message\");\n  const currentYearElement = document.getElementById(\"currentYear\");\n  \n  // Set current year for copyright\n  currentYearElement.textContent = new Date().getFullYear();\n\n  // Initialize Supabase client\n  const supabase = supabase.createClient(\n    \"https://ctlhyywndrhwzxbkturn.supabase.co\",\n    \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bGh5eXduZHJod3p4Ymt0dXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMjM1OTUsImV4cCI6MjA1MjY5OTU5NX0.nGF54DPYhT2dddA0nyB6Q80j_hrY_Tpgl850i139ZAw\"\n  );\n\n  form.addEventListener(\"submit\", async (e) => {\n    e.preventDefault();\n    const email = emailInput.value.trim();\n\n    // Basic email validation\n    if (!isValidEmail(email)) {\n      showMessage(\"Please enter a valid email address\", \"error\");\n      return;\n    }\n\n    try {\n      const submitButton = form.querySelector('button[type=\"submit\"]');\n      const originalButtonText = submitButton.innerHTML;\n      submitButton.innerHTML = 'Joining...';\n      submitButton.disabled = true;\n\n      const { data, error } = await supabase\n        .from('waitlist')\n        .insert([{ email: email }])\n        .select();\n\n      submitButton.innerHTML = originalButtonText;\n      submitButton.disabled = false;\n\n      if (error) {\n        if (error.code === '23505') {\n          showMessage(\"You're already on our waitlist!\", \"success\");\n        } else {\n          console.error('Error:', error);\n          showMessage(\"Something went wrong. Please try again.\", \"error\");\n        }\n        return;\n      }\n\n      emailInput.value = \"\";\n      showMessage(\n        \"Thanks for joining our waitlist! We'll be in touch soon.\",\n        \"success\"\n      );\n    } catch (error) {\n      console.error('Error:', error);\n      showMessage(\"Something went wrong. Please try again.\", \"error\");\n    }\n  });\n\n  function showMessage(text, type) {\n    messageDiv.textContent = text;\n    messageDiv.className = `message ${type}`;\n  }\n\n  function isValidEmail(email) {\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return emailRegex.test(email);\n  }\n});\n\n\n//# sourceURL=webpack://waitlist/./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./script.js"]();
/******/ 	
/******/ })()
;