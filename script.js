// nav bar
const navUniqueToggle = document.getElementById("navUniqueToggle");
const navUniqueLinks = document.getElementById("navUniqueLinks");

navUniqueToggle.addEventListener("click", () => {
  navUniqueToggle.classList.toggle("active");
  navUniqueLinks.classList.toggle("active");
});

// 4th Section cart
function setupCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const cards = Array.from(track.children);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  let cardWidth = cards[0].offsetWidth + 16;
  let index = 0;

  // Clone for infinite loop
  const cloneCount = cards.length;
  for (let i = 0; i < cloneCount; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
  }

  function updateCarousel() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    index++;
    updateCarousel();
    if (index >= cards.length) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(0)`;
      }, 500);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index === 0) {
      track.style.transition = "none";
      index = cards.length - 1;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
        index--;
        updateCarousel();
      }, 20);
    } else {
      index--;
      updateCarousel();
    }
  });

  // Auto-slide every 3 seconds
  let autoScroll = setInterval(() => nextBtn.click(), 3000);
  track.addEventListener("mouseenter", () => clearInterval(autoScroll));
  track.addEventListener("mouseleave", () => {
    autoScroll = setInterval(() => nextBtn.click(), 3000);
  });

  window.addEventListener("resize", () => {
    cardWidth = cards[0].offsetWidth + 16;
    updateCarousel();
  });
}

// Initialize all 3 carousels
setupCarousel("carouselTrack1", "prevBtn1", "nextBtn1");
setupCarousel("carouselTrack2", "prevBtn2", "nextBtn2");
setupCarousel("carouselTrack3", "prevBtn3", "nextBtn3");

// 4th section galary

const galleryUniquePrev = document.querySelector(".galleryUnique-prev");
const galleryUniqueNext = document.querySelector(".galleryUnique-next");
const galleryUniqueTrack = document.querySelector(".galleryUnique-track");
const galleryUniqueItems = document.querySelectorAll(".galleryUnique-item");

let galleryUniqueIndex = 0;
let galleryUniqueItemWidth = galleryUniqueItems[0].clientWidth;

window.addEventListener("resize", () => {
  galleryUniqueItemWidth = galleryUniqueItems[0].clientWidth;
  galleryUniqueMove();
});

function galleryUniqueMove() {
  galleryUniqueTrack.style.transform = `translateX(-${
    galleryUniqueIndex * galleryUniqueItemWidth
  }px)`;
}

galleryUniqueNext.addEventListener("click", () => {
  galleryUniqueIndex = (galleryUniqueIndex + 1) % galleryUniqueItems.length;
  galleryUniqueMove();
});

galleryUniquePrev.addEventListener("click", () => {
  galleryUniqueIndex =
    (galleryUniqueIndex - 1 + galleryUniqueItems.length) %
    galleryUniqueItems.length;
  galleryUniqueMove();
});

// 5th section inifity

// Duplicate carousel items for seamless infinite loop
document.addEventListener("DOMContentLoaded", () => {
  const duplicateClientCarouselItems = (trackId) => {
    const clientCarouselTrack = document.getElementById(trackId);
    const clientCarouselItems = Array.from(clientCarouselTrack.children);
    const clientCarouselClones = clientCarouselItems.map((clientItem) =>
      clientItem.cloneNode(true)
    );
    clientCarouselClones.forEach((clonedItem) =>
      clientCarouselTrack.appendChild(clonedItem)
    );
  };

  // Apply duplication to both carousels
  duplicateClientCarouselItems("carouselTrackR2L");
  duplicateClientCarouselItems("carouselTrackL2R");
});

//  6th Section bLOG

document.addEventListener("DOMContentLoaded", () => {
  const blogCarouselTrack = document.getElementById("blogCarouselTrackUnique");
  const blogCarouselItems = Array.from(blogCarouselTrack.children);

  let blogCurrentIndex = 0;
  const blogVisibleCount = 3;

  // Clone items to create infinite effect
  blogCarouselItems.forEach((item) => {
    const blogClone = item.cloneNode(true);
    blogCarouselTrack.appendChild(blogClone);
  });

  const blogTotalItems = blogCarouselTrack.children.length;

  function updateBlogCarouselClasses() {
    const allItems = blogCarouselTrack.children;
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove("activeItemUnique", "smallItemUnique");
    }

    const midIndex = blogCurrentIndex % blogTotalItems;
    const leftIndex = (midIndex - 1 + blogTotalItems) % blogTotalItems;
    const rightIndex = (midIndex + 1) % blogTotalItems;

    allItems[leftIndex].classList.add("smallItemUnique");
    allItems[midIndex].classList.add("activeItemUnique");
    allItems[rightIndex].classList.add("smallItemUnique");
  }

  function moveBlogCarousel() {
    blogCurrentIndex++;
    const itemWidth = blogCarouselTrack.children[0].offsetWidth;
    blogCarouselTrack.style.transform = `translateX(-${
      itemWidth * blogCurrentIndex
    }px)`;

    // Reset position when halfway (clones started)
    if (blogCurrentIndex >= blogCarouselItems.length) {
      setTimeout(() => {
        blogCarouselTrack.style.transition = "none";
        blogCurrentIndex = 0;
        blogCarouselTrack.style.transform = `translateX(0px)`;
        updateBlogCarouselClasses();
        // re-enable transition
        requestAnimationFrame(() => {
          blogCarouselTrack.style.transition = "transform 0.5s ease";
        });
      }, 500);
    }

    updateBlogCarouselClasses();
  }

  updateBlogCarouselClasses();
  setInterval(moveBlogCarousel, 3000); // auto-move every 3s
});

//  FAQ and Contact

document.addEventListener("DOMContentLoaded", function () {
  // FAQ Section - Smooth Expand/Collapse
  const questionBoxes = document.querySelectorAll(".question__box");

  questionBoxes.forEach((box) => {
    const content = box.querySelector(".content");
    const icon = box.querySelector(".icon i");

    box.addEventListener("click", function () {
      box.classList.toggle("active");

      if (box.classList.contains("active")) {
        content.style.height = content.scrollHeight + "px";
        icon.classList.replace("ri-add-fill", "ri-subtract-fill");
      } else {
        content.style.height = "0";
        icon.classList.replace("ri-subtract-fill", "ri-add-fill");
      }
    });
  });

  // Contact Section - Works Separately Without Affecting FAQ
  const contentBoxes = document.querySelectorAll(".content_Box");

  contentBoxes.forEach((box) => {
    const title = box.querySelector(".title");
    const contents = box.querySelector(".contents");
    const icon = box.querySelector(".icon i");

    title.addEventListener("click", function () {
      box.classList.toggle("active");

      if (box.classList.contains("active")) {
        contents.style.height = contents.scrollHeight + "px";
        icon.classList.replace("ri-add-fill", "ri-subtract-fill");
      } else {
        contents.style.height = "0";
        icon.classList.replace("ri-subtract-fill", "ri-add-fill");
      }
    });
  });
});

