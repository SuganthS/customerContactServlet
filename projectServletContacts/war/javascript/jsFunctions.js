
localStorage.clear();
var customerList =  document.getElementById("customerList");
var newCustomer = document.getElementById("createButton");
var logout = document.getElementById("logoutButton");
var firstName = document.getElementById("firstName");
var email = document.getElementById("email");
var phoNumber = document.getElementById("phoNumber");
var address = document.getElementById("address");

var customerForm = document.getElementById("customerDetailsForm");
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  


var createCustomer = document.getElementById("createCustomer");
customerForm.style.display="none";


var toDoSection = document.getElementById("ToDoHead");
toDoSection.style.display="none";
var toDoAddButton = document.getElementById("toDoAddButton");
var toDoUlList = document.getElementById("customerToDoList");
var updateToDoList = document.getElementById("toDoListUpdate");
var newToDoValue =  document.getElementById("newListValue");

var count ="c";
currentListId = "";
currentCustEmail = "";
toDoListItems = [];

$(document).ready(function(){
	
	$.ajax({
		url:'/LoadCustomer',
		type:'GET',
		success:function(data){
			console.log("data from servlet as jsonObject :"+data);
			var jsdata = JSON.parse(data);
			console.log("data from servlet as jsObject :"+jsdata);
			
			for(i=0;i<jsdata.length;i++){
			var obj = jsdata[i];
			console.log("object values name :"+obj.firstName+" and email :"+obj.email+" and todolist :"+obj.todoList);
			
			createCustomerFunc(obj.firstName,obj.email,obj.todoList);
			}
		},
		failure:function(){
			
		}
	});
	
});

var newCustomerTask = function(){
	//console.log("hai");
	firstName.value='';
	email.value='';
	phoneNumber.value='';
	address.value='';

	toDoUlList.innerHTML="";
	
	var ullist= customerList.parentNode.children[2].children;
	for(var i=0;i<ullist.length;i++){
		ullist[i].children[3].style.display="none";
	}
	customerForm.style.display="block";
	createCustomer.style.display="block";
	toDoSection.style.display="none";
	


}


function createCustomerFunc(name, email, todolist){
	var list = document.createElement("li");
	var checkBox = document.createElement("input");
	var label = document.createElement("label");
	 updateButton = document.createElement("button");
	var deleteButton = document.createElement("button");

	list.id=count;
	updateButton.id="updatebutton";
	toDoListItems.length=0;
	
	checkBox.type = "checkbox";
	label.innerText = name;
	updateButton.innerText = "update";
	deleteButton.innerText = "delete";
	//console.log("sdgihsdghk"+firstName);
	console.log(count);

	list.appendChild(checkBox);
	list.appendChild(label);
	list.appendChild(deleteButton);
	list.appendChild(updateButton);


	customerList.appendChild(list);
	var customerData = {"firstName":name,"email":email,"toDoListItems":todolist};
	myJson = JSON.stringify(customerData);
	localStorage.setItem(count,myJson);
	
	customerForm.style.display="none";
	toDoSection.style.display="none";
	count = count + 10;
	label.addEventListener("click", showCustomerDetails);
	deleteButton.addEventListener("click",deleteCustomerList);
	updateButton.addEventListener("click",updateCustomerDetails);
	updateButton.style.display="none";
	toDoListItems.length=0;
}


createCustomerTask = function(){
	
	console.log("length of name:"+firstName.value.length);

	if((firstName.value.trim().length==0) || (email.value.trim().length==0)){
		return false;
	}
	else{
		if(!(email.value.match(mailformat)))  
		{ 
			window.alert("invalid email");
			return false;
		}
	
	
	//toDoListItems[0] = "osfdgfjnk";
	
	var jsObj = new Object();
	jsObj.firstName = firstName.value;
	jsObj.email = email.value;
	
	var jsonObj = JSON.stringify(jsObj);
	
	$.ajax({
		url:'/CreateCustomer',
		type:'POST',
		data:'data='+jsonObj,
		success:function(data){
			if(data=="failure"){
				alert("customer id already exists");
				customerForm.style.display="none";
				toDoSection.style.display="none";
			
			}
			else{
				createCustomerFunc(firstName.value, email.value, toDoListItems);
			}
		},
		failure:function(){
			
		}
		
	});
	
	

	//text = localStorage.getItem(count);
	//data = JSON.parse(text);
	//console.log(data.firstName);



	
	}
}


