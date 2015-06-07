	


function login(){

  	var user = $("input[name='username'").val();
  	var pass = $("input[name='password'").val();
  	$( ".message" ).append( user );

  		$.ajax({
		    type : 'POST',
		    url  : 'api/login',
		    data : { username: user, password: pass },
		    dataType : 'json'
			}).done( function (data){

				$( ".message" ).append( data );

				if(data.status === 'success'){
					$('div#message').append('Success!');
				}
				else if(data.status === 'error'){

				} else {
					$('div#message').append(data.failureType);
				}
			});

}

document.addEventListener('DOMContentLoaded', function () {
	console.log('eggs');
	var loginButton = document.querySelectorAll('button')[0];
	loginButton.addEventListener('click', login);
	});

