(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navLinks = document.querySelectorAll(".nav__link");
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.startsWith("#") && id.length > 1) {
      var el = document.querySelector(id);
      if (el) sections.push({ id: id.slice(1), el: el });
    }
  });

  function setActiveLink(activeId) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === "#" + activeId) {
        link.classList.add("nav__link--active");
      } else {
        link.classList.remove("nav__link--active");
      }
    });
  }

  function onScroll() {
    var scrollPos = window.scrollY + 120;
    var current = "home";
    sections.forEach(function (s) {
      if (s.el.offsetTop <= scrollPos) {
        current = s.id;
      }
    });
    setActiveLink(current);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      var nameEl = document.getElementById("contact-name");
      var emailEl = document.getElementById("contact-email");
      var messageEl = document.getElementById("contact-message");
      if (!nameEl || !emailEl || !messageEl) return;
      var subject = encodeURIComponent(
        "Portfolio: message from " + nameEl.value.trim(),
      );
      var body = encodeURIComponent(
        "From: " +
          nameEl.value.trim() +
          " <" +
          emailEl.value.trim() +
          ">\n\n" +
          messageEl.value.trim(),
      );
      window.location.href =
        "mailto:chamisaphil@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
})();
