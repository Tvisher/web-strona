//Технически переменные
const headerLogo = document.querySelector('.header__logo');
const mainPagination = document.querySelector('.page__pagination');
const diagramPage = document.querySelector('.visualization');
const diagramContent = diagramPage.querySelector('.calculations');
const diagramPageWrapper = diagramPage.parentNode;


//Переменныe для перемещиня элементов калькулятора
const parent_original = document.querySelector('.calculations');
const parent = document.querySelector('.calculations__footer');
const item = document.querySelector('.calculations__levels');

//Функция для перемещиня элементов калькулятора
function move() {
  const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  if (viewport_width <= 579) {
    if (!item.classList.contains('done')) {
      parent.insertBefore(item, parent.children[1]);
      item.classList.add('done');
    }
  } else {
    if (item.classList.contains('done')) {
      parent_original.insertBefore(item, parent_original.children[3]);
      item.classList.remove('done');
    }
  }
}

// Вызываем функцию
move();
//Главный слайдер сайта
const pageSlider = new Swiper('.page', {
  //Свои классы
  wrapperClass: "page__wrapper",
  slideClass: "page__screen",
  slidesPerGroup: 1,
  noSwipingClass: 'no-swipe',
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
  threshold: 5,
  //Отключаем функционал если слайдов меньше чем нужно
  watchOverflow: true,
  //Скорость
  speed: 1100,
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
      // checkWindowSize()
    },
    afterInit: function () {
      document.body.classList.add('loaded');
    },
    // Смена слайда
    slideChange: function () {

    },
    slideChangeTransitionStart: function () {
      // настройки корректной работы главного слайдера для каждой секции
      if (pageSlider.slides[pageSlider.realIndex].querySelector('.services')) {
        pageSlider.disable();
        if (window.innerWidth <= 578.98 && pageSlider.previousIndex < pageSlider.realIndex) {
          servicesSlider.enable();
          servicesSlider.slideTo(1);
          servicesSlider.disable();
        }
      }
      if (pageSlider.slides[pageSlider.realIndex].querySelector('.visualization')) {
        mainPagination.classList.add('move')
        document.querySelector('.footer').style.width = "30%";

      } else {
        mainPagination.classList.remove('move')
        document.querySelector('.footer').style.width = "100%";
      }
      hideLogo();
    },
    slideChangeTransitionEnd: function () {
      // настройки корректной работы главного слайдера для каждой секции
      checkWindowSize();
      if (!pageSlider.slides[pageSlider.realIndex].querySelector('.services')) {
        servicesSlider.disable();
      } else {
        servicesSlider.enable();
        pageSlider.enable();
      }
    },
    resize: function () {
      checkWindowSize();
      move();
      hideLogo();
    }
  }
});
pageSlider.init();


// Слайдер с текстовыми блоками
const descriptionModalElement = document.querySelector('.description_modal');
const descriptionModalWrapper = document.querySelector('.description_modal__wrapper');
const descriptionModal = new Swiper('.description_modal', {
  //Свои классы
  wrapperClass: "description_modal__wrapper",
  slideClass: "description_modal__sectoion",
  slidesPerGroup: 1,
  noSwipingClass: 'no-swipe',
  // Вертикальный слайдер
  direction: 'vertical',
  // Колличество слайдев для показа
  slidesPerView: 'auto',

  init: false,
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
    sensitivity: 0.4,
    //Класс обьекта на котором буддет срабатывать прокрутка мышью
    eventsTarget: '.description_modal__wrapper',
  },
  touchEventsTarget: '.description_modal__wrapper',
  touchRatio: 1,
  //Отключаем функционал если слайдов меньше чем нужно
  watchOverflow: true,
  //Обновить слайдер при изменении элементов слайдера
  observer: true,

  //Обновить слайдер при изменении родительских элементов слайдера
  observeParents: true,

  //Обновить слайдер при изменении дочерних элементов слайдера
  observeSlideChildren: true,
  //Скорость
  speed: 1200,
  //Навигация,буллеты,текущее положение, прогрессбар
  pagination: {
    el: '.description_modal__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'description_modal__bullet',
    bulletActiveClass: 'description_modal__bullet_active',
  },
  // Отключаем автоинициализацию
  breakpoints: {
    768: {
      speed: 1600,
      touchRatio: 0.3,
    }
  },
  //События слайдера
  on: {
    // Инициализация
    init: function () {
      setScrollType();
    },
    afterInit: function () {

    },
    // Смена слайда
    slideChange: function () {

    },
    slideChangeTransitionStart: function () {

    },
    slideChangeTransitionEnd: function () {

    },
    resize: function () {
      setScrollType();
      this.update()
    }
  }
});
descriptionModal.init();

