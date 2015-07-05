
   
$( document ).ready(function() {
    playlist_click();
	    
    $("#menu-toggle").click(function(event) {
    	event.preventDefault();
        $("#wrapper").toggleClass("toggled");
        
    });

    $("#add").click(function(event){
    	event.preventDefault();
    	$(this).before("<li class='playlist'><a href='#''>Test</a></li>");
    	$(this).removeClass('selected');
        playlist_click();
    });

    $(".edit-button").click(function(event){
        var item = $(this).parent();
        var title = $(this).parent().html();
        title = title.split(" <sp"); 
        title = title[0].trim();
        item.empty();
        item.append("<input class='playlist-title-input' type='text' value='"+ title +"'>");
        text_input_select();
        $('.playlist-title-input').focus();
        // ?

        
    });
    
});


function playlist_click(){
    $('.playlist').click(function(event) {
        $('#main-nav').children().removeClass('selected');
        $(this).addClass('selected');
    });
}

function text_input_select(){
    $('.playlist-title-input').focus(function() {
        $(this).select();
    });
}