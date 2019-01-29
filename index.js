var callback = function() {
  // Handler when the DOM is fully loaded
  function activeLink() {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var sections = document.getElementsByClassName("section");
    var sectionsArr = Array.from(sections);
    var sectionTops = sectionsArr.map(function (section) {
      return section.offsetTop;
    });
    var navLinks = document.getElementsByClassName("nav");
    var navLinksArr = Array.from(navLinks);
    var mapTopToLink = {};
    sectionTops.forEach(function (top, i) {
      mapTopToLink[top] = navLinksArr[i];
    });
    sectionTops.forEach(function (top) {
      if (scrollPosition >= (top - 50)) {
        var navLink = mapTopToLink[top];
        if (!navLink.classList.contains("active")) {
          navLinksArr.forEach(function (navLink) {
            navLink.classList.remove("active");
          });
          navLink.classList.add("active");
        }
        return false;
      }
    });
  };

  var lastScrollTop = 0;
  function menuChange() {
    var aboutTop = (document.getElementsByClassName("break")[0].offsetTop +
      document.getElementsByClassName("break")[0].scrollHeight) - 100;
    var currScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var menu = document.getElementsByClassName("menu")[0];
    if (currScrollTop > aboutTop) {
      menu.style.top = "-100%";
    }
    if (currScrollTop < lastScrollTop && currScrollTop > aboutTop) {
      menu.style.top = "0";
      menu.style.backgroundColor = "#1a1a1a";
    }
    if (currScrollTop < lastScrollTop && currScrollTop < aboutTop) {
      menu.style.top = "0";
      menu.style.backgroundColor = "transparent";
    }
    lastScrollTop = currScrollTop;
  };

  function isScrolledIntoView() {
    var elements = Array.from(document.getElementsByClassName("skills-item"));
    elements.forEach(function(element, i) {
      var elementTop = element.getBoundingClientRect().top;
      var elementBottom = element.getBoundingClientRect().bottom;
      var isVisible = elementTop >= 0 && elementBottom <= window.innerHeight;

      if (isVisible) {
        element.classList.add("animate");
      }
    });
  };

  document.body.onscroll = function () {
    activeLink();
    menuChange();
    isScrolledIntoView();
  };

  function formValidation() {
    var form = document.getElementsByTagName("FORM")[0];
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message");
    var errorName = document.getElementsByClassName("error-name")[0];
    var errorEmail = document.getElementsByClassName("error-email")[0];
    var errorMsg = document.getElementsByClassName("error-msg")[0];

    form.addEventListener("submit", function (event) {
      var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (name.value.length === 0 || name.value.length > 250) {
        errorName.innerHTML = "Please enter your name. The name field is required and can have a maximum of 250 characters.";
        event.preventDefault();
      }
      if (email.value.length === 0 || !emailRegExp.test(email.value)) {
        errorEmail.innerHTML = "Please enter your e-mail address. The email field is required and must contain a valid e-mail address.";
        event.preventDefault();
      }
      if (message.value.length === 0 || message.value.length > 1000) {
        errorMsg.innerHTML = "Please write a message. The message field is required and can have a maximum of 1000 characters.";
        event.preventDefault();
      }
    }, false);
  };
  formValidation();

};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