var showCustomerDetails = function(){
	console.log("outside show method called");
	customerForm.style.display="block";
	toDoSection.style.display="block";
	createCustomer.style.display="none";
	toDoUlList.innerHTML="";



	updateButton.style.display="none";
	var ullist=this.parentNode.parentNode.children;
	//console.log("id of li"+ullist[0].children[3].innerText);


	for(var i=0;i<ullist.length;i++){
		ullist[i].children[3].style.display="none";
	}

 	var updateBt = this.parentNode.children[3];
 	updateBt.style.display="block";


	var id = this.parentNode.id;
	//console.log(id);
	currentListId = id;

	text = localStorage.getItem(id);
	data = JSON.parse(text);
	//console.log(data.firstName);

	firstName.value=data.firstName;
	email.value=data.email;



	var toDoList = data.toDoListItems;
	//console.log("values of to list of customer:"+toDoList);
	var counter = 0;

	for(var i=0;i<toDoList.length/2;i++){
		console.log("show method called");
	var list = document.createElement("li");
	var label = document.createElement("label");
	var closeButton =  document.createElement("span");

	label.innerText=toDoList[counter+1];
	console.log("toDoList value :"+toDoList[counter+1])
	closeButton.innerText="X";
	if(toDoList[counter]==="checked"){
		list.className ="checked";
	}
	list.appendChild(label);
	list.appendChild(closeButton);

	toDoUlList.appendChild(list);

	label.addEventListener("click", toDoListChecked);
	closeButton.addEventListener("click", deleteToDoList);
	counter = counter+2;
	
	}


currentCustEmail = data.email;
}

var deleteCustomerList = function(){
	
	
	var list = this.parentNode;
	var id = list.id;
	var listToDelete = document.getElementById(id);
	
	var data = JSON.parse(localStorage.getItem(id));
	var jsob = new Object();
	jsob.custEmail = data.email;

	
	var jsonob = JSON.stringify(jsob);
	console.log("data in delete (json)"+jsonob);

	
	$.ajax({
		url:'/DeleteCustomer',
		type:'POST',
		data:'data='+jsonob,
		success:function(){
			customerList.removeChild(listToDelete);
			localStorage.removeItem(id);
			customerForm.style.display="none";
			toDoSection.style.display="none";
			//console.log("in delete");
				toDoUlList.innerHTML="";

		}
	});
	
	
}

var updateCustomerDetails =  function(){

	var listid=this.parentNode.id;
	var customerData = {"firstName":firstName.value,"email":email.value};
	myJson = JSON.stringify(customerData);
	localStorage.setItem(listid,myJson);
	updateToDoListTask();
}

var toDoListChecked = function(){
	this.parentNode.classList.toggle("checked");
}

var deleteToDoList = function(){
	var list = this.parentNode;
	toDoUlList.removeChild(list);
}


var createNewToDoList = function(){
	if(newToDoValue.value!=""){

	var list = document.createElement("li");
	var label = document.createElement("label");
	var closeButton =  document.createElement("span");

	label.innerText=newToDoValue.value;
	closeButton.innerText="X";
	list.appendChild(label);
	list.appendChild(closeButton);

	toDoUlList.appendChild(list);

	label.addEventListener("click", toDoListChecked);
	closeButton.addEventListener("click", deleteToDoList);
	newToDoValue.value="";
}

}


var updateToDoListTask = function(){
	console.log("No of Item in list :"+toDoUlList.children.length);

var increment =0;
toDoListItems.length=0;

	var ulList = toDoUlList.children;
	console.log("list length ;"+ulList.length);
	for(var i=0;i<ulList.length;i++){
	if(ulList[i].classList.contains("checked")){
		toDoListItems[increment] = "checked";
		toDoListItems[increment+1] = ulList[i].children[0].innerText;
		}
		else{
		toDoListItems[increment] = "unChecked";
		toDoListItems[increment+1] = ulList[i].children[0].innerText;
		}
		increment =increment+2;
	}
	console.log(toDoListItems);
	
	var jsObj = new Object();
	jsObj.cusName =firstName.value;
	jsObj.cusEmail =email.value;
	jsObj.todo =toDoListItems;
	jsObj.currentCustEmail =currentCustEmail;
	
	var jsonObj = JSON.stringify(jsObj);
	
	$.ajax({
		url:'/UpdateCustomer',
		type:'post',
		data:'data='+jsonObj,
		success:function(data){
			console.log("data in response of update "+data)
			if((data=="creatednew")||(data=="update")){
				var customerData = {"firstName":firstName.value,"email":email.value,"toDoListItems":toDoListItems};
				var cusData = JSON.stringify(customerData);
				localStorage.setItem(currentListId, cusData);
				//console.log("id"+currentListId);
				currentCustEmail = email.value;
				/*var text1 = localStorage.getItem(currentListId);
				var data1 = JSON.parse(text1);*/

				toDoListItems.length=0;
			}
			else if(data=="alreadyexist"){
				alert(" customer id :"+email.value+" already exist");
				console.log("customer already exsist and previous email was "+currentCustEmail);
				email.value=currentCustEmail;}
		},
		failure:function(){
			
		}
	});

	


}


logoutUser = function(){
	
}

createCustomer.addEventListener("click", createCustomerTask);
newCustomer.addEventListener("click", newCustomerTask);
toDoAddButton.addEventListener("click", createNewToDoList);
updateToDoList.addEventListener("click", updateToDoListTask);


