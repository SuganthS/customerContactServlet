<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Hello App Engine</title>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/script.js"></script>
<script src="js/validation.js"></script>
<link rel = "stylesheet"
   type = "text/css"
   href = "css/style.css" />


  </head>
  <% if(session!=null && session.getAttribute("sessionname")!=null){
	  response.sendRedirect("customerPage.jsp");
  }
  else{
	%>

  <body>
 
 
   
    
    <div class="form">
   
    <div class="login_form">
    <form name="login_formf" action="/Login"  onsubmit="return validatelogin()" method="post" >
      <div id="account_status" class="message"></div>
      <input type="text" name="login_email" id="login_email" placeholder="Email" onkeypress="checkKey()"/>
      <div id="login_email_content" class="message"></div>
      <input type="password" name="login_password" id="login_password" placeholder="password" onkeypress="checkKey()"/>
      <div id="login_password_content" class="message"></div>
      <input class="button" type="submit" value="login"></input>
      <p class="message">Not registered? <a class="signup">Create an account</a></p>

    </form>
    </div>


<div class="signup_form">
    <form name="myForm" action="/Registration" onsubmit="return validatesignup()" method="post">
      <input type="text" name="signup_username" id="signup_username" placeholder="username" onkeypress="checkKey()"/>
      <div id="signup_username_content" class="message"></div>
      <input type="text" name="signup_email" id="signup_email" placeholder="email" onkeypress="checkKey()"/>
      <div id="signup_email_content" class="message"></div>
      <input type="password" name="signup_password" id="signup_password" placeholder="password" onkeypress="checkKey()"/>
      <div id="signup_password_content" class="message"></div>
      <input type="password" id="signup_retype_password" placeholder="retype password" onkeypress="checkKey()"/>
      <div id="signup_retype_password_content" class="message"></div>
      <input class="button" type="submit" value="Sign up"></input>
      <p class="message">Already registered? <a class="login">Sign in</a></p>
    </form>
</div>

        <button onclick="location.href='https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://1-dot-contactsgae-179613.appspot.com/oauth2callback&response_type=code&client_id=439621455268-mqgr2qlcede8t691tgljslojbrq7kpv2.apps.googleusercontent.com&approval_prompt=force'" class="googleButton">google</button>
     
    </div>
    
    



   
      </body>
    

</html>
<% 
}
%>
