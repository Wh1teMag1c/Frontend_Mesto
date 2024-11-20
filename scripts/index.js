// Анимация попапов
document.querySelectorAll('.popup').forEach(popup => popup.classList.add('popup_is-animated'));

// Общие функции для работы с попапами
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Закрытие попапов
document.querySelectorAll('.popup__close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        closeModal(closeButton.closest('.popup'));
    });
});

// Профильный попап
const profilePopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileDescInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

profilePopup.querySelector('.popup__button').addEventListener('click', evt => {
    evt.preventDefault();
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescInput.value;
    closeModal(profilePopup);
});

// Попап добавления карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');

cardAddButton.addEventListener('click', () => openModal(cardPopup));

cardPopup.querySelector('.popup__button').addEventListener('click', evt => {
    evt.preventDefault();
    addCardToPage(createCard(cardUrlInput.value, cardNameInput.value));
    closeModal(cardPopup);
    cardUrlInput.value = '';
    cardNameInput.value = '';
});

// Создание карточки
const cardTemplate = document.querySelector("#card-template").content.querySelector('.places__item');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

function createCard(link, name) {
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = link;
    cardImage.alt = `Фотография ${name}`;
    cardTitle.textContent = name;

    card.querySelector('.card__delete-button').addEventListener('click', () => card.remove());
    card.querySelector('.card__like-button').addEventListener('click', evt => {
        evt.target.classList.toggle('card__like-button_is-active');
    });

    cardImage.addEventListener('click', () => {
        imagePopupImage.src = link;
        imagePopupImage.alt = `Фотография ${name}`;
        imagePopupCaption.textContent = name;
        openModal(imagePopup);
    });

    return card;
}

// Добавление карточки на страницу
const placesList = document.querySelector('.places__list');

function addCardToPage(card) {
    placesList.prepend(card);
}

// Добавление карточек из массива
initialCards.forEach(({link, name}) => addCardToPage(createCard(link, name)));
