var ResetAll=function(){
    $("#Name").val("");
    $("#Email").val("");
    $("#ContactNo").val("");
    $("#Designation").val("");
    $("#ClientId").val("").trigger("chosen:updated");
    $("#IsActive").prop("checked", false);

}


var LoadClients = function ()
{
    $.post("../ContactsDir/LoadClients",
        function (data) {
            if (data != "error") {
                var LC = JSON.parse(data);
                var $el = $("#ClientId");
                $el.empty();
                $el.append('<option value="">' + "Select" + '</option>');
                $.each(LC, function (idx, obj) {
                    $el.append('<option value="' + obj.ID + '">' + obj.Name + '</option>');
                });
            }
            else {
                $el.append('<option value="">' + "Select" + '</option>');
                alert("Error");
            }
            $el.trigger("Liszt:updated");
            $el.chosen();

        });


}

$("#btnContact").click(function () {
    $.post("../ContactsDir/ContactAdd",
            $(".formContact").serialize(),
            function (data)
            {
                if (data != "error")
                {
                    ResetAll();
                    alert("Contact Added !");
                    }
                else {
                    alert("Error while Adding");
                     }
            });
});


$(document).ready(function ()
{
    LoadClients();

});