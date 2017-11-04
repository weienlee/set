// source: http://codyhouse.co/gem/loginsignup-modal-window/

jQuery(document).ready(function($){
    var $form_modal = $('.cd-user-modal'),
    $login_modal = $('#login_modal'),
    $form_login = $form_modal.find('#cd-login'),
    $form_signup = $form_modal.find('#cd-signup'),
    $form_forgot_password = $form_modal.find('#cd-reset-password'),
    $form_modal_tab = $('.cd-switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('div'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('div'),
    $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
    $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
    $main_nav = $('.nav_sign');

    //open modal
    $main_nav.on('click', function(event){

  if( $(event.target).is($main_nav) ) {
      // on mobile open the submenu
            $('#error_container').hide();
      $(this).children('ul').toggleClass('is-visible');
  } else {
            $('#error_container').hide();
      // on mobile close submenu
      $main_nav.children('ul').removeClass('is-visible');
      //show modal layer
      $login_modal.addClass('is-visible');
      //show the selected form
      ( $(event.target).is('.signup') ) ? signup_selected() : login_selected();
      setTimeout(()=>{$(".cd-form input:text:first").focus()}, 100);
  }

    });

    //close modal
    $('.cd-user-modal').on('click', function(event){
  if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
      $form_modal.removeClass('is-visible');
  }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
      if(event.which=='27'){
          $form_modal.removeClass('is-visible');
  }
    });

    //switch from a tab to another
    $form_modal_tab.on('click', function(event) {
      $('#error_container').hide();
      event.preventDefault();
      ($(event.target).is($tab_login)) ? login_selected() : signup_selected();
      $("input:text:visible:first").focus();
    });

    function login_selected(){
  $form_login.addClass('is-selected');
  $form_signup.removeClass('is-selected');
  $form_forgot_password.removeClass('is-selected');
  $tab_login.addClass('selected');
  $tab_signup.removeClass('selected');
    }

    function signup_selected(){
  $form_login.removeClass('is-selected');
  $form_signup.addClass('is-selected');
  $form_forgot_password.removeClass('is-selected');
  $tab_login.removeClass('selected');
  $tab_signup.addClass('selected');
    }
});

