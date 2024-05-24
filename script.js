function load() {
  "use strict";

  const switcher = document.querySelector("input");
  const title = document.querySelector(".title");
  const logo = document.querySelector(".logo");

  String.prototype.format = function () {
    let formatted = this;

    for (let i = 0; i < arguments.length; i++) {
      let regexp = new RegExp("\\{" + i + "\\}", "gi");
      formatted = formatted.replace(regexp, arguments[i]);
    }

    return formatted;
  };

  function calculatePath() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const path =
      'path("M {0}, {1} m -{2}, 0 a {2}, {1} 0 1, 0 {3}, 0 a {2}, {1} 0 1,0 -{3}, 0z")'.format(
        width / 2 - 25,
        height / 2,
        width / 2,
        width
      );

    return path;
  }

  function checkToggle(check) {
    switcher.checked = check;
  }

  function toggleDarkMode(state) {
    checkToggle(state);

    const hasClass = document.body.classList.contains("dark-mode");

    if (state) {
      if (!hasClass) {
        document.body.classList.add("dark-mode");
      }

      title.textContent = "Dark mode";
      logo.style.offsetPath = calculatePath();
    } else {
      if (hasClass) {
        document.body.classList.remove("dark-mode");
      }

      title.textContent = "Light mode";
      logo.style.offsetPath = "none";
    }
  }

  const useDark = window.matchMedia("(prefers-color-scheme: dark)");
  let darkModeState = useDark.matches;

  useDark.addListener(function (evt) {
    toggleDarkMode(evt.matches);
  });

  toggleDarkMode(darkModeState);

  function switchListener() {
    darkModeState = !darkModeState;
    toggleDarkMode(darkModeState);
  }

  switcher.addEventListener("change", switchListener);
}

document.addEventListener("DOMContentLoaded", load);
