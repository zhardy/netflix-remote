


document.addEventListener('DOMContentLoaded', function(){
	console.log('eggs');
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
			console.log(data);
			$( ".message" ).append( data.status );


		});

}

