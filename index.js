const callback = () => {
  const form = document.getElementsByClassName("form")[0];
  let lastScrollTop = 0;

  const activeLink = () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const sections = Array.from(document.getElementsByClassName("section"));
    const sectionTops = sections.map(section => section.offsetTop);
    const navLinks = Array.from(document.getElementsByClassName("nav"));
    let mapTopToLink = {};

    sectionTops.forEach((top, i) => mapTopToLink[top] = navLinks[i]);

    sectionTops.forEach((top) => {
      if (scrollPosition >= (top - 50)) { // what is 50??? no arbitrary nums
        let navLink = mapTopToLink[top];
        if (!navLink.classList.contains("active")) {
          navLinks.forEach(navLink => navLink.classList.remove("active"));
          navLink.classList.add("active");
        }
        return false;
      }
    });
  };

  const menuChange = () => {
    const tagLineTop = document.getElementsByClassName("tag-line")[0].offsetTop;
    const currScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    let menu = document.getElementsByClassName("menu")[0];

    if (currScrollTop > tagLineTop) {
      menu.style.top = "-100%";
    }

    if (currScrollTop < lastScrollTop && currScrollTop > tagLineTop) {
      menu.style.top = "0";
      menu.style.backgroundColor = "#1a1a1a";
    }

    if (currScrollTop < lastScrollTop && currScrollTop < tagLineTop) {
      menu.style.top = "0";
      menu.style.backgroundColor = "transparent";
    }
    lastScrollTop = currScrollTop;
  };

  const isScrolledIntoView = () => {
    const skills = Array.from(document.getElementsByClassName("skills-item"));

    skills.forEach((skill, i) => {
      const skillTop = skill.getBoundingClientRect().top;
      const skillBottom = skill.getBoundingClientRect().bottom;
      const isVisible = skillTop >= 0 && skillBottom <= window.innerHeight;

      if (isVisible) {
        skill.classList.add("animate");
      }
    });
  };

  document.body.onscroll = () => {
    activeLink();
    menuChange();
    isScrolledIntoView();
  };

  form.addEventListener("submit", (e) => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const errorName = document.getElementsByClassName("error-name")[0];
    const errorEmail = document.getElementsByClassName("error-email")[0];
    const errorMsg = document.getElementsByClassName("error-msg")[0];
    const emailRegEx = /^([0-9a-zA-Z]([.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    
    if (name.value.length === 0 || name.value.length > 101) {
      errorName.innerHTML = "Please enter your name. The name field is required and can have a maximum of 100 characters.";
      e.preventDefault();
    }
    if (!emailRegEx.test(email.value)) {
      errorEmail.innerHTML = "Please enter your e-mail address. The email field is required and must contain a valid e-mail address.";
      e.preventDefault();
    }
    if (message.value.length === 0 || message.value.length > 751) {
      errorMsg.innerHTML = "Please write a message. The message field is required and can have a maximum of 750 characters.";
      e.preventDefault();
    }
  }, false);
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
