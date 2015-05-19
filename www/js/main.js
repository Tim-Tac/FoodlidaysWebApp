$(document).ready(function() 
{
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
        $("#container").html("panier");
    });
    
    /************PROFIL CLICK****************/
    $("#profil").click(function(event)
    {
        $("#container").html("profil");
    });
    
});