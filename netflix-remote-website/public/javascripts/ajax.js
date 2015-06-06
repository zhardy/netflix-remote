	//	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>


function new_user(){
  	var user = $("input[name='username'").val();
  	var pass = $("input[name='password'").val();


	$.ajax({
    type : 'POST',
    url  : '/new',
    data : { username: user, password: pass },
    dataType : 'json'
	}).done( function (data){

		window.location.href = "http://localhost:3000/"
		// if(data.status === 'success'){
		// 	$('div#message').append('Success!');
		// }
		// else if(data.status === 'error'){

		// } else {
		// 	$('div#message').append(data.failureType);
		// }
	});
}

function new_playlist(){   
     var nodes = [];
     $('#checker :checked').each(function() {
       nodes.push($(this).val());
     });
	var name = $("input[name='name'").val();
	console.log(nodes);
	$.ajax({
		type:'POST',
		url : '/playlist/new',
		data: { name : name, nodes : JSON.stringify(nodes)}
	}).done( function (data){

	});

}