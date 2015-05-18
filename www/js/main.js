$(document).ready(function() 
{
    /************MENU CLICK****************/
    $("#menu").click(function(event)
    {
        alert("menu");
    });
    
    /************PANIER CLICK****************/
    $("#panier").click(function(event)
    {
        alert("panier");
        $("#container").css('background-image', 'url(../images/home_slide1.png)');
        $("#container").html("hello");
    });
    
    /************PROFIL CLICK****************/
    $("#profil").click(function(event)
    {
        alert("profil");
        $("#container").css('background-color', 'red');
    });
    
});