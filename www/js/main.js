$(document).ready(function() 
{   
    $.get( "http://foodlidays.dev.innervisiongroup.com/api/v1/food/cat/all/" + localStorage.zip, 
    function( data ) 
    {
        for(var i = 0 ; i<data.length ; i++)
        {
            $( "#container" ).append("<table> <tr> <td>" +  data[i].name + "</td> <td>" + data[i].price + "</td> </tr> </table>");
        }
    },"json").fail(function() 
    {
        alert( "A network error occured, please check your internet connexion or try again later" );
    });
    
    $('#menu').click();
    
    
    
    
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