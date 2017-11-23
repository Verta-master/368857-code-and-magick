'use strict';

var userDialog = document.querySelector('.setup');
var wizardList = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
];

// Нахождение случайного целого из диапазона
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Заполнение массива данных
function createWizard(wizard) {
  wizard.name = WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length)];
  wizard.coatColor = COAT_COLORS[getRandomInt(0, COAT_COLORS.length)];
  wizard.eyesColor = EYES_COLORS[getRandomInt(0, EYES_COLORS.length)];
}

for (var i = 0; i < wizards.length; i++) {
  createWizard(wizards[i]);
}

// Отрисовка шаблона
userDialog.classList.remove('hidden');
wizardList.classList.remove('hidden');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style = 'fill: ' + wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style = 'fill: ' + wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
