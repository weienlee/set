// Attach submit listeners on document load
$(function() {
    function error(jqxhr) {
        try {
            var response = $.parseJSON(jqxhr.responseText);
            $('#error_container').find('span').text(response.err);
            $('#error_container').slideDown();
        } catch(err) { }
    }

    $('#error_close').on('click', function(){
        $('#error_container').slideUp();
    });

    // Signup form
    $('#signup_button').on('click', function(e) {
        // reset errors
        $('.has-error').removeClass('has-error');

        var signupData = [];
        signupData.push({name:"username", value:$('#signup-username').val()});
        signupData.push({name:"password", value:$('#signup-password').val()});

        // check for matching passwords
        if ($('#signup-password').val() != $('#signup-confirm').val()){
            $('#signup-password').addClass('has-error')
            $('#signup-confirm').addClass('has-error')
            $('#error_container').find('span').text("Passwords must match.");
            $('#error_container').slideDown();
            return false;
        }

        $.ajax({
            url: '/users',
            type: "POST",
            data: signupData,
            dataType: "json",
            success: function(response) {
                window.location.replace('/');
            },
            error: error
        });
        e.preventDefault();
    });

    // Login form
    $('#login_button').on('click', function(e){
        var loginData = [];
        loginData.push({name:"username", value:$('#login-username').val()});
        loginData.push({name:"password", value:$('#login-password').val()});
        $.ajax({
            url: '/login',
            type: "POST",
            data: loginData,
            dataType: "json",
            success: function(response) {
                window.location.replace('/');
            },
            error: error
        });
        e.preventDefault();
    });

    // logout
    $('.logout').on('click', function(e) {
        $.ajax({
            url: '/logout',
            type: "POST",
            success: function(response) {
                window.location.replace('/');
            }
        });
    });
});
