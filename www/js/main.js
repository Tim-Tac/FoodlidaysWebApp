$(document).ready(function() 
{   
    $.get( "http://foodlidays.dev.innervisiongroup.com/api/v1/food/cat/all/" + localStorage.zip, 
    function( data ) 
    {
        $( "#container" ).html( data );
        alert( data.length );
    },"json").fail(function() 
    {
        alert( "A network error occured, please check your internet connexion or try again later" );
    });
    
    
    
    
    /************MENU CLICK****************/
    $("#menu").click(function(event)
    {
        $("#container").html("<h1> test </h1>");
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