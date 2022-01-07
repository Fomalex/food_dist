function showModalWindow(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModalWindow(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = 'initial';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    //modal window:

    const modal = document.querySelector(modalSelector),
        btnsModal = document.querySelectorAll(triggerSelector);

    btnsModal.forEach(btn => {
        btn.addEventListener('click', () => showModalWindow(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-close') === '' || e.target === modal) {
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModalWindow(modalSelector, modalTimerId);
            console.log(window.pageYOffset);
            console.log(document.documentElement.clientHeight);
            console.log(document.documentElement.scrollHeight);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModalWindow};
export {showModalWindow};