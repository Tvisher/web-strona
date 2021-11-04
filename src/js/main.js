
const pageSlider = new Swiper('.page', {
  //Свои классы
  wrapperClass: "page__wrapper",
  slideClass: "page__screen",
  slidesPerGroup: 1,
  noSwipingClass: 'calculations__ranges',
  // Вертикальный слайдер
  direction: 'vertical',
  parallax: true,
  // Колличество слайдев для показа
  slidesPerView: 'auto',
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
  touchRatio: 0.3,
  //Отключаем функционал если слайдов меньше чем нужно
  watchOverflow: true,
  //Скорость
  speed: 1100,
  //Навигация,буллеты,текущее положение, прогрессбар
  pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'page__bullet',
    bulletActiveClass: 'page__bullet_active',
  },
  // Отключаем автоинициализацию
  init: false,
  breakpoints: {
    768: {
      speed: 1800,
    }
  },
  //События слайдера
  on: {
    // Инициализация 
    init: function () {


    },
    afterInit: function () {
      document.body.classList.add('loaded');
    },
    // Смена слайда 
    slideChange: function () {

    },
    slideChangeTransitionStart: function () {
      if (pageSlider.slides[pageSlider.realIndex].querySelector('.services')) {
        pageSlider.disable();
        if (window.innerWidth <= 578.98) {
          servicesSlider.enable();
          servicesSlider.slideNext();
          servicesSlider.disable();
        }
      }
    },
    slideChangeTransitionEnd: function () {
      if (!pageSlider.slides[pageSlider.realIndex].querySelector('.services')) {
        servicesSlider.disable();
      } else {
        servicesSlider.enable();
        pageSlider.enable();
      }
    },
    resize: function () {
    }
  }
});
pageSlider.init();

const portfilio = new Swiper(".portfolio", {
  centeredSlides: true,
  slidesPerView: 2,
  preloadImages: true,
  loop: true,
  // slidesOffsetBefore: 50,
  // slidesOffsetAfter: 50,
  speed: 800,
  touchRatio: 1,
  //Обновить слайдер при изменении элементов слайдера
  observer: true,
  // spaceBetween: 15,
  //Обновить слайдер при изменении родительских элементов слайдера
  observeParents: true,

  //Обновить слайдер при изменении дочерних элементов слайдера
  observeSlideChildren: true,

  //Управление клавиатурой
  keyboard: {
    //Вкл/Выкл
    enable: true,

    //Вкл/Выкл только когда слайдер в пределах вьюпорта
    onlyInViewport: true,

    //Вкл/Выкл упрапвление клавишами pageUp pageDown
    pageUpDown: true,
  },
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 20,
    slideShadows: false,
  },
  breakpoints: {
    1025: {
      slidesPerView: 6,
    },
    576: {
      slidesPerView: 4,
    },
    414: {
      slidesPerView: 3,
    },
  },
  on: {
    resize: function () {

    }
  }
});
const servicesSlider = new Swiper('.services__slider', {
  //Свои классы
  wrapperClass: "services__container",
  slideClass: "services__screen",
  nested: true,
  // Вертикальный слайдер
  direction: 'vertical',
  // Колличество слайдев для показа
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  //центрирование слайда
  centeredSlides: true,
  mousewheel: {
    // Чувствительность колеса мыши
    sensitivity: 1,
    //Класс обьекта на котором буддет срабатывать прокрутка мышью
    eventsTarget: '.services',
  },
  touchEventsTarget: '.services',
  //чуствительность свайпа
  touchRatio: 0.5,
  //Скорость
  speed: 800,
  //События слайдера
  on: {
    // Инициализация 
    init: function () {

    },
  }
});


// function zIndexAdd() {
//   const slides = pageSlider.slides;
//   for (let index = 0; index < slides.length; index++) {
//     const element = slides[index];
//     element.style.zIndex = index + 1;
//   }
// }
// zIndexAdd();


