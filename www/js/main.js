$(document).ready(function() 
{
    //define Article object
    var Article = {
        name : "",
        quantity : ""
    };
    var articles = [];
    

    $("#menu").click();
    
    
    /*************************************MENU CLICK**************************************/
    $("#menu").click(function(event)
    {   
        $("#container").html("");
        $.get( "http://foodlidays.dev.innervisiongroup.com/api/v1/food/cat/all/" + localStorage.zip, 
        function( data ) 
        {
            
            for(var i = 0 ; i<data.length ; i++)
            {
                $( "#container" ).append("<tr> <td>  <img class=\"image_food\" src=\"http://foodlidays.dev.innervisiongroup.com/uploads/" +data[i].image + "\"></img> </td> <td>" + data[i].name + "</td> <td> " + data[i].note + " </td> <td> price </td> </tr>");
            }
        },"json").fail(function() 
        {
            alert( "A network error occured, please check your internet connexion or try again later" );
        });
    });
    
    
    
    /**********************************PANIER CLICK****************************************/
    $("#panier").click(function(event)
    {
        if(articles.length === 0) $("#container").html("panier");
        else alert("nok");
    });
    
    
    
    /***********************************PROFIL CLICK***************************************/
    $("#profil").click(function(event)
    {
        $("#container").html("profil");
    });
    
    
});