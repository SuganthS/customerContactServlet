

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  

function validatelogin()
{
	var login_email=document.getElementById("login_email").value;
	var login_password=document.getElementById("login_password").value;
	
	if(login_email=="")
	{
		document.getElementById("login_email_content").innerHTML="Please enter user name";
		document.getElementById("login_email_content").style.color="darkolivegreen";
		document.getElementById("login_email").focus();
		return false;
	} 
	else if(!(login_email.match(mailformat)))  
	{ 
		$('#login_email').val('');
		document.getElementById("login_email_content").innerHTML="Please enter valid email";
		document.getElementById("login_email_content").style.color="darkolivegreen";
		document.getElementById("login_email").focus();
		return false;
	}

	else if(login_password=="")
	{
		document.getElementById("login_password_content").innerHTML="Please enter password";
		document.getElementById("login_password_content").style.color="darkolivegreen";
		document.getElementById("login_password").focus();
		return false;
	}
     
}

function checkKey() {
	var key=event.keyCode;
	if(key !== 8 && key !== 32) {
		document.getElementById("login_email_content").innerHTML="";
		document.getElementById("login_password_content").innerHTML="";	
		document.getElementById("signup_username_content").innerHTML="";
		document.getElementById("signup_email_content").innerHTML="";
		document.getElementById("signup_password_content").innerHTML="";
		document.getElementById("signup_retype_password_content").innerHTML="";

	}
}

function validatesignup()
{
	var signup_username=document.getElementById("signup_username").value;
	var signup_email=document.getElementById("signup_email").value;
	var signup_password=document.getElementById("signup_password").value;
	var signup_retype_password=document.getElementById("signup_retype_password").value;


	if(signup_username=="")
	{
		document.getElementById("signup_username_content").innerHTML="Please enter user name";
		document.getElementById("signup_username_content").style.color="darkolivegreen";
		document.getElementById("signup_username").focus();
		return false;
	}  
	else if(signup_email=="")
	{
		document.getElementById("signup_email_content").innerHTML="Please enter email";
		document.getElementById("signup_email_content").style.color="darkolivegreen";
		document.getElementById("signup_email").focus();
		return false;
	}  
	else if(!(signup_email.match(mailformat)))  
	{ 
		$('#signup_email').val('');
		document.getElementById("signup_email_content").innerHTML="Please enter valid email";
		document.getElementById("signup_email_content").style.color="darkolivegreen";
		document.getElementById("signup_email").focus();
		return false;
	}       
	else if(signup_password=="")
	{
		document.getElementById("signup_password_content").innerHTML="Please enter password";
		document.getElementById("signup_password_content").style.color="darkolivegreen";
		document.getElementById("signup_password").focus();
		return false;
	}
	else if(signup_retype_password!="" && signup_password=="")
	{
			document.getElementById("signup_password_content").innerHTML="";	
			document.getElementById("signup_retype_password_content").innerHTML="";	
			document.getElementById("signup_retype_password_content").innerHTML="Password doest match";
			$('#signup_password').val('');
			$('#signup_retype_password').val('');
			document.getElementById("signup_password").focus();
			return false;
	}

	else
	{
		if(signup_password!=signup_retype_password)
		{

			document.getElementById("signup_password_content").innerHTML="";	
			document.getElementById("signup_retype_password_content").innerHTML="";	
			document.getElementById("signup_retype_password_content").innerHTML="Password doest match";
			$('#signup_password').val('');
			$('#signup_retype_password').val('');
			document.getElementById("signup_password").focus();
			return false;


		}
		else if(signup_username=="")
		{

			document.getElementById("signup_password_content").innerHTML="";	
			document.getElementById("signup_retype_password_content").innerHTML="";	
			document.getElementById("signup_retype_password_content").innerHTML="";	
			$('#signup_password').val('');
			$('#signup_retype_password').val('');
			document.getElementById("signup_username_content").innerHTML="Please enter user name";
			document.getElementById("signup_username_content").style.color="darkolivegreen";
			document.getElementById("signup_username").focus();
			return false;


		}
	}
     
}


function showNotificationBar(message,blocktime) {
	var statuscheck = message; 
	var block = blocktime;
	console.log("block time :"+block);
	console.log("status check :"+statuscheck);
	var height = $(window).height();
	console.log(height);
	
	$(".notification-message").text(statuscheck);
	  $('#notification-bar').slideDown(function() {}); 
	//document.getElementById("busy").style.visibility = 'visible';

     /*   var HTMLmessage = "<div class='notification-message' style='text-align:center; line-height: 30px;font-size: 15px'> " + message + " </div>";
        var HTMLmessage2 = "<div id='notification-bar' style='display:none; margin-left:50%; margin-right:auto; margin-top:0.5%; width:20%;  height:30px; background-color: #ffd700; position: relative; z-index: 1; color: #000;border-radius : 20px;border-bottom: 0px solid #000;'>" + HTMLmessage + "</div>";
        $('body').prepend("<div id='busy' style=' position: fixed;z-index:3; top: 15; left: 0; width: 100%; height:"+ height +"px; background-color: rgba(187, 190, 193,0.5);'>"+ HTMLmessage2 + "</div>");
    */
    /*animate the bar*/
    /* if(statuscheck=="block")
    	 {   	
    	 $('#notification-bar').slideDown(function() {}); 
    	 $('#busy').fadeIn(function() {}); 
    	 console.log("in block block");
    	 }
     else 
    	 {
    	 console.log("in release block");

    	 setTimeout(function() {
    	 $('#notification-bar').slideUp(function() {}); 
    	 $('#busy').fadeOut(function() {}); 
    	 }, block);
    	 
    	 }*/

    $('#busy').fadeIn(function() {
    	
        setTimeout(function() {
            $('#notification-bar').slideUp(function() {}); 
            $('#busy').fadeOut(function() {}); 
            //document.getElementById("busy").style.visibility = 'hidden';
        }, block);
        //document.getElementById("busy").style.visibility = 'hidden';
    });
    
}




