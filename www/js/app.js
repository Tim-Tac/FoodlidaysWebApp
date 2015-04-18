// This file contains event handlers, the center of your application.

function ManageForm()
{
    if((document.getElementById("input_email").value == "") || (document.getElementById("input_room").value == ""))
    {
        alert("nok");
    }
    else alert("ok");
}


function post(room_number, params, method) 
{
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("room_number", method);
    form.setAttribute("email", path);

    for(var key in params) 
    {
        if(params.hasOwnProperty(key)) 
        {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}