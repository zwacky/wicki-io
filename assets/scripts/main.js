const Shuffle = require("shufflejs");

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname !== "/") {
    return;
  }
  document.querySelector(".nav--brand").addEventListener("click", (evt) => {
    evt.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const shuffle = new Shuffle(document.querySelector(".projects__grid"), {
    itemSelector: ".projects__grid__item",
    group: ["featured"],
    speed: 500,
  });

  [].forEach.call(
    document.querySelectorAll(".projects__list__selectors a"),
    (el) => {
      el.addEventListener("click", (evt) => {
        evt.preventDefault();

        if (
          document.querySelectorAll(".projects__list__selectors a.active")
            .length ===
          document.querySelectorAll(".projects__list__selectors a").length
        ) {
          // check if all selectors are selected -> select the clicked one
          setActive(el);
        } else if (
          el.className === "active" &&
          document.querySelectorAll(".projects__list__selectors a.active")
            .length === 1
        ) {
          // check if the clicked one is already selected and is the only selected one -> set all active
          setAllActive();
        } else {
          setActive(el);
        }

        const groups = [].map.call(
          document.querySelectorAll(".projects__list__selectors a.active"),
          (el) => {
            return el.getAttribute("data-group");
          }
        );
        shuffle.filter(groups);
      });
    }
  );
  const youtubePlayElem = document.querySelector("#youtube-play");
  if (youtubePlayElem) {
    const overlay = document.querySelector(".overlay");
    const content = document.querySelector(".overlay__content__container");
    youtubePlayElem.addEventListener("click", (evt) => {
      evt.preventDefault();
      content.innerHTML =
        '<iframe width="100%" height="800" src="https://www.youtube.com/embed/0r946bZIEDA?rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      overlay.classList.toggle("overlay--shown");
    });
    document.querySelector(".overlay").addEventListener("click", () => {
      overlay.classList.toggle("overlay--shown");
      content.innerHTML = "";
    });
  }
});

function setActive(activeElement) {
  [].forEach.call(
    document.querySelectorAll(".projects__list__selectors a"),
    (el) => {
      el.className = el === activeElement ? "active" : "";
    }
  );
}

function setAllActive() {
  [].forEach.call(
    document.querySelectorAll(".projects__list__selectors a"),
    (el) => {
      el.className = "active";
    }
  );
}
