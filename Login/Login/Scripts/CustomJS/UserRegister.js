var ResetAll = function () {

    $("#Name").val("");
    $("#Email").val("");
    $("#Password").val("");
    $("#City").val("");
    $('#RoleId').val("").trigger("chosen:updated");
    $("#IsActive").prop("checked", false);

}

var LoadRoles = function () {
    $.ajax({
        type: "POST",
        cache: false,
        url: "../Login/LoadRoles",
        processData: false,
        contentType: false,
        success: function (data) {

            var sch = JSON.parse(data);
            var $el = $("#RoleId");
            $el.empty();
            if (sch.length > 0) {
                $el.append('<option value="">' + "Select" + '</option>');
                $.each(sch, function (idx, obj) {

                    $el.append('<option value="' + obj.ID + '">' + obj.Name + '</option>');

                });
            }
            else {
                $el.append('<option value="">' + "Select" + '</option>');

            }

            $el.trigger("liszt:updated");


            $el.chosen();

        },
        error: function (data) {
            console.log(data.d);
        }
    });
}





$(document).ready(function () {
    LoadRoles();
});






$("#btnSubmit").click(function () {


    $.post("../Login/RegisterUser",
               $(".formRegister").serialize(),
               function (value) {
                   if (value != 'error') {
                       //swal(
                       //  'Success',
                       //  'Fabric Saved Successfully!',
                       //  'success'
                       //)
                       var person = value.Name;
                       alert("Success! Register", person);
                       ResetAll();

                       console.log(value);

                   }
                   else {
                       //swal("Error", "Data Not Saved. Please Refresh & Try Again", "error")
                       //$('#btn-save').removeAttr('disabled');
                       alert("Error");
                   }

               });


});

$("#btnLogin").click(function () {


    $.post("../Login/LoginUser",
               $(".formLogin").serialize(),
               function (value) {
                   if (value != 'error' && value != "Warning! User is UnActivated..") {
                       //swal(
                       //  'Success',
                       //  'Fabric Saved Successfully!',
                       //  'success'
                       //)


                       ResetAll();

                       console.log(value);
                       var url = '../Login/Index';
                       window.location.href = url;

                   }
                   else if (value == "Warning! User is UnActivated..")
                   {
                       alert(value);
                   }
                   else {
                       //swal("Error", "Data Not Saved. Please Refresh & Try Again", "error")
                       //$('#btn-save').removeAttr('disabled');
                       alert("Error");
                   }

               });


});

$('#btnLogin').keypress(function (e) {
    if (e.which == 13) {
        $.post("../Login/LoginUser",
               $(".formLogin").serialize(),
               function (value) {
                   if (value != 'error') {
                       ResetAll();
                       var url = '../Login/Index';
                       window.location.href = url;
                   }
                   else {
                       alert("Error");
                   }
               });
    }
});

