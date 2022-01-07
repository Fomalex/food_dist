function slider({container, slide, nextArrow, previousArrow, totalCounter, currentCounter, wrapper, field}) {
    //создаём слайдер:

    //мой вариант создания слайдера
    // const current = document.querySelector('#current'),
    //     total = document.querySelector('#total'),
    //     slides = document.querySelectorAll('.offer__slide'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next');
    // let i = 1;
    //
    //
    // function addZero(element, num) {
    //     if (num < 10) {
    //         element.textContent = `0${num}`;
    //     } else {
    //         element.textContent = `${num}`;
    //     }
    // }
    //
    // function hideSlides() {
    //     slides.forEach(slide => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('show','fade');
    //     })
    // }
    //
    // function showSlide() {
    //     slides[i - 1].classList.add('show','fade');
    //     slides[i - 1].classList.remove('hide');
    // }
    //
    // addZero(total, slides.length);
    // hideSlides();
    // showSlide();
    // current.textContent = `0${i}`;
    //
    // prev.addEventListener('click', () => {
    //     hideSlides();
    //     i--;
    //     if (i === 0) {
    //         i = slides.length;
    //     }
    //     addZero(current, i);
    //     showSlide();
    // });
    //
    // next.addEventListener('click', () => {
    //     hideSlides();
    //     i++;
    //     if (i > slides.length) {
    //         i = 1;
    //     }
    //     addZero(current, i);
    //     showSlide();
    // })

    //вариант с курса (простой):
    // const slides = document.querySelectorAll('.offer__slide'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current');
    //
    // let slideIndex = 1;
    //
    // showSlides(slideIndex);
    //
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }
    //
    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    //
    //     slides.forEach(slide => {
    //         slide.classList.add('hide')
    //         slide.classList.remove('show', 'fade')
    //     })
    //
    //     slides[slideIndex - 1].classList.add('show', 'fade');
    //     slides[slideIndex - 1].classList.remove('hide');
    //
    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }
    //
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }
    //
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    //
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    //Сложный вариант слайдера:
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(previousArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    function addZero(element, num) {
        if (num < 10) {
            element.textContent = `0${num}`;
        } else {
            element.textContent = `${num}`;
        }
    }

    addZero(total, slides.length);
    addZero(current, slideIndex);

    slidesField.style.width = 100 * slides.length + '%'; //чтобы все слайды помещались во внутрь поля
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    //создаём точки для слайдера
    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i === 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return Math.round(+str.replace(/\D/g, ''));
    }

    function changeDotOpacity(dots) {
        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero(current, slideIndex);

        changeDotOpacity(dots);
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        console.log(deleteNotDigits(width));
        console.log(slides.length);
        console.log(offset);

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero(current, slideIndex);

        changeDotOpacity(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            changeDotOpacity(dots);

            addZero(current, slideIndex);
        });
    });
}

export default slider;