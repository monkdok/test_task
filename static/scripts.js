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


function appendToHtml(data) {
    $('#users-table').append(data)
//    $("body").html(data.html)
//    $('.dropdown-toggle').dropdown()
    $('body').removeClass('modal-open')
    $('#add-user').modal('hide')

}

})