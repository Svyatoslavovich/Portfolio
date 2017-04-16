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
        $('#add-new-item').on('click', _showModal) // открыть модальное окно
    };

    var _showModal = function (event) {
        console.log("Вызов модального окна");
        event.preventDefault();
        $('add-project-popup').bPopup();
    };

    // Возвращает функцию
    return {
        init: initinside
    }
})();

// Обращаемся к обьекту, в которой лежит наша функция (метод);
myModule.init();

