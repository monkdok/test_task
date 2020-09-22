$(document).ready(function(){

// User create Django Ajax Call
$("#add-user-form").on('submit', function(e) {
    e.preventDefault()
    let username = $('#add-username').val()
    let password1 = $('input#id_password1').val()
    let password2 = $('input#id_password2').val()
    let group = $('#add-groups').val()
    let url = $(this).attr('action')
    let csrf_token = $("[name=csrfmiddlewaretoken]").val()
    let groups = $('#groups').val(group)
    $.ajax({
        url: url,
        data: {
        username: username,
        password1: password1,
        password2: password2,
        groups: groups.val(),
        csrfmiddlewaretoken: csrf_token
        },
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.form_is_valid) {
                appendToHtml(data.html)
                $('form#add-user-form').trigger('reset')
                $('#add-user').modal('hide')
            }
            else {
                alert("All fields must have a valid value.")
            }
        }
    })
})


// Update User
$(document).on('click', '#edit-btn', function(e){
    e.preventDefault()
    let username = $(this).attr('data-username')
    let url = $(this).attr('data-url')
    // Passing initial form fields data
    $('input#id_username').val(username)
    $('form#edit-user-form').on('submit', function(e) {
        e.preventDefault()
        // forming ajax request
        let num = $('.' + username + '> th').text().trim()
        let new_username = $('#id_username').val()
        let group = $('#id_groups').val()
        let groups = $('#update-groups').val(group)
        let csrf_token = $("[name=csrfmiddlewaretoken]").val()
        console.log('old_username: ' + username)
        console.log('new_username: ' + new_username)
        $.ajax({
            url: url,
            data: {
                num: num,
                username: new_username,
                old_username: username,
                groups: groups.val(),
                csrfmiddlewaretoken: csrf_token
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.form_is_valid) {
                    $('.' + username).replaceWith(data.html)
                    $('form#edit-user-form').trigger('reset')
                    $('#edit-user').modal('hide')

                }
                else {
                    alert("All fields must have a valid value.")

                }
            }
        });
    })

})

// Delete User
$(document).on('click', '#delete-btn', function(e) {
    e.preventDefault()
    let username = $(this).attr('data-username')
    let url = $(this).attr('data-url')
    let csrf_token = $("[name=csrfmiddlewaretoken]").val()

    $('form#delete-user-form').one('submit', function(e) {
        e.preventDefault()
        console.log('submit')
        $.ajax({
            url: url,
            data: {
                csrfmiddlewaretoken: csrf_token,
                username: username,
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                console.log('returned')
                if (data.deleted) {
                    console.log('deleted')
                    $('#users-table').replaceWith(data.html)
                    $('#delete-user').modal('hide')
                }
            }
        })
    })
})


// Create Group
$("#add-group-form").on('submit', function(e) {
    e.preventDefault()
    let name = $('#id_name').val()
    let description = $('#id_description').val()
    let url = $(this).attr('action')
    let csrf_token = $("[name=csrfmiddlewaretoken]").val()
    $.ajax({
        url: url,
        data: {
        name: name,
        description: description,
        csrfmiddlewaretoken: csrf_token
        },
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.form_is_valid) {
                appendToHtml(data.html)
                $('form#add-group-form').trigger('reset')
                $('#add-group').modal('hide')

            }
            else {
                alert("All fields must have a valid value.")
            }
        }
    })
})


// Update Group
$(document).on('click', '#group-edit-btn', function(e){
    e.preventDefault()
    let name = $(this).attr('data-name')
    let url = $(this).attr('data-url')
    console.log(name)
    console.log(url)
    let description = $(this).attr('data-description')
    console.log(description)
    // Passing initial form fields data
    $('input#edit_name').val(name)
    $('textarea#edit_description').val(description)
    $('form#edit-group-form').on('submit', function(e) {
        e.preventDefault()
        // forming ajax request
        let new_name = $('input#edit_name').val()
        let description = $('textarea#edit_description').val()
        let csrf_token = $("[name=csrfmiddlewaretoken]").val()
        console.log(description)
        $.ajax({
            url: url,
            data: {
                name: new_name,
                old_name: name,
                description: description,
                csrfmiddlewaretoken: csrf_token,
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.form_is_valid) {
                    $('.' + name).replaceWith(data.html)
                    $('form#edit-group-form').trigger('reset')
                    $('#edit-group').modal('hide')

                }
                else {
                    alert("All fields must have a valid value.")

                }
            }
        });
    })

})


// Delete Group
$(document).on('click', '#delete-btn', function(e) {
    e.preventDefault()
    let id = $(this).attr('data-group-id')
    let name = $(this).attr('data-name')
    let url = $(this).attr('data-url')
    let csrf_token = $("[name=csrfmiddlewaretoken]").val()

    $('form#delete-group-form').one('submit', function(e) {
        e.preventDefault()
        console.log('submit')
        $.ajax({
            url: url,
            data: {
                csrfmiddlewaretoken: csrf_token,
                id: id,
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                console.log('returned')
                if (data.deleted) {
                    console.log('deleted')
                    $('.' + name).remove()
                    $('#delete-group').modal('hide')
                }
            }
        })
    })
})


function appendToHtml(data) {
    $('#table').append(data)
//    $("body").html(data.html)
//    $('.dropdown-toggle').dropdown()
//    $('body').removeClass('modal-open')

}

})