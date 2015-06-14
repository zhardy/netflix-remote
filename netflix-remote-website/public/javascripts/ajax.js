	//	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>




function new_playlist(){   
     var nodes = [];
     $('#checker :checked').each(function() {
       nodes.push($(this).val());
     });
	var name = $("input[name='name'").val();
	$.ajax({
		type:'POST',
		url : '/playlist/new',
		data: { name : name, nodes : JSON.stringify(nodes)}
	}).done( function (){
		console.log('data');
		get_playlists();

	});

}

function get_playlists(){
	$.ajax({
		type:'GET',
		url: '/playlist',
	}).done( function (data){
		var container = $('.playlists');
		var html = "<ul>";
		data.playlists.forEach( function (entry){
			html = html + "<li>" + entry.name + "</li>";
		});
		html = html + "</ul>";
		container.append(html);
	});
}


$( document ).ready(function() {
	get_playlists();
	// get_movies();
});