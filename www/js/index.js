$(document).ready(function() 
{
    if(localStorage.getItem("connected") === null) window.open("login.html");
    
    //define Article object
    var Article = {
        name : "",
        quantity : ""
    };
    var articles = [];
    
    
    /*************************************MENU CLICK**************************************/
    $("#menu").click(function(event)
    { 
        $("#container").html("");
        
        $.get( "http://foodlidays.dev.innervisiongroup.com/api/v1/food/cat/all/" + localStorage.zip, 
        function( data ) 
        {
            $( "#container" ).append("<table id=\"productlist\" >")
            
            for(var i = 0 ; i<data.length ; i++)
            {
                $( "#productlist" ).append("<tr> <td> <img class=\"image_food\" src=\"http://foodlidays.dev.innervisiongroup.com/uploads/" +data[i].image + "\"></img> </td> <td class=\"to_get\"> <div>" + data[i].name + "</div><div                       class='note'> " + data[i].note + " </div> </td>  <td> "  + data[i].price  + "€ </td> </tr>");
            }
            $( "#container" ).append("</table>");
        },"json").fail(function() 
        {
            alert( "A network error occured, please check your internet connexion or try again later" );
        });
        
        $( "#container" ).click(function( event ) 
        {
            var $row = $(this).closest("tr");
            var $test = $row.find(".to_get").text();
            alert(JSON.stringify($rows));
        });
    });
    
    
    /**********************************PANIER CLICK****************************************/
    $("#panier").click(function(event)
    {
        $("#container").html("");
        
        if(articles.length === 0) $("#container").html("<h2 class=\"any_command\" > Votre panier est vide </h2>");
        else 
        {
            //afficher en liste le panier + bouton commander
            $("#container").html("liste panier + bouton achat");
        }
    });
    
    
    /***********************************PROFIL CLICK***************************************/
    $("#profil").click(function(event)
    {
        $("#container").html("");
        
        $("#container").append("<div class=\"info_profil\"> Identifiant de chambre : " + localStorage.room_number + " </div>");
        $("#container").append("<div class=\"info_profil\"> Votre email : " + localStorage.user_email + " </div> </br>");
        $("#container").append("<div class=\"info_profil\"> Localisation de la chambre : </div>");
        $("#container").append("<div class=\"info_profil\">" + localStorage.street_address + " </div>" );
        $("#container").append("<div class=\"info_profil\">" + localStorage.zip + " " + localStorage.city + " </div>");
        $("#container").append("<div class=\"info_profil\">" + localStorage.floor + "e étage, chambre " + localStorage.room + "</div>");
        $("#container").append("<hr class=\"sep\" />");
        
        // get orders from email user
        $.get( "http://foodlidays.dev.innervisiongroup.com/api/v1/order/" + localStorage.user_email, 
        function( data ) 
        {
            if(data.length >= 1)
            {
                $( "#container" ).append("<div class=\"orders\"> Vos commandes : </div>");
                $( "#container" ).append("<table> <tr> <td> Numéro </td> <td> Passée le </td> <td> Statut </td> </tr> </table>");
                $( "#container" ).append("<table>");
            
                for(var i = 0 ; i<data.length ; i++)
                {
                    $( "#container" ).append("<tr> <td> " + data[i].id + " </td> <td> " + data[i].created_at + " </td> <td> " + data[i].status + " </td> </tr> ");
                }
                $( "#container" ).append("</table>");
            }
            else
            {
                $("#container").append("<div class=\"orders\"> Aucunes commande en cours </div>");
            }
        },
        "json").fail(function() 
        {
            alert( "A network error occured, please check your internet connexion or try again later" );
        });
        
        $("#container").append("<input type=\"button\" id='logout' value=\"Déconnexion\" >");
        
        $("#logout").click(function(event)
        {
            localStorage.clear();
            window.open("login.html");
        });
        
    });
    

    $("#menu").trigger("click");
    
    
    
    
    
    
    
    /** Try for disable back button **/

$(window).on("navigate", function (event, data) {
    alert("nav");
  var direction = data.state.direction;
  if (direction == 'back') {
    alert("back");
  }
  if (direction == 'forward') {
    // do something else
  }
});
    
    
    
    
});