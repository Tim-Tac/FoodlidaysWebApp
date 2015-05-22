$(document).ready(function() 
{
    if(localStorage.getItem("connected") === null) window.open("login.html");
    
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
        $("body").css("background-image", "url(../images/home_slide1.png)");
        
        $.get( "http://foodlidays.dev.innervisiongroup.com/api/v1/food/cat/all/" + localStorage.zip, 
        function( data ) 
        {
            $( "#container" ).append("<table id='productlist'>")
            
            for(var i = 0 ; i<data.length ; i++)
            {
                $( "#productlist" ).append("<tr> <td> <img class=\"image_food\" src=\"http://foodlidays.dev.innervisiongroup.com/uploads/" +data[i].image + "\"></img> </td> <td>" + data[i].name + "</td> <td class='note'> " + data[i].note + " </td>  <td> "  + data[i].price  + "€ </td> </tr>");
                
            }
        },"json").fail(function() 
        {
            alert( "A network error occured, please check your internet connexion or try again later" );
        });
        
        $( "#container" ).append("</table>");
    });
    
    
    
    /**********************************PANIER CLICK****************************************/
    $("#panier").click(function(event)
    {
        $("#container").html("");
        $("body").css("background-image", "url(../images/home_slide1.png)");
        
        if(articles.length === 0) $("#container").html("<h3 class=\"any_command\" > <i> Votre panier est vide </i> </h3>");
        else 
        {
            $("#container").html("liste panier + bouton achat");
        }
    });
    
    
    
    /***********************************PROFIL CLICK***************************************/
    $("#profil").click(function(event)
    {
        $("#container").html("");
        $("body").css("background-image", "url(../images/home_slide3.png)");
        
        $("#container").append("<div class=\"info_profil\"> Identifiant de chambre : " + localStorage.room_number + " </div>");
        $("#container").append("<div class=\"info_profil\"> Votre email : " + localStorage.user_email + " </div> </br>");
        $("#container").append("<div class=\"info_profil\"> Localisation de la chambre : </div>");
        $("#container").append("<div class=\"info_profil\">" + localStorage.street_address + " </div>" );
        $("#container").append("<div class=\"info_profil\">" + localStorage.zip + " " + localStorage.city + " </div>");
        $("#container").append("<div class=\"info_profil\">" + localStorage.floor + "e étage, chambre " + localStorage.room + "</div>");
        $("#container").append("<input type=\"button\" class=\"logout\" id=\"logout\" value=\"Déconnexion\" >");
    });
    
    $("#logout").click(function(event)
    {
        alert("ok");
    });

    
    
});