function checkNetConnection()
{
     jQuery.ajaxSetup({async:false});
     re="";
     r=Math.round(Math.random() * 10000);
     $.get("http://demos.subinsb.com/cdn/dot.png",{subins:r},function(d){
      re=true;
     }).error(function(){
      re=false;
     });
     return re;
}

$(document).ready(function()
{
    $("#qr").click(function(event)
    {
       alert("qr");
    });
    
    
    
    /*POST request to try to connect the user*/
    $("#valid").click(function(event)
    {
        var formOK = (document.getElementById('input_email').value !== "") && (document.getElementById('input_room').value !== "");
        if(formOK)
        {
            if(checkNetConnection)
            {
                    $.post(
                        "http://foodlidays.dev.innervisiongroup.com/api/v1/login",
                        {  email : document.getElementById("input_email").value, //a remplacer par les valeurs des champs
                            room_number : document.getElementById("input_room").value },
                        function(data, status)
                        {
                            localStorage.connected = "true";
                            localStorage.user_email = data.email;
                            localStorage.place_type = data.place_type;
                            localStorage.id = data.room.id;
                            localStorage.user_id = data.room.user_id;
                            localStorage.street_address = data.room.street_address;
                            localStorage.city = data.room.city;
                            localStorage.country = data.room.country;
                            localStorage.zip = data.room.zip;
                            localStorage.room_number = data.room.room_number;
                            
                            if(data.place_type == "place")
                            {
                                localStorage.name_place = data.room.name;
                            }
                            else if(data.place_type == "room")
                            {
                                localStorage.floor = data.room.floor;
                                localStorage.room = data.room.room;
                            }
                            
                            window.open("main.html");
                        },
                        "json"
                        ).fail(function() 
                        {
                            alert( "A network error occured, please check your internet connexion or try again later" );
                        });
            }
            else alert("Internet connexion is required");
        }
        else alert("Both fields are required");
    });   
});





/** Try for disable back button **/

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
