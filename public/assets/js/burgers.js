$(function () {
    $('.change-status').on('click', function (event) {
        const id = $(this).data('id');

        const burgerStatus = {
            devoured: true
        };

        console.log(burgerStatus);

        // This sets up an ajax call
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: burgerStatus
        }).then(
            function () {
                location.reload();
            }
        )
    })

    $('.newBurgerForm').on('submit', function (event) {
        event.preventDefault();

        $('.burgersContainer').show();

        const madeBurger = {
            burger_name: $('#madeBurgerName').val().trim(),
            devoured: 0
        }

        console.log(madeBurger);

        // This sets up another ajax call
        $.ajax('/api/burgers/', {
            type: 'POST',
            data: madeBurger
        }).then(
            function () {
                location.reload();
            }
        )
    })
});