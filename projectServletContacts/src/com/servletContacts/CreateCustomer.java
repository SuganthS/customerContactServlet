 package com.servletContacts;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class CreateCustomer extends HttpServlet {

	protected void doPost(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		HttpSession session = req.getSession();
		res.setContentType("text/html");  
        PrintWriter out=res.getWriter();
		String data = req.getParameter("data");
		
		System.out.println("inside create customer"+data);
		JSONObject json = null;
		
		try{
		json = new JSONObject(data);
		System.out.println(json);
		String customerFName = json.getString("firstName");
		String customerEmail = json.getString("email");
		String customerPhoNo = json.getString("phoNumber");
		String customerAddress = json.getString("address");
		System.out.println("fname :"+customerFName+" and email :"+customerEmail);
		
		Query q = pm.newQuery(CustomerJDO.class);
		q.setFilter("adminEmail =='"+session.getAttribute("sessionname").toString()+"' && email =='"+customerEmail+"'");
		List<CustomerJDO> result = (List<CustomerJDO>) q.execute();
		
		if(!(result.isEmpty())){
			System.out.println("Duplicate cutomer email already exist");
			out.print("failure");
		}
		else{
			System.out.println("customerJDO");
			CustomerJDO customer =new CustomerJDO();
			customer.setAdminEmail(session.getAttribute("sessionname").toString());
			customer.setFirstName(customerFName);
			customer.setEmail(customerEmail);
			customer.setPhoNumber(customerPhoNo);
			customer.setAddress(customerAddress);
			//customer.setTodoList(li);
			
			out.print("success");
			pm.makePersistent(customer);
		}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			System.out.println("error in json");
		}
		finally{
			pm.close();
			
		}
		
	}
}
