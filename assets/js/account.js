import "./../sass/account.scss";
import "jquery-validation";
export default class Account {
  static SearchExpand() {
    $(".btn-search").on("click", function() {
      if (!$(".search").hasClass(".search-open")) {
        $(".search").addClass("search-open");
      }
    });
  }
  static accountLogin() {
    $(".login-form").validate({
      errorPlacement: function(error, element) {
        $(element)
          .parents(".form-group")
          .find(".error")
          .show()
      },
      highlight: function(element, errorClass, validClass) {
        $(element)
          .parents(".form-group")
          .addClass("has-error");
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element)
          .parents(".form-group")
          .removeClass("has-error");
      },
      rules: {
        username: {
          required: true
        },
        password: {
          required: true
        }
      },
      messages: {
        username: {
          required: "Required Field"
        },
        password: {
          required: "Required Field"
        }
      },
      submitHandler: function(form,event) {
        event.preventDefault();    
        var formdata = $(form).serialize();  
        $.ajax({
            type: 'GET',
            url: '/login.json',
            data: formdata,
            success: function(result) {                   
                if(result.status === 200) {
                    alert('Login Successful');
                }
            },
        });
        return false;
    },
    });
  }
}

$(document).ready(function() {
  Account.SearchExpand();
  Account.accountLogin();
});
