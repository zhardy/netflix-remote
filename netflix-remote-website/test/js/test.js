var main = $('#main-nav');
   
$( document ).ready(function() {
	$('.playlist').click(function(event) {
	    main.children().removeClass('selected');
	    $(this).addClass('selected');
	});

	    
    $("#menu-toggle").click(function(event) {
    	event.preventDefault();
        $("#wrapper").toggleClass("toggled");
        
    });

    $("#add").click(function(event){
    	event.preventDefault();
    	$(this).before("<li class='playlist'><a href='#''>Test</a></li>");
    	$(this).removeClass('selected');
    });
    
});