const wrapper = document.querySelector('.services__wrapper');
wrapper.addEventListener('click', clickOnSlide);
function clickOnSlide(e) {
  !e.target.closest('services') && false;
  const activeTitleLi = titlesArr[servicesSlider.realIndex];
  const nextTitle = titlesArr[servicesSlider.realIndex + 1];
  // const prevtTitle = titlesArr[servicesSlider.realIndex - 1];
  for (let index = 0; index < servicesSlider.realIndex; index++) {
    const prevtTitle = titlesArr[index];
    if (activeTitleLi.classList.contains('show')) {
      prevtTitle && prevtTitle.classList.remove('prew');
    } else {
      prevtTitle && prevtTitle.classList.add('prew');
    }

  }
  // если открыто описание
  if (activeTitleLi.classList.contains('show')) {
    titlesParrent.classList.remove('show');
    activeTitleLi.classList.remove('show');
    activeTitleLi.classList.add('unshow');
    galeryWindow.classList.remove('increase');
    // prevtTitle && prevtTitle.classList.remove('prew');
    nextTitle && nextTitle.classList.remove('next');
    servicesSlider.enable();
    activeTitleLi.addEventListener('animationend', (e) => {
      if (activeTitleLi.classList.contains('unshow')) {
        activeTitleLi.classList.remove('unshow');
        // pageSlider.mousewheel.enable();
        pageSlider.enable();
        // pageSlider.allowSlidePrev = true;
        // pageSlider.allowSlideNext = true;
      }
    }, { once: true })
  } else {
    // если описание скрыто
    pageSlider.disable();
    servicesSlider.disable();
    // pageSlider.allowSlidePrev = false;
    // pageSlider.allowSlideNext = false;
    titlesParrent.classList.add('show');
    activeTitleLi.classList.add('show');
    activeTitleLi.classList.remove('unshow');
    galeryWindow.classList.add('increase');
    // prevtTitle && prevtTitle.classList.add('prew');
    nextTitle && nextTitle.classList.add('next');
  }
}

const titlesArr = [...document.querySelectorAll('.services__titles > li')];
const titlesEl = [...document.querySelectorAll('.slide__bg')];
const titlesParrent = titlesArr[0].parentElement;
const galeryArr = [...document.querySelectorAll('.galery img')];
const galeryWindow = document.querySelector('.galery');

const sliderLink = document.querySelectorAll('.services__content a');
for (let index = 0; index < sliderLink.length; index++) {
  const slideLink = sliderLink[index];
  slideLink.addEventListener('click', (e) => {
    e.preventDefault();
  })
}


let pathImage = galeryArr.map((item) => item.src);
galeryArr[0].src = pathImage[0];

window.onresize = (e) => {
  titlesParrent.addEventListener('transitionend', (e) => {
    updateSize();
  })
}
// Изменянем бэкграунд слайдов в зависимости от ширины экрана
function updateBackground() {
  if (window.innerWidth <= 578.98) {
    for (let index = 0; index < titlesEl.length; index++) {
      const element = titlesEl[index];
      element.style.backgroundImage = `url(${galeryArr[index].dataset.src})`;
    }
  }
  else {
    for (let index = 0; index < titlesEl.length; index++) {
      const element = titlesEl[index];
      element.style.backgroundImage = `none`;
    }
  }
}
updateBackground();
window.addEventListener('resize', updateBackground);

// Меняем translate у заголовков в зависимости от выбранного слайда
function updateSize() {
  let skideHeight = titlesArr[0].clientHeight;
  titlesParrent.style.transform = `translateY(-${skideHeight * servicesSlider.activeIndex}px)`;
}

