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
    
});