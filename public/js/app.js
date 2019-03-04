$(function () {

    const render = function (dataList) {
        $('#kudos').empty();
        for (let i = 0; i < dataList.length; i++) {
            $('#kudos').append(`<div class ="card"> <h4>Kudos from: ${dataList[i].fromUser}</h4> <h4>Sent to: ${dataList[i].toUser}</h4><br><h5>${dataList[i].title}</h5><p>${dataList[i].body}</p>`)
        }
    }

    const getKudos = function () {
        $.get(`/api/kudos`)
            .then(function (data) {
                console.log(data);
                render(data);
            })
    }

    const renderUsers = function (userList) {
        for (let i = 0; i < userList.length; i++) {
            $('#kudo-from').append(`<option value = "${userList[i]._id}"> ${userList[i].username}</option>`);
            $('#kudo-to').append(`<option value = "${userList[i]._id}"> ${userList[i].username}</option>`);
        }
    }


    const getUsers = function () {
        $.get('/api/user').then(function (data) {
            console.log(data);
            renderUsers(data);
        });
    }

    const createKudo = function (e) {
        e.preventDefault();
        console.log("hello");
        const userId = $('#kudo-to').val();
        const kudoTitle = $('#kudo-title').val().trim();
        const kudoBody = $('#kudo-body').val().trim();
        const toUser = $("select#kudo-to option:checked").text();
        const fromUser = $("select#kudo-from option:checked").text();

        $.post(`/api/kudo`, { title: kudoTitle, body: kudoBody, userId: userId, toUser: toUser, fromUser: fromUser }, getKudos());
        $('#kudo-title').val('')
        $('#kudo-body').val('')
        $('#kudoModal').modal('hide');
    }
    $('.btn-primary').on('click', createKudo);

    getUsers();
    getKudos()
});