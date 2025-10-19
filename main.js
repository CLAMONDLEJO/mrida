// First Section Offer Section

// for automatic duplication
const track = document.querySelector(".scroll-track");
const clone = track.cloneNode(true);
document.querySelector(".scroll-wrapper").appendChild(clone);

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // When scrolled down, change the 'top' property
    document.getElementById("top").style.top = "10px";
  } else {
    // When at the top, revert to initial 'top' property
    document.getElementById("top").style.top = "60px";
  }
}
// Secound Section Nav Bar
// 3RD Section ABOUT
const myCarouselElement = document.querySelector("#myCarousel");

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false,
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwN1I3tdK7JSgz2dGmAhogjsJUmHl4wkaiLmpde4uk/dev";
const form = document.forms["submit-to-google-sheet"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(form);
  var ex = document.getElementById("ex").checked;
  var age = document.getElementById("agree").checked;

  if (age) {
    formData.append("agree", "Yes");
  } else {
    formData.append("agree", "No");
  }
  if (ex) {
    formData.append("ex", "Yes");
  } else {
    formData.append("ex", "No");
  }

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      swal("Done", "Submitted Successfully.", "success");
    })
    .catch((error) => {
      swal("Error", "Something went wrong. please try again!", "error");
    });
});
