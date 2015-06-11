


document.addEventListener('DOMContentLoaded', function(){
	var loginButton = document.querySelectorAll('button')[0];
	loginButton.addEventListener('click', login);
});


function login(){

  	var user = $("input[name='username'").val();
  	var pass = $("input[name='password'").val();
		$.ajax({
	    type : 'POST',
	    url  : 'http://localhost:3000/api/login',
	    data : { username: user, password: pass },
	    dataType : 'json'
		}).done( function (data){
			if(data.status != undefined){
				$( ".message" ).append( data.status );
			}
			else{
				var container = $('#container');
				container.empty();
				build_playlists(data.playlists, container)
			}

		});

}

function build_playlists(playlistArray, container){
	var html = "<ul>";
	playlistArray.forEach(function (entry){
		html = html + "<li>" + entry.name + "</li>";
	});
	html = html + "</ul>";
	container.append(html);
}

