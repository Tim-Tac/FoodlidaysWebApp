$(document).ready(function() 
{
    //when launched, we load menu by default
    var just_launched = 1;
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
    
    
    
    /************MENU CLICK****************/
    $("#menu").click(function(event)
    {
        if(just_launched == 1) return;
        $("#container").html("");
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
    });
    
    
    
    /************PANIER CLICK****************/
    $("#panier").click(function(event)
    {
        just_launched = 0;
        $("#container").html("panier");
    });
    
    
    
    /************PROFIL CLICK****************/
    $("#profil").click(function(event)
    {
        just_launched = 0;
        $("#container").html("profil");
    });
    
});