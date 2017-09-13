<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>

	<title>Customer page</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<link rel="stylesheet" href="css/custpage.css">
	<SCRIPT type="text/javascript">
    window.history.forward();
    function noBack() { window.history.forward(); }   
</SCRIPT>	

</head>
<%
if(session!=null && (session.getAttribute("sessionname")!=null)){
%>
<body onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">


<div class="customerPageSection">
	<div class="customerContactsListSection">
		<span><input type="button" id="logoutButton" value="logout" onclick="location.href='/Logout';"></span>
		<span><input type="button" id="createButton" value="Create Customer"></span>
		<ul class="customerList" id="customerList">
			
		</ul>
	</div>

	<div class="customerDetailsSection">
		<form id="customerDetailsForm">
			First Name :<input type="text" id="firstName" name="firstName"><br>
			Email  :<input type="text" id="email" name="lastName"><br>
			Phone Number : <input type="text" id="phoneNumber" name="phoneNumber"><br>
			Address    :<input type="text" id="address" name="address"><br>
			
			<input class="updateButton" id="createCustomer" style="display:none" type="button" value="create customer"><br>
		</form>
	</div>
	<div class="customerToDoListSection">
		<div id="ToDoHead">
			<h4>ToDoList</h4>
			<input type="text" id="newListValue" placeholder="Create New Task">
			<button class="addButton" id="toDoAddButton">Add</button>
		
		<ul id="customerToDoList">
			

		</ul>
		<button id="toDoListUpdate">update</button>
		</div>
	</div>
</div>


<script type="text/javascript" src="javascript/jsFunctions.js"></script>
</body>


</html>
<% 

}
else{ response.sendRedirect("login.jsp");
}
%>