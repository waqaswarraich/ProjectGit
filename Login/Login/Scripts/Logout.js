$("#btnLogout").click(function () {


    $.post("../Login/Logout",
               function () {
                       var url = '../Login/Register';
                       window.location.href = url;
               });


});
