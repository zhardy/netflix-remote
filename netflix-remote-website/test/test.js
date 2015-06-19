var main = $('#main-nav');
   
$( document ).ready(function() {
	$('.playlist').click(function(event) {
	    main.children().removeClass('selected');
	    $(this).addClass('selected');
	});
});