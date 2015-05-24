$(document).ready(function() 
{
    if(localStorage.getItem("connected") === null) window.open("login.html"); //si pas co redirection vers login
    
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
        function(data) 
        {
            $( "#container" ).append("<table id=\"productlist\" >");
            
            for(var i = 0 ; i<data.length ; i++)
            {
                $( "#productlist" ).append("<tr id="+data[i].id+" > <td> <img class=\"image_food\" src=\"http://foodlidays.dev.innervisiongroup.com/uploads/" +data[i].image + "\"></img> </td> <td class=\"to_get\">                      <div>" + data[i].name + "</div><div class='note'> " + data[i].note + " </div> </td>  <td> "  + data[i].price  + "€ </td> </tr>"); 
            }
            
            $( "#container" ).append("</table>");
            
            
            $(document).on("click", "#productlist tr", function(e)
             { 
                var id = $(this).attr('id');
                
                for(var i = 0; i < data.length; i++)
                {
                    if(id == data[i].id)
                    {
                        alert(data[i].name);
                    }
                }
            });
                       
            
        }
        ,"json").fail(function()
        {
            alert( "A network error occured, please check your internet connexion or try again later" );
        });


        
    });
    
    /**********************************PANIER CLICK****************************************/
    $("#panier").click(function(event)
    {
        $("#container").html("");
        
        if(articles.length === 0) $("#container").html("<h2 class=\"any_command\" > Votre panier est vide </h2>");
        else 
        {
            $("#container").html("liste panier + bouton achat");
        }
    });
    
    
    
    /***********************************PROFIL CLICK***************************************/
    
    $("#profil").click(function(event)
    {
        var orders_list;
        
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
            orders_list = data;
            if(data.length >= 1)
            {
                $( "#container" ).append("<div class='orders'> Vos commandes : </div>");
                $( "#container" ).append("<table id=\"full_w\" > <tr> <th class='text_left'> Numéro </th> <th class='text_middle'> Passée le </th> <th class='text_right'> Statut </th> </tr>");
            
                for(var i = 0 ; i<data.length ; i++)
                {
                    $( "#full_w" ).append("<tr id=" + data[i].id + "> <td class='text_left'> " + data[i].id + " </td> <td class='text_middle'> " + data[i].created_at + " </td> <td class='text_right'> " + data[i].status + " </td>                             </tr> ");
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
        
        
         $(document).on("click", "#full_w tr", function(e)
        {
             alert($(this).attr('id'));
             for(var i = 0 ; i<orders_list.length ; i++)
             {
                 if(orders_list[i].id === $(this).attr('id') )
                 {
                     alert("Résumé commande  " + data[i].id);
                 }
             }
            
        });
        
        
        $("#logout").click(function(event)
        {
            localStorage.clear();
            window.open("login.html");
        });
        
    });

    $("#menu").trigger("click");
    
    
    
    
    
    
    /********************** Try for disable back button ****************************/

    $(window).on("navigate", function (event, data) 
    {
        alert("nav");
        var direction = data.state.direction;
        if (direction == 'back') {
            alert("back");
        } 
        if (direction == 'forward') {
        // do something else
        }
    });
    
    document.addEventListener("intel.xdk.device.ready",function() 
    {
        //start grabbing the Android hardware back button
        intel.xdk.device.addVirtualPage();     
    }, false);
    
    document.addEventListener("intel.xdk.device.hardware.back", function()
    {
        alert("back");
        intel.xdk.device.addVirtualPage(); 
        document.getElementsByTagName("body")[0].innerHTML += "Hardware back button pressed";
    }, false);
    
    
});