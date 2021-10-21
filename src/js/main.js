const wrapper = document.querySelector('.slide__wrapper');
// const navMenueLink = document.querySelectorAll('.menu__link');

const pageSlider = new Swiper('.page', {
  //Свои классы
  wrapperClass: "page__wrapper",
  slideClass: "page__screen",

  // Вертикальный слайдер
  direction: 'vertical',

  // Колличество слайдев для показа
  slidesPerView: 'auto',
  // spaceBetween: 20,
  centeredSlides: true,
  //Включаем паралакс
  paralax: true,

  //Управление клавиатурой
  keyboard: {
    //Вкл/Выкл
    enable: true,

    //Вкл/Выкл только когда слайдер в пределах вьюпорта
    onlyInViewport: true,

    //Вкл/Выкл упрапвление клавишами pageUp pageDown
    pageUpDown: true,
  },
  mousewheel: {
    // Чувствительность колеса мыши
    sensitivity: 1,

    //Класс обьекта на котором буддет срабатывать прокрутка мышью
    eventsTarget: '.page__wrapper',
  },
  touchEventsTarget: '.page__wrapper',

  //Отключаем функционал если слайдов меньше чем нужно
  watchOverflow: true,

  //Скорость
  speed: 400,

  //Обновить слайдер при изменении элементов слайдера
  observer: true,

  //Обновить слайдер при изменении родительских элементов слайдера
  observeParents: true,

  //Обновить слайдер при изменении дочерних элементов слайдера
  observeSlideChildren: true,

  //Навигация,буллеты,текущее положение, прогрессбар
  pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'page__bullet',
    bulletActiveClass: 'page__bullet_active',
  },

  //Скролл 
  scrollbar: {
    el: '.page__scroll',
    dragClass: 'page__drag-scroll',
    draggable: true,
  },

  // Отключаем автоинициализацию
  init: false,

  //События слайдера
  on: {
    // Инициализация 
    init: function () {
      // menuSlider();
      // setScrollType();
      document.body.classList.add('loaded');
    },

    // Смена слайда 
    slideChange: function () {
      // menuSliderRemoove();
      // navMenueLink[pageSlider.realIndex].classList.add('active');

    },

    resize: function () {
      // setScrollType();
    },
    click: function () {
      clickOnSlide();
    }
  }

});

pageSlider.init();

function clickOnSlide() {
  // console.log(pageSlider.clickedIndex);
  // Отписываем открытие описания слайда
  const activeContentParent = titlesArr[pageSlider.clickedIndex];
  const activeContentCategory = activeContentParent.querySelector('.slide__category');
  const activeContentDesc = activeContentParent.querySelector('.slide__desc');
  const activeTitleLi = titlesArr[pageSlider.clickedIndex];
  // если открыто описание
  if (activeContentCategory.classList.contains('show')) {
    activeTitleLi.classList.remove('show');
    activeTitleLi.classList.add('unshow');
    activeContentCategory.classList.remove('show');
    activeContentDesc.classList.remove('show');
    galeryWindow.classList.remove('increase');
    const nextTitle = titlesArr[pageSlider.clickedIndex + 1];
    setTimeout(() => {
      nextTitle && nextTitle.classList.remove('next');
      pageSlider.allowSlideNext = true;
      pageSlider.allowSlidePrev = true;
    }, 1000);

    return;
  }
  // если описание скрыто
  pageSlider.allowSlideNext = false;
  pageSlider.allowSlidePrev = false;
  activeTitleLi.classList.add('show');
  activeTitleLi.classList.remove('unshow');
  activeContentCategory.classList.add('show');
  activeContentDesc.classList.add('show');
  galeryWindow.classList.add('increase');
  const nextTitle = titlesArr[pageSlider.clickedIndex + 1];
  nextTitle && nextTitle.classList.add('next');

}


function menuSlider() {
  if (navMenueLink.length > 0) {
    navMenueLink[pageSlider.realIndex].classList.add('active')
    for (let index = 0; index < navMenueLink.length; index++) {
      const menuLink = navMenueLink[index];
      menuLink.addEventListener("click", (e) => {
        menuSliderRemoove();
        pageSlider.slideTo(index, 800);
        menuLink.classList.add('active');
        e.preventDefault();
      })
    }
  }
}

function menuSliderRemoove() {
  let activeMenuLink = document.querySelector('.menu__link.active');
  activeMenuLink && activeMenuLink.classList.remove('active')
}

// function setScrollType() {
//   if (wrapper.classList.contains('free')) {
//     wrapper.classList.remove('free');
//     pageSlider.params.freeMode.enabled = false;
//   }

//   for (let index = 0; index < pageSlider.slides.length; index++) {
//     const pageSlide = pageSlider.slides[index];
//     const pageSlideContent = pageSlide.querySelector('.screen__content');
//     if (pageSlideContent) {
//       const pageSlideContentHeight = pageSlideContent.offsetHeight;
//       if (pageSlideContentHeight > window.innerHeight) {
//         wrapper.classList.add('free');
//         pageSlider.params.freeMode.enabled = true;
//         pageSlider.update();
//         break;
//       }
//     }
//   }
// }

const titlesArr = [...document.querySelectorAll('.slider__titles > li')];
const titlesParrent = titlesArr[0].parentElement;
const galeryArr = [...document.querySelectorAll('.galery img')];
const galeryWindow = document.querySelector('.galery');

const sliderLink = document.querySelectorAll('.screen__content a');
for (let index = 0; index < sliderLink.length; index++) {
  const slideLink = sliderLink[index];
  slideLink.addEventListener('click', (e) => {
    e.preventDefault();
  })
}


let pathImage = galeryArr.map((item) => item.src);
galeryArr[0].src = pathImage[0];
let skideHeight = titlesArr[0].clientHeight;
let counter = 0;
function translateTitle() {
  console.log(pageSlider.activeIndex);
  const activeSlide = pageSlider.activeIndex; // текущий слайд
  counter = activeSlide;
  // Меняем цвет заголовка слайда
  let activeTitle = titlesArr.find(item => item.classList.contains('active'));
  activeTitle && activeTitle.classList.remove('active');

  for (let index = 0; index < titlesArr.length; index++) {
    const title = titlesArr[index];
    index >= activeSlide && title.classList.remove('hide');
  }
  // Меняем src изображения согласно слайду
  galeryArr[0].src = pathImage[activeSlide];
  // Меняем цвет заголовка слайда
  titlesArr[activeSlide].classList.add('active');
  titlesArr[activeSlide - 1] && titlesArr[activeSlide - 1].classList.add('hide');
  titlesArr[activeSlide - 2] && titlesArr[activeSlide - 2].classList.add('hide');
  //Прокручиваем список заголовков
  updateSize();
}

window.onresize = (e) => {
  titlesParrent.addEventListener('transitionend', (e) => {
    updateSize()
  }, { once: true })

}

function updateBackground() {
  if (window.innerWidth <= 576) {
    console.log('bg');
    for (let index = 0; index < titlesArr.length; index++) {
      const element = titlesArr[index];
      element.style.backgroundImage = `url(${galeryArr[index].src})`;
    }
  }
  else {
    console.log('nobg');
    for (let index = 0; index < titlesArr.length; index++) {
      const element = titlesArr[index];
      element.style.backgroundImage = `none`;
    }
  }
}
updateBackground();
window.addEventListener('resize', updateBackground);

function updateSize() {
  skideHeight = titlesArr[0].clientHeight;
  titlesParrent.style.transform = `translateY(-${skideHeight * counter}px)`;
}

pageSlider.on('realIndexChange', translateTitle);







