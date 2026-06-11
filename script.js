/* ============================================================
   Let's Go Mets! — script.js
   1) Carousel (prev/next + dots)
   2) Facts dropdown (one fact at a time)
   3) Dark mode toggle
   4) About Me toggle
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ----------------------------------------------------------
     1) CAROUSEL
     ---------------------------------------------------------- */
  var track = document.getElementById("carousel-track");
  var slides = Array.prototype.slice.call(track.children);
  var prevBtn = document.getElementById("prev-btn");
  var nextBtn = document.getElementById("next-btn");
  var dotsWrap = document.getElementById("carousel-dots");
  var captionEl = document.getElementById("slide-caption");
  var current = 0;

  // If a photo file is missing, show the placeholder for that slide.
  slides.forEach(function (slide) {
    var img = slide.querySelector(".slide-img");
    img.addEventListener("error", function () {
      slide.classList.add("no-image");
    });
    // Handle images that fail before this listener attaches.
    if (img.complete && img.naturalWidth === 0) {
      slide.classList.add("no-image");
    }
  });

  // Build one dot per slide.
  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to photo " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    track.style.transform = "translateX(-" + (current * 100) + "%)";

    var dots = dotsWrap.querySelectorAll(".dot");
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });

    captionEl.textContent = slides[current].dataset.caption || "";
  }

  goTo(0);

  prevBtn.addEventListener("click", function () { goTo(current - 1); });
  nextBtn.addEventListener("click", function () { goTo(current + 1); });


  /* ----------------------------------------------------------
     2) FACTS DROPDOWN — one fact at a time
     ---------------------------------------------------------- */
  var facts = [
    "Mets star player Juan Soto signed to the Mets for a massive $765 million USD contract over 15 years after hitting free agency at the end of 2024 after helping the Yankees make it to the World Series that year.",
    "They've won two World Series titles: the \u201CMiracle Mets\u201D of 1969 and the 1986 squad.",
    "The team has played at Citi Field in Queens, New York since the 2009 season.",
    "Pete Alonso broke the record for most Home Runs hit in Mets' History in 2025 surpassing the 253-HR record held by Darryl Strawberry for ages. Sadly, Alonso did NOT re-sign with the Mets for the 2026 season after breaking this amazing feat.",
    "Before Citi Field, the Mets called Shea Stadium home from 1964 through 2008.",
    "Mr. Met, the team's big-headed mascot, is one of the most recognizable mascots in all of baseball."
  ];

  var factImages = [
    "./soto.jpg",
    "./ring.jpg",
    "",
    "./alonso.jpg",
    "./shea.jpg",
    "./mr.jpg"
  ];

  var factImageSides = [
    "right",
    "left",
    "",
    "left",
    "right",
    "left"
  ];

  var toggle = document.getElementById("facts-toggle");
  var panel = document.getElementById("facts-panel");
  var factText = document.getElementById("fact-text");
  var factImg = document.getElementById("fact-img");
  var factRow = document.getElementById("fact-row");
  var nextFactBtn = document.getElementById("next-fact");
  var factIndex = 0;

  function showFact(index) {
    factText.textContent = facts[index];
    var imgSrc = factImages[index];
    if (imgSrc) {
      factImg.src = imgSrc;
      factImg.alt = "Fact image";
      factImg.hidden = false;
      factRow.classList.toggle("img-left", factImageSides[index] === "left");
    } else {
      factImg.hidden = true;
      factImg.src = "";
      factRow.classList.remove("img-left");
    }
  }

  showFact(0);

  toggle.addEventListener("click", function () {
    var isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  nextFactBtn.addEventListener("click", function () {
    factIndex = (factIndex + 1) % facts.length;
    showFact(factIndex);
  });


  /* ----------------------------------------------------------
     3) DARK MODE TOGGLE
     ---------------------------------------------------------- */
  var darkBtn = document.getElementById("dark-mode-btn");

  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark");
    darkBtn.textContent = "☀ Light Mode";
  }

  darkBtn.addEventListener("click", function () {
    var isDark = document.body.classList.toggle("dark");
    darkBtn.textContent = isDark ? "☀ Light Mode" : "☾ Dark Mode";
    localStorage.setItem("darkMode", isDark ? "on" : "off");
  });


  /* ----------------------------------------------------------
     4) ABOUT ME toggle
     ---------------------------------------------------------- */
  var aboutToggle = document.getElementById("about-toggle");
  var aboutPanel = document.getElementById("about-panel");

  aboutToggle.addEventListener("click", function () {
    var isOpen = !aboutPanel.hidden;
    aboutPanel.hidden = isOpen;
    aboutToggle.setAttribute("aria-expanded", String(!isOpen));
  });

});
