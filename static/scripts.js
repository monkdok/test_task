$(document).ready(function(){




// User create Django Ajax Call
$("#add-user-form").on('submit', function(e) {
    e.preventDefault()
    let username = $('#id_username').val()
    let password1 = $('input#id_password1').val()
    let password2 = $('input#id_password2').val()
    let group = $('#id_groups').val()
    console.log('group: ' + group)
    let url = $(this).attr('action')
    let csrf_token = $("[name=csrfmiddlewaretoken]").val()
    let groups = $('#groups').val(group)
    console.log(
    'username: ' + username,
    'password1: ' + password1,
    'password2: ' + password2,
    'groups: ' + groups,
    'url: ' + url,
    'csrf_token: ' + csrf_token,
    )
    $.ajax({
        url: url,
        // data: form.serialize(),
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
                console.log(data.html)
            }
            else {
                alert("All fields must have a valid value.")
            }
        }
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