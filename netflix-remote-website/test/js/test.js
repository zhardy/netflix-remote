var cancel_button = "<span class='glyphicon glyphicon-remove cancel-button'></span>";
var okay_button   = "<span class='glyphicon glyphicon-ok okay-button'></span>";
var edit_button   = "<span class='glyphicon glyphicon-pencil edit-button'></span>";


   
$( document ).ready(function() {
    menu_toggle();
    add_button();
    playlist_click();
    edit();    
});

function menu_toggle(){
    $("#menu-toggle").click(function(event) {
        event.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
}

function add_button(){
    $("#add").click(function(event){
        event.preventDefault();
        $(this).before("<li class='playlist'><a href='#''>Test</a></li>");
        $(this).removeClass('selected');
        playlist_click();
    });
}


function playlist_click(){
    $('.playlist').click(function(event) {
        $('#main-nav').children().removeClass('selected');
        $(this).addClass('selected');
    });
}

function edit(){
    $(".edit-button").click(function(event){
        var item = $(this).parent();
        var title = $(this).parent().html();
        title = title.split("<sp"); 
        title = title[0].trim();
        item.empty();
        item.append("<input class='playlist-title-input' type='text' value='"+ title +"'>");
        item.append( okay_button + cancel_button);
        buttons_and_input(title);
        $('.playlist-title-input').focus();        
    });
}

function buttons_and_input(title){

    $('.playlist-title-input').focus(function() {
        $(this).select();
    });

    $('.cancel-button').click(function(event){
        var item = $(this).parent();
        item.empty();
        item.append(title + edit_button);
        edit();
    });

    $('.okay-button').click(function(event){
        var value = $('.playlist-title-input').val();
        var item = $(this).parent();
        item.empty();
        item.append(value + edit_button);
        edit();
    });
}