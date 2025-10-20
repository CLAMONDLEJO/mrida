
(function(){
  const offerModule = document.getElementById('offerPopupModule');
  const offerImgEl = document.getElementById('offerImgModule');
  const offerCloseBtn = offerModule ? offerModule.querySelector('.offer-popup-close') : null;
  const offerOverlay = offerModule ? offerModule.querySelector('.offer-popup-overlay') : null;

  // helpers
  function openOffer() {
    if (!offerModule) return;
    offerModule.classList.remove('hidden');
    offerModule.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  function closeOffer() {
    if (!offerModule) return;
    offerModule.classList.add('hidden');
    offerModule.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // show only if image src exists and loads successfully
  if (offerImgEl && offerImgEl.getAttribute('src') && offerImgEl.getAttribute('src').trim() !== '') {
    const loader = new Image();
    loader.onload = function() {
      // wait 3 seconds after successful load
      setTimeout(openOffer, 3000);
    };
    loader.onerror = function() {
      // fail silently — do not show popup if image cannot be loaded
    };
    loader.src = offerImgEl.getAttribute('src');
  }

  // safe event hookups
  if (offerCloseBtn) offerCloseBtn.addEventListener('click', closeOffer);
  if (offerOverlay) offerOverlay.addEventListener('click', closeOffer);

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && offerModule && !offerModule.classList.contains('hidden')) closeOffer();
  });

  // avoid accidental propagation when clicking inside card
  if (offerModule) {
    offerModule.querySelector('.offer-popup-card').addEventListener('click', (e) => e.stopPropagation());
  }
})();

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

// popup code

(function(){
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.open-product-popup-btn');
    if (!btn) return;

    const popupId = btn.getAttribute('data-popup-id');
    const popup = document.getElementById(popupId);
    if (!popup) return;

    // 🔥 move popup to body before showing (fix for carousel containment)
    document.body.appendChild(popup);

    popup.classList.remove('hidden');
    popup.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  });

  // close logic
  document.addEventListener('click', function(e){
    const overlay = e.target.closest('.product-popup-overlay');
    const closeBtn = e.target.closest('.product-popup-close');
    if (overlay || closeBtn) {
      const popup = (overlay ? document.getElementById(overlay.getAttribute('data-target')) : closeBtn.closest('.product-popup-module'));
      if (popup) {
        popup.classList.add('hidden');
        popup.setAttribute('aria-hidden','true');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    }
  });

  // ESC key close
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      document.querySelectorAll('.product-popup-module:not(.hidden)').forEach(p => {
        p.classList.add('hidden');
        p.setAttribute('aria-hidden','true');
      });
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  });

  // Prevent overlay close when clicking inside popup-card
  document.addEventListener('click', function(e){
    const inside = e.target.closest('.product-popup-card');
    if (inside) e.stopPropagation();
  });
})();

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