//Проверка помещяется ли контент в область экрана. Если нет, отключаем поэкранную прокрутку
function setScrollType() {
  if (descriptionModalWrapper.classList.contains('free')) {
    descriptionModalWrapper.parentNode.classList.remove('free');
    descriptionModalWrapper.classList.remove('free');
    descriptionModal.params.freeMode.enabled = false;
  }
  for (let index = 0; index < descriptionModal.slides.length; index++) {
    const pageSlide = descriptionModal.slides[index];
    const pageSlideContent = pageSlide.querySelector('.section__content');
    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.scrollHeight;
      if (pageSlideContentHeight > window.innerHeight) {
        descriptionModalWrapper.parentNode.classList.add('free');
        descriptionModalWrapper.classList.add('free');
        descriptionModal.params.freeMode.enabled = true;
        descriptionModal.update();
        break;
      }
    }
  }
}


//Логика работы ссылок в меню
const navContent = document.querySelector('.nav__content');
navContent.addEventListener('click', openDescriptionModal);

function openDescriptionModal(e) {
  if (!e.target.closest('a')) {
    return;
  }
  descriptionModalElement.classList.remove('show');
  document.querySelector('.footer ').classList.remove('dark');
  headerLogo.style.opacity = '1';
  if (document.querySelector(".portfolio__work.show")) {
    document.querySelector(".portfolio__work.show").classList.remove('show');
  }

  //Если нажали на ссылки модалки
  const linkDataModalId = e.target.dataset.modalId;
  if (linkDataModalId) {
    e.preventDefault();
    const slideIndex = descriptionModal.slides.findIndex(item => item.id === linkDataModalId);
    descriptionModal.slideTo(slideIndex, 100, false);
    if (document.querySelector('.description_modal__wrapper.free')) {
      document.querySelector('.footer ').classList.add('dark');
    }
    descriptionModalElement.classList.add('show');
    headerLogo.style.opacity = '0';
    headerLogo.style.visibility = 'hidden';
  }
  // Если нажали на ссылки главной страницы
  const linkDataMainId = e.target.dataset.mainId;
  if (linkDataMainId) {
    e.preventDefault();
    const slideIndex = pageSlider.slides.findIndex(item => item.id === linkDataMainId);
    pageSlider.slideTo(slideIndex, 100);
  }
  //Закрываем меню
  setTimeout(() => {
    $('.header__menu').click();
  }, 200);
}

const contactsBriefBtn = document.querySelector('.contacts__brief');
contactsBriefBtn.onclick = function (e) {
  e.preventDefault();
  const linkDataMainId = contactsBriefBtn.dataset.mainId;
  const slideIndex = pageSlider.slides.findIndex(item => item.id === linkDataMainId);
  pageSlider.slideTo(slideIndex, 100);
  headerLogo.style.opacity = '1';
  descriptionModalElement.classList.remove('show');
}


// Логика работы нажатия на логотип при разных условиях
headerLogo.onclick = clickToLogo;

function clickToLogo(e) {
  if (document.querySelector('.services__titles.show')) {
    return;
  }
  if (document.querySelector(".portfolio__work.show")) {
    document.querySelector(".portfolio__work.show").classList.remove('show');
    return;
  }
  if (document.querySelector('.description_modal.show') && document.querySelector('.site__nav.active')) {
    document.querySelector('.description_modal').classList.remove('show');
    pageSlider.slideTo(0);
    $('.header__menu').click();
    return;
  }
  if (document.querySelector('.site__nav.active')) {
    $('.header__menu').click();
    pageSlider.slideTo(0, 100);
  } else {
    pageSlider.slideTo(0);
  }
}

document.querySelector('.section_logo').onclick = clickToLogo;


//Логика работы ссылок на главном экране
const mainPageLinks = document.querySelector('.links__wrapper');
mainPageLinks.onclick = function (e) {
  if (!e.target.closest('a')) {
    return;
  }
  e.preventDefault();
  const linkDataMainId = e.target.dataset.mainId;
  const slideIndex = pageSlider.slides.findIndex(item => item.id === linkDataMainId);
  pageSlider.slideTo(slideIndex, 1800);
  if (pageSlider.slides[slideIndex].id === 'oferta' && window.innerWidth <= 578.98) {
    servicesSlider.slideTo(1);
    servicesSlider.enable();
  }

}


