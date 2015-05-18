$(document).ready(function() 
{
    $("#valid").click(function(event)
    {
        //var formOK = (document.getElementById('input_email').value != "") && (document.getElementById('input_room').value != "")
        var formOK = true;
        if(formOK)
        {
                $.post(
                        "http://foodlidays.dev.innervisiongroup.com/api/v1/login",
                        {  email : "titidep001@hotmail.com", //a remplacer par les valeurs des champs
                            room_number : "50NG13HS" },
                        function(data) 
                        {     
                            //$('#res').html(data); to change text in html page
                            alert(data.room.street_address);
                            window.open("main.html");
                        },
                        "json"
                    );
        }
        else alert("Both fields are required");
    });
});