$(document).ready(function() 
{
    alert("test");
    var temp = localStorage.street_address;
    alert(temp);
    
    /************MENU CLICK****************/
    $("#menu").click(function(event)
    {
        $("#container").html("menu");
    });
    
    /************PANIER CLICK****************/
    $("#panier").click(function(event)
    {
        alert("panier");
        $("#container").css('background-image', 'url(../images/home_slide1.png)');
        $("#container").html("panier");
    });
    
    /************PROFIL CLICK****************/
    $("#profil").click(function(event)
    {
        alert("profil");
        $("#container").html("profil");
    });
    
});