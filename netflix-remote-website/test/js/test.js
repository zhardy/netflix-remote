
   
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
        var title = $(this).parent().html();
        $(this).parent().empty();
        $(this).parent().append("<input type='text' class='playlist-title-input' value='"+ title + "'>");
        
    });
    
});


function playlist_click(){
    $('.playlist').click(function(event) {
        $('#main-nav').children().removeClass('selected');
        $(this).addClass('selected');
    });

}