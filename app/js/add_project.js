/**
 * Created by sviatoslav on 14.04.17.
 */
// self-invoking function
var myModule = (function () {

    var initinside = function () {
        _setUpListeners();
    };

    var _setUpListeners = function () {
        // Прослушка событий
        $('#add-new-item').on('click', _showModal); // Поведение модального окна
        $('#add-new-project').on('submit', _addProject); // Валидация формы
    };


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
                form.find('.error-mes').text('').hide();
            }
        });
    };

    var _addProject = function (event) {
        // console.log("Добавление проекта");
        event.preventDefault();
        // Обьявляем переменные
        var form = $(this),
            url = 'add_project.php';
            data = form.serialize();

        // console.log(data);

        // Запрос на сервер
        $.ajax({
            url : url,
            type: 'POST',
            dataType: 'json',
            data: data
        })
            .done(function (answer) {
                console.log(answer);
                if(answer.status === 'success') {
                    console.log(answer.text);
                    form.find('.success-mes').text(answer.text).show();
                } else {
                    console.log(answer.text);
                    form.find('.error-mes').text(answer.text).show();
                }
            })
            .fail(function (answer) {
                form.find('.error-mes').text("ERROR! Couldn't connect to the server!");
                console.log("ERROR! Couldn't connect to the server!");

            })
    };

    var _ajaxForm = function () {
        // 1. Проверка формы
        // 2, Сбор данных из формы
        // 3. Отправка данных на сервер
    }

    // Возвращает функцию
    return {
        init: initinside
    }
})();

// Обращаемся к обьекту, в которой лежит наша функция (метод);
myModule.init();

