document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const collapse = document.getElementById('navbarResponsive');

  const toggleNavBackground = () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else if (!collapse || !collapse.classList.contains('show')) {
      nav.classList.remove('scrolled');
    }
  };

  toggleNavBackground();
  window.addEventListener('scroll', toggleNavBackground, { passive: true });

  if (collapse) {
    collapse.addEventListener('shown.bs.collapse', () => nav.classList.add('scrolled'));
    collapse.addEventListener('hidden.bs.collapse', toggleNavBackground);
  }

  if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 120
    });
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (typeof gsap !== 'undefined' && counters.length) {
    gsap.utils.toArray('.reveal-up').forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%'
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: 'power2.out'
      });
    });

    counters.forEach((counter) => {
      const finalValue = parseFloat(counter.dataset.counter);
      const suffix = counter.dataset.suffix || '';
      const decimals = counter.dataset.decimals ? parseInt(counter.dataset.decimals, 10) : 0;

      gsap.fromTo(counter, { innerText: 0 }, {
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          once: true
        },
        innerText: finalValue,
        duration: 1.8,
        ease: 'power3.out',
        snap: { innerText: 1 / Math.pow(10, decimals) },
        onUpdate: function () {
          const value = parseFloat(counter.innerText);
          counter.innerText = value.toFixed(decimals) + suffix;
        }
      });
    });
  }

  if (typeof Swiper !== 'undefined') {
    const leadershipSwiper = document.querySelector('.leadership-swiper');
    if (leadershipSwiper) {
      new Swiper(leadershipSwiper, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          1200: {
            slidesPerView: 3
          }
        },
        pagination: {
          el: '.leadership-pagination',
          clickable: true
        }
      });
    }
  }
});
