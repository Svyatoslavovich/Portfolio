/**
 * Created by sviatoslav on 14.04.17.
 */
// self-invoking function
var myModule = (function () {

    // Инициализирует наш модуль
    var initinside = function () {
        _setUpListeners();
    };

    // Прослушивает события
    var _setUpListeners = function () {
        // Прослушка событий
        $('#add-new-item').on('click', _showModal); // Поведение модального окна
        $('#add-new-project').on('submit', _addProject); // Валидация формы
    };

    // Работает с модальным окном
    var _showModal = function (event) {
        console.log("Вызов модального окна");
        event.preventDefault();

        var divPopup = $('#add-project-popup'),
            form = divPopup.find('.modal-form');

        divPopup.bPopup({
            speed: 450,
            transition: 'slideIn',
            transitionClose: 'slideBack',
            onClose: function () {
                console.log("Вы закрыли модальное окно");
                form.find('.server-mes').text('').hide();
            }
        });
    };

    // Добавляет проект
    var _addProject = function (event) {
        // console.log("Добавление проекта");
        event.preventDefault();
        // Обьявляем переменные
        var form = $(this),
            url = 'add_project.php',
            serverGiveMeAnAnswer = _ajaxForm(form, url);

        console.log(data);

        serverGiveMeAnAnswer.done(function (answer) {
            var successBox = form.find('.success-mes'),
                errorBox = form.find('.error-mes');
            if (answer.status === 'success') {
                successBox.text(answer.text).show();
                errorBox.text('').hide();
            } else {
                errorBox.text(answer.text).show();
                successBox.text(answer.text).show();
            }
        })
    };

    // Универсальная функция
    // Для ее работы используются:
    // "form" - форма
    // "url" - адрес php файла
    // 1. Собирает данные из формы
    // 2. Проверяет форму
    // 3. Делает запрос на сервер, и возвращает ответ
    var _ajaxForm = function (form, url) {

        // if (!valid) return false;

        data = form.serialize();

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data
        }).fail(function (ans) {
            console.log("Проблемы в PHP");
            form.find('error-mes').text('На сервере произошла ошибка!').show();
        });

        return result;

    };

    // Возвращает объект (публичные методы)
    return {
        init: initinside
    }
})();

// Обращаемся к обьекту, в котором лежит наша функция (метод);
myModule.init();

