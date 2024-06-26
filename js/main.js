const searchEl = document.querySelector('.search');
// .search 요소 내부에 input 태그를 선택한다.
const searchInputEl = searchEl.querySelector('input');

// search 요소를 클릭하면 input이 focus되도돌 로직을 구성한다.
searchEl.addEventListener('click', () => {
  searchInputEl.focus();
});

// search클래스 요소 내부에있는 input요소가 focus되면 focused라는 클래스가 추가되도록한다. 여기서 focused는 검색 아이콘을 삭제하는 스타일링이 담긴 클래스이다.
// 추가로 placeholder속성을 추가하고 "통합검색" 값을 추가한다.
searchInputEl.addEventListener('focus', () => {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

// search클래스 요소 내부에있는 input요소가 blur되면 focused라는 클래스가 삭제하도록한다.
// 추가로 placeholder속성은 빈값을 추가한다.
searchInputEl.addEventListener('blur', () => {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 즉 자바스크립트는 DOM요소를 선택하고 특정 이벤트에 원하는 스타일링에 해당하는 클래스를 추가하거나 삭제하면서 요소를 동적으로 처리할 수 있도록 가능하게 해준다.

const badgeEl = document.querySelector('header .badges');

// window객체는 브라우저(보고 있는 화면 자체를 의미)가 가지고 있는 여러 명령을 가지고 있다. 브라우저에 스크롤 이벤트가 발생할 때
// loadsh 라이브러리를 가지고 온 다음 _.throttle() 메소드를 사용한다.
// 첫번째 인수로는 함수가 들어가고 두번째 인수로는 ms단위로 함수가 한번 호출될 시간을 넘긴다.
// 0.3초 단위로 부하를 주어서 함수가 연속적으로 호출되는 것을 방지하고 호출될 수 있도록 설정할 수 있다.
// window.scrollY라는 객체를 통해 위에서 부터 몇 px에 위치해있는지를 알 수 있다. 여기서 500px 보다 커지면 배지를 숨기도록 로직을 작성한다.
// 배지를 숨기고 보이게 하는 것은 따로 클래스로 지정해서 추가하고 삭제하도록 한다.
// gsap 에서의 to 메서드를 통해서 요소와, 지속시간, 옵션을 인자로 보낸다.

const toTopEl = document.querySelector('#to-top');

window.addEventListener(
  'scroll',
  _.throttle(() => {
    if (window.scrollY > 500) {
      badgeEl.style.display = 'none';
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: 'none',
      });
      // 버튼 보이기
      gsap.to('#to-top', 0.2, {
        x: 0,
      });
    } else {
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: 'block',
      });
      // 버튼 숨기기
      gsap.to('#to-top', 0.2, {
        x: 100,
      });
    }
  }, 300),
);

toTopEl.addEventListener('click', () => {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

// fade-in을 클래스로 갖는 요소들을 배열에 할당한다.
const fadeEls = document.querySelectorAll('.visual .fade-in');

// forEach를 통해 fadeEls를 순회하고 각 fadeEl마다 gsap 라이브러리 메서드를 통해 애니메이션을 부여한다.
// 각 index(0부터 시작) + 1 * 0.7만큼 지연시간을 주고 각 element마다 다른 지연시간을 부여하도록한다.
fadeEls.forEach((fadeEl, index) => {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, // 0.7 => 1.4 => 2.1 => 2.7
    opacity: 1,
  });
});

// 첫번째 인자로 CSS 선택자를 넘기고 두번째 인자로 옵션(객체)를 넘긴다.
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

new Swiper('.promotion .swiper-container', {
  // default => direction: horizontal
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 간의 여백
  centeredSlides: true, // 1번 슬라이드가 가운데로 배치
  loop: true,
  // autoplay: {
  //   delay: 5000, // 0.5초
  // },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true, // 페이지 번호 요소 제어 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next',
  },
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next',
  },
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', () => {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    promotionEl.classList.add('hide');
    return;
  }
  promotionEl.classList.remove('hide');
});

function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  // 동작시간을 random으로 변경
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    // -1 부분을 yoyo를 true로 줘서 반복될 수 있게 설정
    repeat: -1,
    yoyo: true,
    ease: 'power2.in',
    delay: random(0, delay),
  });
}

// 요소, 시간, 범위
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

// scroll-spy라는 클래스를 가지는 요소들을 감시할 예정이다.
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(spyEl => {
  // Scene() 특정한 요소를 감시하는 메서드
  // setClassToggle() trigger될때 특정 클래스가 toggle되도록 하는 메서드
  // addTo() 컨트롤러 내용 추가를 위한 메서드
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // spyEl영역의 80%에 scroll이 감시되면 setClassToggle()이 호출
  })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
