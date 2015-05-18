$(document).ready(function() 
{
    /*POST request to try to connect the user*/
    $("#valid").click(function(event)
    {
        var formOK = (document.getElementById('input_email').value != "") && (document.getElementById('input_room').value != "")
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

$(window).on("navigate", function (event, data) {
  var direction = data.state.direction;
  if (direction == 'back') {
    alert("back");
  }
  if (direction == 'forward') {
    // do something else
  }
});

$(document).live("pagebeforechange", function(e,ob) {
    if(ob.toPage && (typeof ob.toPage==="string") && ob.toPage.indexOf('index.html') >= 0) {
        console.log("blocking the back");
        e.preventDefault();
    }
});
