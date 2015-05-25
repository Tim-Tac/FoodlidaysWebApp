$(document).ready(function() 
{
    if(localStorage.getItem("connected") === null) window.open("login.html"); //si pas co redirection vers login
    
    //define Article object
    var Article = function(n,q,p,i,id) {
        this.name = n;
        this.quantity = q;
        this.price = p;
        this.image = i;
        this.id = id;
    };
    var articles = [];
    
    
    /*************************************MENU CLICK**************************************/
    
    $("#menu").click(function(event)
    {
        $("#container").html("");
        
        $("#container").append("Catégorie : <form> <select name=\"cat\" size=\"10\"> <option>test <option>test2 </select> </form>    ");
        
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
                         $("<div id=\"Choisissez votre quantité \"> <input type=\"number\" id=\"quantity\" name=\"quantity\" placeholder=\" Quantité désirée\" </div>").dialog(
                         {
                             title : "Choisir quantité de " +  data[i].name,
                             buttons: [{
                            text: "Valider", click: function() 
                            {
                                $( this ).dialog( "close" );
                                alert(document.getElementById("quantity").value);
                                
                                var art = new Article(data[i].name,document.getElementById("quantity").value,data[i].price,data[i].image,data[i].id);
                                articles.push(art);
                                alert(data[i].name + " ajouté au panier ! ");
                                
                                
                            }}]
                        });
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
            $("#container").append("<div class='basketwrapper'> <table id='basketlist' class=\"basket_table\"> <tr> <th class='image_basket'> Produit </th> <th> Quantité </th> <th> Prix </th> <th> Sous-total </th>                  <tr>");
            for(var i = 0 ; i < articles.length ; i++)
            {
                  $("#basketlist").append("<tr> <td> <img class=\"image_basket\" src=\"http://foodlidays.dev.innervisiongroup.com/uploads/"+ articles[i].image+"\"><br/> "+ articles[i].name +"</td> <td> "+ articles[i].quantity +"</td> <td> "+ articles[i].price +" €</td> <td> "+ articles[i].price * articles[i].quantity +" €</td> </tr>");
            }
            $("#container").append("</table> </br></div> <div> <input type=\"button\" id='toOrder' value=\"Commander\"></div>");
        }    
        
        
        $('#toOrder').click(function () {
                $("<div> Choisissez votre moyen de payement </div>").dialog({
                    title: "Méthode de payement",
                      buttons: [
                        {
                            text: "Cash",
                            click: function() 
                            {
                                $( this ).dialog( "close" );
                            }
                        },
                        {
                        text: "Card",
                        click: function() 
                        {
                            $( this ).dialog( "close" );
                        }}]
                  });
            });
        
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
                $( "#container" ).append(" <span class='orders'> Vos commandes : </span> <br/> <div class='orderwrapper'>");
                $( ".orderwrapper" ).append("<table id=\"full_w\" > <tr> <th class='text_left'> Numéro </th> <th class='text_middle'> Passée le </th> <th class='text_right'> Statut </th> </tr>");
            
                for(var i = 0 ; i<data.length ; i++)
                {
                    $( "#full_w" ).append("<tr id=" + data[i].id + "> <td class='text_left'> " + data[i].id + " </td> <td class='text_middle'> " + data[i].created_at + " </td> <td class='text_right'> " + data[i].status + " </td>                             </tr> ");
                }
                $( "#container" ).append("</table>");
            }
            else
            {
                $("#container").append(" </div> <div class=\"orders\"> Aucunes commande en cours <br/>");
            }
        },
        "json").fail(function() 
        {
            alert( "A network error occured, please check your internet connexion or try again later" );
        });
        
        $("#container").append("</div></div> <input type=\"button\" id='logout' value=\"Déconnexion\" > </div>");
        
        
        //Résumé au click d'une commade 
        $(document).on("click", "#full_w tr", function(e)
        {    
             for(var i = 0 ; i<orders_list.length ; i++)
             {   
                 if(orders_list[i].id == $(this).attr('id') )
                 {
                     var toShow = "Résumé de la commande " + orders_list[i].id + "\n------------------------------- \n";
                      
                     for(var j = 0 ; j<orders_list[i].foods.length ; j++)
                     {
                        toShow = toShow + orders_list[i].foods[j].ordered_quantity + " x " + orders_list[i].foods[j].food_name + "\n";
                      }
                     toShow = toShow + "------------------------------- \n" + orders_list[i].total_price + "€,  by " + orders_list[i].payment_mode + "\nLe" + orders_list[i].created_at;
                     
                     alert(toShow);
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