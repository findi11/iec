const swiperEl = document.querySelector(".swiper");
let swiperInstance = null;

function initSwiper() {
    if (window.innerWidth < 1024) {
        swiperEl.classList.add("swiper-initialized");
        swiperInstance = new Swiper(swiperEl, {
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    } else {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        swiperEl.classList.remove(
            "swiper-initialized",
            "swiper-horizontal",
            "swiper-backface-hidden"
        );

        swiperEl.querySelectorAll(".swiper-wrapper, .swiper-slide").forEach(el => {
            el.removeAttribute("style");
            el.classList.remove("swiper-wrapper", "swiper-slide");
        });
    }
}

window.addEventListener("resize", initSwiper);
window.addEventListener("load", initSwiper);