// Работаем с следущим и предыдущими заголовками (скрываем или показываем)
// let counter = 0;
function translateTitle() {
  const activeSlide = servicesSlider.activeIndex; // текущий слайд
  // counter = activeSlide;
  // Меняем цвет заголовка слайда
  let activeTitle = titlesArr.find(item => item.classList.contains('active'));
  activeTitle && activeTitle.classList.remove('active');

  for (let index = 0; index < titlesArr.length; index++) {
    const title = titlesArr[index];
    index >= activeSlide && title.classList.remove('hide');
  }
  // Меняем src изображения согласно слайду
  if (window.innerWidth >= 578.98) {
    galeryArr[0].src = pathImage[activeSlide];
  }

  // Меняем цвет заголовка слайда
  titlesArr[activeSlide].classList.add('active');
  titlesArr[activeSlide - 1] && titlesArr[activeSlide - 1].classList.add('hide');
  titlesArr[activeSlide - 2] && titlesArr[activeSlide - 2].classList.add('hide');
  //Прокручиваем список заголовков
  updateSize();
}
servicesSlider.on('realIndexChange', translateTitle);



// Описываем принцип работы кастомного селекта секции бриф
const stepSelect = document.querySelector('.step__select__wrapper');
const options = stepSelect.querySelector('.options__wrapper');
const mobileSelectWrapper = document.querySelector('.mob_select_wrap');

stepSelect.addEventListener('click', (e) => {
  let selectBtn = stepSelect.querySelector('.step__select');
  let selectBtnText = stepSelect.querySelector('.select__choice');
  let option = e.target.closest('.select__option');
  let stepContent = selectBtn.closest('.step__content');
  stepContent.style.height = 'auto';

  if (selectBtn && !options.classList.contains('show')) {
    options.classList.add('show');
    selectBtn.classList.add('show');
    mobileSelectWrapper.classList.add('show');
    options.style.height = 'auto';
    // stepContent.style.height = 'auto';
    let height = options.clientHeight + 'px';
    options.style.height = '0px';
    setTimeout(function () {
      options.style.height = height;
    }, 100);
    return;
  }
  if (options.classList.contains('show') && option) {
    let optionText = option.textContent;
    selectBtnText.innerText = optionText
    selectBtn.querySelector('.client-type').value = optionText;
    closeContent();
    // // stepContent.style.height = 'auto';
    return;
  }

  if (options.classList.contains('show') && selectBtn) {
    closeContent();
    // stepContent.style.height = 'auto';
    return;
  }

  function closeContent() {
    options.style.height = '0px';
    selectBtn.classList.remove('show');
    mobileSelectWrapper.classList.remove('show');
    options.addEventListener('transitionend',
      function () {
        options.classList.remove('show');

      }, {
      once: true
    });
  }
})


const briefWrapper = document.querySelector('.brief');
const briefSteps = briefWrapper.querySelectorAll('.brief__step');
briefWrapper.addEventListener('click', (e) => {
  if (window.innerWidth <= 578.98 || (window.innerHeight < 1023 && window.innerWidth <= 768)) {
    // const stepTitle = e.target.closest('.step__title');
    const stepParent = e.target.closest('.brief__step');
    if (!stepParent) {
      return;
    }
    // const stepParent = stepTitle.closest('.brief__step');
    const stepContent = stepParent.querySelector('.step__content');
    if (stepParent.classList.contains('focus')) {
      return
    }
    remooveFocusClass();
    stepParent.classList.add('focus');
    stepContent.classList.add('show');
    stepContent.style.height = 'auto';
    let height = stepContent.clientHeight + 'px';
    stepContent.style.height = '0px';
    setTimeout(function () {
      stepContent.style.height = height;
    }, 100);
  }
  if (window.innerWidth > 578.99) {
    const stepParent = e.target.closest('.brief__step');
    remooveFocusClass();
    stepParent && stepParent.classList.add('focus');
  }
})

function remooveFocusClass() {
  for (let index = 0; index < briefSteps.length; index++) {
    const step = briefSteps[index];
    if (step.classList.contains('focus')) {
      const stepContent = step.querySelector('.step__content.show');
      if (stepContent && (window.innerWidth <= 578.98 || (window.innerHeight < 1023 && window.innerWidth <= 768))) {
        stepContent.classList.remove('show');
        stepContent.style.height = '0px';
      }
      step.classList.remove('focus');
    }
  }
}


