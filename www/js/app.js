// This file contains event handlers, the center of your application.

function ManageForm()
{
    if((document.getElementById("input_email").value == "") || (document.getElementById("input_room").value == ""))
    {
        alert("nok");
    }
    else 
    {
        alert("ok");
    }
}