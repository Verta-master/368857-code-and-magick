'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NUMBER = 4;

var wizards = [];
var fragment = document.createDocumentFragment();
var userDialog = document.querySelector('.setup');
var wizardList = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Нахождение случайного целого из диапазона, не включая max значение
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Заполнение массива данных
function createWizard() {
  return {
    name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInt(0, EYES_COLORS.length)]
  };
}

for (var i = 0; i < WIZARD_NUMBER; i++) {
  wizards.push(createWizard());
}

// Отрисовка шаблона
userDialog.classList.remove('hidden');
wizardList.classList.remove('hidden');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style = 'fill: ' + wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style = 'fill: ' + wizard.eyesColor;
  fragment.appendChild(wizardElement);
};

wizards.forEach(renderWizard);
similarListElement.appendChild(fragment);