// Принцип работы меню бургер
const burgerBtn = document.querySelector('.header__menu');
const navigationMenu = document.querySelector('.site__nav');
const navigationMenuVideoBg = navigationMenu.querySelector('.video_bg');
burgerBtn.addEventListener('click', openNavigationMenu);
function openNavigationMenu(e) {
  if (!this.classList.contains('active')) {
    navigationMenuVideoBg.play();
    this.classList.add('active');
    navigationMenu.classList.add('active');
  } else {
    setTimeout(() => {
      navigationMenuVideoBg.pause();
    }, 600);
    this.classList.remove('active');
    navigationMenu.classList.remove('active');
  }

}

//Preloader
const preloader = document.querySelector('#preloader');
const preloaderVideo = preloader.querySelector('video');
const mainVideo = document.querySelector('.main_video video');
window.addEventListener('load', (e) => {
  if (preloader) {
    preloader.classList.add('hide');
    preloaderVideo.pause();
    document.body.classList.add('loaded');
    mainVideo.play();
  }
});

// submit формы из секции бриф
const briefForm = document.querySelector('.brief__form');
briefForm.addEventListener('submit', (e) => {
  e.preventDefault();
});



//стераем галерею или востанавливаем в зависимости от ширины экрана
// const galery = document.querySelector('.galery');
// const galeryWrapper = galery.querySelector('.galery__wrapper');
// function galeryUpdate() {
//   if (window.innerWidth < 579) {
//     galery.innerHTML = '';
//   }
//   else {
//     galery.append(galeryWrapper);
//   }
//   console.log('asdasd');
// }
// galeryUpdate();
// window.addEventListener('resize', galeryUpdate);




for (let key in window.calculatorParameters) {
  window.calculatorParameters[key].unshift(0);
  window.calculatorParameters[key].forEach(price => Number(price));
}
// Параметры калькулятора
const { analizaValues, struktutraValues, programirowanieValues, promovanieValues } = window.calculatorParameters;
// Span для вывода итоговой стоимости
const totalPrice = document.querySelector('#priceValue');

//Зелёный инпут
const ANALIZA = $("#ANALIZA");
ANALIZA.ionRangeSlider({
  from_min: 1,
  values: analizaValues,
});
let analizaRange = $("#ANALIZA").data("ionRangeSlider");

//Жёлтый инпут
const STRUKTURA = $("#STRUKTURA");
STRUKTURA.ionRangeSlider({
  from_min: 1,
  values: struktutraValues,
});
let strukturaRange = $("#STRUKTURA").data("ionRangeSlider");

//Красный инпут
const PROGRAMOWANIE = $("#PROGRAMOWANIE");
PROGRAMOWANIE.ionRangeSlider({
  from_min: 1,
  values: programirowanieValues,
});
let programirowanieRange = $("#PROGRAMOWANIE").data("ionRangeSlider");

//Синий инпут
const PROMOWANIE = $("#PROMOWANIE");
PROMOWANIE.ionRangeSlider({
  from_min: 1,
  values: promovanieValues,
});
let promovanieRange = $("#PROMOWANIE").data("ionRangeSlider");

//слежка за событием изменения инпутов
$('.calculations__ranges input').change(function () {
  const inputName = this.id;
  const InputValue = Number($(this).val());
  // console.log(`Значение инпута ${inputName} : ${InputValue}`);
  totalPrice.textContent = getTotalAmount();
});

//Функция подсчёта итоговой стоимости
function getTotalAmount() {
  let totalAmount = 0;
  $('.calculations__ranges input').each(function () {
    totalAmount += Number($(this).val());
  });
  return Number(totalAmount);
}

//Выводим итоговую стоимость стартового положения ползунков
totalPrice.textContent = getTotalAmount();