//Слайдер секции портфолио
const portfilio = new Swiper(".portfolio", {
  centeredSlides: true,
  slidesPerView: 2,
  preloadImages: true,
  loop: true,
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
    // 1465: {
    //   slidesPerView: 6,
    // },
    // 1025: {
    //   slidesPerView: 5,
    // },
    // 414: {
    //   slidesPerView: 3,
    // },
    1025: {
      slidesPerView: 6
    },
    768: {
      slidesPerView: 2
    },
    414: {
      slidesPerView: 3
    }
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

// Принцип работы открытия работы в портфолио
const portfolioSlides = document.querySelector('#portfolio');
portfolioSlides.addEventListener('click', showTargetWork);

function showTargetWork(e) {
  const workLink = e.target.closest('a');
  if (!workLink) {
    return;
  }
  const workLinkDatasetId = workLink.dataset.workId;
  const portfolioWork = document.querySelector(`.portfolio__work[data-work-id="${workLinkDatasetId}"]`);
  if (portfolioWork) {
    const portfolioWorkContent = portfolioWork.querySelector('.work__content');
    portfolioWorkContent.style.paddingTop = `${document.querySelector('header').clientHeight}px`;
    portfolioWork.classList.add('show');
    window.addEventListener("resize", (e) => {
      if (portfolioWork.classList.contains('show')) {
        portfolioWorkContent.style.paddingTop = `${document.querySelector('header').clientHeight}px`;
      }
    })
  }
}


// Техническая функция для адпативной работы секции с диаграммой
function checkWindowSize() {
  const windowInnerHeight = document.documentElement.clientHeight;
  if (windowInnerHeight < diagramPage.scrollHeight) {
    diagramPageWrapper.classList.add('no-swipe')
  } else {
    diagramPageWrapper.classList.remove('no-swipe')
  }
}

//Функция для скрытия лого в шапке сайта
function hideLogo() {
  if (pageSlider.slides[pageSlider.realIndex].querySelector('.visualization') && window.innerWidth > 1024 && !document.querySelector('.header__menu.active')
  ) {
    headerLogo.style.opacity = '0';
    headerLogo.style.visibility = 'hidden';
  } else {
    if (!document.querySelector('.description_modal.show')) {
      headerLogo.style.opacity = '1';
      headerLogo.style.visibility = 'visible';
    }

  }
}

// Логика работы секции услуг
const wrapper = document.querySelector('.services__wrapper');
wrapper.addEventListener('click', clickOnSlide);

function clickOnSlide(e) {
  !e.target.closest('services') && false;
  const activeTitleLi = titlesArr[servicesSlider.realIndex];
  const nextTitle = titlesArr[servicesSlider.realIndex + 1];
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
    nextTitle && nextTitle.classList.remove('next');
    servicesSlider.enable();
    activeTitleLi.addEventListener('animationend', (e) => {
      if (activeTitleLi.classList.contains('unshow')) {
        activeTitleLi.classList.remove('unshow');
        pageSlider.enable();
      }
    }, { once: true })
  } else {
    // если описание скрыто
    pageSlider.disable();
    servicesSlider.disable();
    titlesParrent.classList.add('show');
    activeTitleLi.classList.add('show');
    activeTitleLi.classList.remove('unshow');
    galeryWindow.classList.add('increase');
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

// Операция для корректной работы секции с услугами
let pathImage = galeryArr.map((item) => item.src);
galeryArr[0].src = pathImage[0];

window.addEventListener('resize', (e) => {
  titlesParrent.addEventListener('transitionend', (e) => {
    updateSize();
  })
})

// Изменянем бэкграунд слайдов в зависимости от ширины экрана
function updateBackground() {
  if (window.innerWidth <= 578.98) {
    for (let index = 0; index < titlesEl.length; index++) {
      const element = titlesEl[index];
      element.style.backgroundImage = `url(${galeryArr[index].dataset.src})`;
    }
  } else {
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
function translateTitle() {
  const activeSlide = servicesSlider.activeIndex; // текущий слайд
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
    return;
  }

  if (options.classList.contains('show') && selectBtn) {
    closeContent();
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
    const stepParent = e.target.closest('.brief__step');
    if (!stepParent) {
      return;
    }
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
    setTimeout(() => {
      headerLogo.style.opacity = '1';
      headerLogo.style.visibility = 'visible';
    }, 300);
    navigationMenuVideoBg.play();
    this.classList.add('active');
    navigationMenu.classList.add('active');

  } else {
    if (pageSlider.slides[pageSlider.realIndex].querySelector('.visualization') && window.innerWidth > 1024) {
      headerLogo.style.opacity = '0';
      headerLogo.style.visibility = 'hidden';
    }
    setTimeout(() => {
      navigationMenuVideoBg.pause();
    }, 600);
    this.classList.remove('active');
    navigationMenu.classList.remove('active');
    if (document.querySelector('.description_modal.show')) {
      headerLogo.style.opacity = '0';
      headerLogo.style.visibility = 'hidden';
    }
  }

}

//Preloader
const preloader = document.querySelector('#preloader');
const preloaderVideo = preloader.querySelector('video');
const mainVideo = document.querySelector('.main_video video');
const mainScreenContentLi = document.querySelectorAll('.main__content_list > li');

function UpdateMainText() {
  let interval = 0;
  const step = 8333;
  const transitionInterval = 1250;
  setTimeout(() => {
    mainScreenContentLi[2].classList.remove('up');
    mainScreenContentLi[2].classList.add('down');
    setTimeout(() => {
      mainScreenContentLi[0].classList.add('up');
    }, transitionInterval);
    setTimeout(() => {
      mainScreenContentLi[2].classList.remove('down');
    }, 1000);
  }, interval);
  interval += step;
  setTimeout(() => {
    mainScreenContentLi[0].classList.remove('up');
    mainScreenContentLi[0].classList.add('down');
    setTimeout(() => {
      mainScreenContentLi[1].classList.add('up');
    }, transitionInterval);
    setTimeout(() => {
      mainScreenContentLi[0].classList.remove('down');
    }, 1000);
  }, interval);

  interval += step;
  setTimeout(() => {
    mainScreenContentLi[1].classList.remove('up');
    mainScreenContentLi[1].classList.add('down');
    setTimeout(() => {
      mainScreenContentLi[2].classList.add('up');
    }, transitionInterval);

    setTimeout(() => {
      mainScreenContentLi[1].classList.remove('down');
    }, 1000);
  }, interval);
}

// принцип работы прелоадера и текста на главном экране
window.addEventListener('load', (e) => {
  if (preloader) {
    preloader.classList.add('hide');
    preloaderVideo.pause();
    document.body.classList.add('loaded');
    mainVideo.play();
    UpdateMainText();
    setInterval(() => {
      UpdateMainText();
    }, 25000);
  }
});

// submit формы из секции бриф
const briefForm = document.querySelector('.brief__form');
briefForm.addEventListener('submit', (e) => {
  e.preventDefault();
});
// Размытие фона в textarea секции бриф
const textareaWrapper = document.querySelector('.textarea__wrapper');
const textArea = textareaWrapper.querySelector('textarea');
const blurBg = textareaWrapper.querySelector('.blur__bg');
textArea.addEventListener('focus', (e) => {
  blurBg.classList.add('show')
  textArea.addEventListener('blur', (e) => {
    blurBg.classList.remove('show')
  }, { once: true });
})


//Добавляем в каждое поле параметров калькулятора цифру 0 для корректной настройки плагина ползунков
for (let key in window.calculatorParameters) {
  window.calculatorParameters[key].unshift(0);
  window.calculatorParameters[key].forEach(price => Number(price));
}
// Деструктурируем параметры калькулятора
const { analizaValues, struktutraValues, programirowanieValues, promovanieValues } = window.calculatorParameters;

// Span для вывода итоговой стоимости
const totalPrice = document.querySelector('#priceValue');

//Зелёный ползунок
const ANALIZA = $("#ANALIZA");
ANALIZA.ionRangeSlider({
  from_min: 1,
  values: analizaValues,
});
let analizaRange = $("#ANALIZA").data("ionRangeSlider");

//Жёлтый ползунок
const STRUKTURA = $("#STRUKTURA");
STRUKTURA.ionRangeSlider({
  from_min: 1,
  values: struktutraValues,
});
let strukturaRange = $("#STRUKTURA").data("ionRangeSlider");

//Красный ползунок
const PROGRAMOWANIE = $("#PROGRAMOWANIE");
PROGRAMOWANIE.ionRangeSlider({
  from_min: 1,
  values: programirowanieValues,
});
let programirowanieRange = $("#PROGRAMOWANIE").data("ionRangeSlider");

//Синий ползунок
const PROMOWANIE = $("#PROMOWANIE");
PROMOWANIE.ionRangeSlider({
  from_min: 0,
  values: promovanieValues,
});
let promovanieRange = $("#PROMOWANIE").data("ionRangeSlider");

//Слежка за событием изменения ползунков
$('.calculations__ranges input').change(function () {
  const inputName = this.id;
  const InputValue = Number($(this).val());
  totalPrice.textContent = getTotalAmount();
  updateDiagramSize(inputName, InputValue);
});

//Функция подсчёта итоговой стоимости
function getTotalAmount() {
  let percent = 1;
  const calculationsTypes = document.querySelectorAll('.calculations__type');
  for (let index = 0; index < calculationsTypes.length; index++) {
    const calculationsTypeBtn = calculationsTypes[index];
    if (!calculationsTypeBtn.classList.contains('active')) {
      continue;
    }
    if (calculationsTypeBtn.dataset.type === 'landing') {
      percent = 1;
    }
    if (calculationsTypeBtn.dataset.type === 'website') {
      percent = 2.3;
    }
    if (calculationsTypeBtn.dataset.type === 'e-shop') {
      percent = 2.6;
    }
  }
  let totalAmount = 0;
  $('.calculations__ranges input').each(function () {
    totalAmount += Number($(this).val());
  });
  return Math.round(Number(totalAmount * percent));
}

// Отрабатываем событие выбора типа проекта
document.querySelector('.calculations__types').addEventListener('click', function (e) {
  const btn = e.target.closest('.calculations__type');
  if (!btn) {
    return;
  }
  let activeBtn = document.querySelector('.calculations__type.active');
  activeBtn.classList.remove('active');
  btn.classList.add('active');
  totalPrice.textContent = getTotalAmount();
  $('.calculations__level[data-type="classical"]').click();
});

// Отрабатываем событие выбора уровня проекта
document.querySelector('.calculations__levels').addEventListener('click', function (e) {
  const btn = e.target.closest('.calculations__level');
  if (!btn) {
    return;
  }
  let activeBtn = document.querySelector('.calculations__level.active');
  activeBtn.classList.remove('active');
  btn.classList.add('active');
  const btnType = btn.dataset.type;
  switch (btnType) {
    case 'classical':
      analizaRange.update({
        from: 4
      });
      strukturaRange.update({
        from: 5
      });
      programirowanieRange.update({
        from: 4
      });
      promovanieRange.update({
        from: 3
      });
      break;
    case 'high':
      analizaRange.update({
        from: 6
      });
      strukturaRange.update({
        from: 5
      });
      programirowanieRange.update({
        from: 6
      });
      promovanieRange.update({
        from: 6
      });
      break;
    case 'special':
      analizaRange.update({
        from: 8
      });
      strukturaRange.update({
        from: 8
      });
      programirowanieRange.update({
        from: 8
      });
      promovanieRange.update({
        from: 8
      });
      break;
    default:
      break;
  }
});

//Выводим итоговую стоимость стартового положения ползунков в спан
totalPrice.textContent = getTotalAmount();

//Сферы и описание сеции анализ
const analizZapoznania = document.querySelector('.analiz__zapoznania'),
  analizWyznaczanieCeli = document.querySelector('.analiz__wyznaczanie_celi'),
  analizWyznaczanieZadan = document.querySelector('.analiz__wyznaczanie_zadan'),
  analizOkreszleniaCelow = document.querySelector('.analiz__okreszlenia_celow'),
  analizOkreszleniaCelowDescKlient = document.querySelector('.analiz__okreszlenia_celow_desc.klient'),
  analizWyjatkoweElementy = document.querySelector('.analiz__wyjatkowe_elementy'),
  analizWyjatkoweElementyDescKlient = document.querySelector('.analiz__wyjatkowe_elementy_desc.klient'),
  analizWizjaPozycjonowanie = document.querySelector('.analiz__wizja_pozycjonowanie'),
  analizWizjaPozycjonowanieDescKlient = document.querySelector('.analiz__wizja_pozycjonowanie_desc.klient');

// Сферы и описание секции структура
const strukturaKontentGraficzny = document.querySelector('.struktura__kontent_graficzny'),
  strukturaStronaGlowna = document.querySelector('.struktura__strona_glowna'),
  strukturaKontentTekstowy = document.querySelector('.struktura__kontent_tekstowy'),
  strukturaStronyWenetrzne = document.querySelector('.struktura__strony_wenetrzne'),
  strukturaStronyWenetrzneDescStudia = document.querySelector('.struktura__strony_wenetrzne_desc.studia')
  ;

// Сферы секции програмирование
const programovanieStronyGlownej = document.querySelector('.programovanie__strony_glownej'),
  programovanieTestowanie = document.querySelector('.programovanie__testowanie'),
  programovanieStronWewnetrznych = document.querySelector('.programovanie__stron_wewnetrznych'),
  programovanieStronWewnetrznychDescStudia = document.querySelector('.programovanie__stron_wewnetrznych_desc.studia')
  ;

// Сферы секции продвижение
const promovanieUruchomienieStrony = document.querySelector('.promovanie__uruchomienie_strony'),
  promovanieUruchomienieStronyDescSrudia = document.querySelector('.promovanie__uruchomienie_strony_desc.studia'),

  promovanieSeoOptymizacja = document.querySelector('.promovanie__seo_optymizacja'),
  promovanieSeoOptymizacjaDescStudia = document.querySelector('.promovanie__seo_optymizacja_desc.studia'),


  promovanieSmm = document.querySelector('.promovanie__smm'),
  promovanieSmmDescStudia = document.querySelector('.promovanie__smm_desc.studia'),
  promovanieSmmDescKlient = document.querySelector('.promovanie__smm_desc.klient'),

  promovaniePr = document.querySelector('.promovanie__pr'),
  promovaniePrDescStudia = document.querySelector('.promovanie__pr_desc.studia'),
  promovaniePrDescLKient = document.querySelector('.promovanie__pr_desc.klient'),

  promovanieDoskonalenie = document.querySelector('.promovanie__doskonalenie'),
  promovanieDoskonalenieDescStudia = document.querySelector('.promovanie__doskonalenie_desc.studia');
;


// Функция, описывающая размеры сфер диаграммы в зависимости от положения ползунков
function updateDiagramSize(inputName, InputValue) {
  if (inputName === 'ANALIZA') {
    let analizaRangeIndex = analizaValues.findIndex(value => value === InputValue);
    switch (analizaRangeIndex) {
      case 1:
        Object.assign(analizZapoznania.style, {
          width: '6vw',
          height: '6vw',
        });
        Object.assign(analizWyznaczanieCeli.style, {
          width: '7vw',
          height: '7vw',
        });
        Object.assign(analizWyznaczanieZadan.style, {
          width: '7.5vw',
          height: '7.5vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '0';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '0';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '0';
        break;
      case 2:
        Object.assign(analizZapoznania.style, {
          width: '7.3vw',
          height: '7.3vw',
        });

        Object.assign(analizWyznaczanieCeli.style, {
          width: '8.3vw',
          height: '8.3vw',
        });

        Object.assign(analizWyznaczanieZadan.style, {
          width: '8.5vw',
          height: '8.5vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '0';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '0';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '0';
        break;
      case 3:
        Object.assign(analizZapoznania.style, {
          width: '8vw',
          height: '8vw',
        });

        Object.assign(analizWyznaczanieCeli.style, {
          width: '9.1vw',
          height: '9.1vw',
        });

        Object.assign(analizWyznaczanieZadan.style, {
          width: '9.4vw',
          height: '9.4vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '0';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '0';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '0';
        break;
      case 4:
        Object.assign(analizZapoznania.style, {
          width: '9.1vw',
          height: '9.1vw',
        });

        Object.assign(analizWyznaczanieCeli.style, {
          width: '9.6vw',
          height: '9.6vw',
        });

        Object.assign(analizWyznaczanieZadan.style, {
          width: '9.9vw',
          height: '9.9vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '0';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '0';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '0';
        break;
      case 5:
        Object.assign(analizZapoznania.style, {
          width: '10vw',
          height: '10vw',
        });

        Object.assign(analizWyznaczanieCeli.style, {
          width: '10.2vw',
          height: '10.2vw',
        });

        Object.assign(analizWyznaczanieZadan.style, {
          width: '10.4vw',
          height: '10.4vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '7vw',
          height: '7vw',
          opacity: '1'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '1';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '0';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '0';
        break;
      case 6:
        Object.assign(analizZapoznania.style, {
          width: '12.2vw',
          height: '12.2vw',
        });

        Object.assign(analizWyznaczanieCeli.style, {
          width: '12.2vw',
          height: '12.2vw',
        });

        Object.assign(analizWyznaczanieZadan.style, {
          width: '12.1vw',
          height: '12.1vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '9.4vw',
          height: '9.4vw',
          opacity: '1'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '1';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '7.8vw',
          height: '7.8vw',
          opacity: '1'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '1';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '0';
        break;
      case 7:
        Object.assign(analizZapoznania.style, {
          width: '12.8vw',
          height: '12.8vw',
        });

        Object.assign(analizWyznaczanieCeli.style, {
          width: '12.8vw',
          height: '12.8vw',
        });

        Object.assign(analizWyznaczanieZadan.style, {
          width: '12.5vw',
          height: '12.5vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '10.4vw',
          height: '10.4vw',
          opacity: '1'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '1';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '9.1vw',
          height: '9.1vw',
          opacity: '1'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '1';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '0';
        break;
      case 8:
        Object.assign(analizZapoznania.style, {
          width: '13.8vw',
          height: '13.8vw',
        });

        Object.assign(analizWyznaczanieCeli.style, {
          width: '13.5vw',
          height: '13.5vw',
        });

        Object.assign(analizWyznaczanieZadan.style, {
          width: '13vw',
          height: '13vw',
        });
        Object.assign(analizOkreszleniaCelow.style, {
          width: '12.5vw',
          height: '12.5vw',
          opacity: '1'
        });
        analizOkreszleniaCelowDescKlient.style.opacity = '1';
        Object.assign(analizWyjatkoweElementy.style, {
          width: '11vw',
          height: '11vw',
          opacity: '1'
        });
        analizWyjatkoweElementyDescKlient.style.opacity = '1';
        Object.assign(analizWizjaPozycjonowanie.style, {
          width: '8.2vw',
          height: '8.2vw',
          opacity: '1'
        });
        analizWizjaPozycjonowanieDescKlient.style.opacity = '1';
        break;
      default:
        break;
    }
  }
  if (inputName === 'STRUKTURA') {
    let strukturaRangeIndex = struktutraValues.findIndex(value => value === InputValue);
    switch (strukturaRangeIndex) {
      case 1:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '6.2vw',
          height: '6.2vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '6.3vw',
          height: '6.3vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '6.5vw',
          height: '6.5vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '0';
        break;
      case 2:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '6.8vw',
          height: '6.8vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '9.1vw',
          height: '9.1vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '7.3vw',
          height: '7.3vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '0';
        break;
      case 3:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '7.8vw',
          height: '7.8vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '9.1vw',
          height: '9.1vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '8.1vw',
          height: '8.1vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '8.3vw',
          height: '8.3vw',
          opacity: '1'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '1';
        break;
      case 4:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '8.3vw',
          height: '8.3vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '9.9vw',
          height: '9.9vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '8.6vw',
          height: '8.6vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '8.9vw',
          height: '8.9vw',
          opacity: '1'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '1';
        break;
      case 5:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '10.4vw',
          height: '10.4vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '11.2vw',
          height: '11.2vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '9.6vw',
          height: '9.6vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '9.4vw',
          height: '9.4vw',
          opacity: '1'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '1';
        break;
      case 6:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '14.1vw',
          height: '14.1vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '13.9vw',
          height: '13.9vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '12vw',
          height: '12vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '11.2vw',
          height: '11.2vw',
          opacity: '1'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '1';
        break;
      case 7:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '14.8vw',
          height: '14.8vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '14.3vw',
          height: '14.3vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '12.8vw',
          height: '12.8vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '11.7vw',
          height: '11.7vw',
          opacity: '1'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '1';
        break;
      case 8:
        Object.assign(strukturaKontentGraficzny.style, {
          width: '15.6vw',
          height: '15.6vw',
        });
        Object.assign(strukturaStronaGlowna.style, {
          width: '15.6vw',
          height: '15.6vw',
        });
        Object.assign(strukturaKontentTekstowy.style, {
          width: '14.1vw',
          height: '14.1vw',
        });
        Object.assign(strukturaStronyWenetrzne.style, {
          width: '12.8vw',
          height: '12.8vw',
          opacity: '1'
        });
        strukturaStronyWenetrzneDescStudia.style.opacity = '1';
        break;
      default:
        break;
    }
  }
  if (inputName === 'PROGRAMOWANIE') {
    let programirovanieRangeIndex = programirowanieValues.findIndex(value => value === InputValue);
    switch (programirovanieRangeIndex) {
      case 1:
        Object.assign(programovanieStronyGlownej.style, {
          width: '7.7vw',
          height: '7.7vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '7vw',
          height: '7vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '0';
        break;
      case 2:
        Object.assign(programovanieStronyGlownej.style, {
          width: '8.3vw',
          height: '8.3vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '7.8vw',
          height: '7.8vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '0';
        break;
      case 3:
        Object.assign(programovanieStronyGlownej.style, {
          width: '8.6vw',
          height: '8.6vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '8.1vw',
          height: '8.1vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '7.8vw',
          height: '7.8vw',
          opacity: '1',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '1';
        break;
      case 4:
        Object.assign(programovanieStronyGlownej.style, {
          width: '9.6vw',
          height: '9.6vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '8.6vw',
          height: '8.6vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '8.9vw',
          height: '8.9vw',
          opacity: '1',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '1';
        break;
      case 5:
        Object.assign(programovanieStronyGlownej.style, {
          width: '11.7vw',
          height: '11.7vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '10.4vw',
          height: '10.4vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '10.9vw',
          height: '10.9vw',
          opacity: '1',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '1';
        break;
      case 6:
        Object.assign(programovanieStronyGlownej.style, {
          width: '13.5vw',
          height: '13.5vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '12.2vw',
          height: '12.2vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '11.7vw',
          height: '11.7vw',
          opacity: '1',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '1';
        break;
      case 7:
        Object.assign(programovanieStronyGlownej.style, {
          width: '14.3vw',
          height: '14.3vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '13vw',
          height: '13vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '12.5vw',
          height: '12.5vw',
          opacity: '1',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '1';
        break;
      case 8:
        Object.assign(programovanieStronyGlownej.style, {
          width: '15.4vw',
          height: '15.4vw',
        });
        Object.assign(programovanieTestowanie.style, {
          width: '14.1vw',
          height: '14.1vw',
        });
        Object.assign(programovanieStronWewnetrznych.style, {
          width: '13.3vw',
          height: '13.3vw',
          opacity: '1',
        });
        programovanieStronWewnetrznychDescStudia.style.opacity = '1';
        break;
      default:
        break;
    }
  }
  if (inputName === 'PROMOWANIE') {
    let promowanieRangeIndex = promovanieValues.findIndex(value => value === InputValue);
    switch (promowanieRangeIndex) {
      case 0:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '0';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '0';
        Object.assign(promovanieSmm.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieSmmDescKlient.style.opacity = '0';
        promovanieSmmDescStudia.style.opacity = '0';
        Object.assign(promovaniePr.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovaniePrDescLKient.style.opacity = '0';
        promovaniePrDescStudia.style.opacity = '0';
        Object.assign(promovanieDoskonalenie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '0';
        break;
      case 1:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '4.6vw',
          height: '4.6vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '7vw',
          height: '7vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieSmmDescKlient.style.opacity = '0';
        promovanieSmmDescStudia.style.opacity = '0';
        Object.assign(promovaniePr.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovaniePrDescLKient.style.opacity = '0';
        promovaniePrDescStudia.style.opacity = '0';
        Object.assign(promovanieDoskonalenie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '0';
        break;
      case 2:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '5.2vw',
          height: '5.2vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '7.8vw',
          height: '7.8vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieSmmDescKlient.style.opacity = '0';
        promovanieSmmDescStudia.style.opacity = '0';
        Object.assign(promovaniePr.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovaniePrDescLKient.style.opacity = '0';
        promovaniePrDescStudia.style.opacity = '0';
        Object.assign(promovanieDoskonalenie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '0';
        break;
      case 3:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '6.2vw',
          height: '6.2vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '8.9vw',
          height: '8.9vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '6.5vw',
          height: '6.5vw',
          opacity: '1',
        });
        promovanieSmmDescKlient.style.opacity = '1';
        promovanieSmmDescStudia.style.opacity = '1';
        Object.assign(promovaniePr.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovaniePrDescLKient.style.opacity = '0';
        promovaniePrDescStudia.style.opacity = '0';
        Object.assign(promovanieDoskonalenie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '0';
        break;
      case 4:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '6.2vw',
          height: '6.2vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '9.6vw',
          height: '9.6vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '7.8vw',
          height: '7.8vw',
          opacity: '1',
        });
        promovanieSmmDescKlient.style.opacity = '1';
        promovanieSmmDescStudia.style.opacity = '1';
        Object.assign(promovaniePr.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovaniePrDescLKient.style.opacity = '0';
        promovaniePrDescStudia.style.opacity = '0';
        Object.assign(promovanieDoskonalenie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '0';
        break;
      case 5:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '6.8vw',
          height: '6.8vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '10.9vw',
          height: '10.9vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '8.9vw',
          height: '8.9vw',
          opacity: '1',
        });
        promovanieSmmDescKlient.style.opacity = '1';
        promovanieSmmDescStudia.style.opacity = '1';
        Object.assign(promovaniePr.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovaniePrDescLKient.style.opacity = '0';
        promovaniePrDescStudia.style.opacity = '0';
        Object.assign(promovanieDoskonalenie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '0';
        break;
      case 6:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '7.3vw',
          height: '7.3vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '12.5vw',
          height: '12.5vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '9.9vw',
          height: '9.9vw',
          opacity: '1',
        });
        promovanieSmmDescKlient.style.opacity = '1';
        promovanieSmmDescStudia.style.opacity = '1';
        Object.assign(promovaniePr.style, {
          width: '7.3vw',
          height: '7.3vw',
          opacity: '1',
        });
        promovaniePrDescLKient.style.opacity = '1';
        promovaniePrDescStudia.style.opacity = '1';
        Object.assign(promovanieDoskonalenie.style, {
          width: '0vw',
          height: '0vw',
          opacity: '0',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '0';
        break;
      case 7:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '7.8vw',
          height: '7.8vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '14.1vw',
          height: '14.1vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '12vw',
          height: '12vw',
          opacity: '1',
        });
        promovanieSmmDescKlient.style.opacity = '1';
        promovanieSmmDescStudia.style.opacity = '1';
        Object.assign(promovaniePr.style, {
          width: '9.6vw',
          height: '9.6vw',
          opacity: '1',
        });
        promovaniePrDescLKient.style.opacity = '1';
        promovaniePrDescStudia.style.opacity = '1';
        Object.assign(promovanieDoskonalenie.style, {
          width: '7.5vw',
          height: '7.5vw',
          opacity: '1',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '1';
        break;
      case 8:
        Object.assign(promovanieUruchomienieStrony.style, {
          width: '8.3vw',
          height: '8.3vw',
          opacity: '1',
        });
        promovanieUruchomienieStronyDescSrudia.style.opacity = '1';
        Object.assign(promovanieSeoOptymizacja.style, {
          width: '16.1vw',
          height: '16.1vw',
          opacity: '1',
        });
        promovanieSeoOptymizacjaDescStudia.style.opacity = '1';
        Object.assign(promovanieSmm.style, {
          width: '13.5vw',
          height: '13.5vw',
          opacity: '1',
        });
        promovanieSmmDescKlient.style.opacity = '1';
        promovanieSmmDescStudia.style.opacity = '1';
        Object.assign(promovaniePr.style, {
          width: '10.4vw',
          height: '10.4vw',
          opacity: '1',
        });
        promovaniePrDescLKient.style.opacity = '1';
        promovaniePrDescStudia.style.opacity = '1';
        Object.assign(promovanieDoskonalenie.style, {
          width: '9.1vw',
          height: '9.1vw',
          opacity: '1',
        });
        promovanieDoskonalenieDescStudia.style.opacity = '1';
        break;
      default:
        break;
    }
  }
}

// Устанавливаем калькулятор на положение CLASSICAL LANDING - CLASSICAL
$('.calculations__type[data-type="landing"]').click();


// Функция описывающая возможность закрыть заботу из портфолио при нажатии кнопки назад в браузере
let workCounter = false;
window.addEventListener("popstate", function (e) {
  const portfolioWork = document.querySelector('.portfolio__work');
  workCounter && portfolioWork.classList.remove('show');
  workCounter = portfolioWork.classList.contains('show');
}, false);






























