package com.servletContacts;

import java.io.IOException;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.servletContacts.PMF;

public class LoginServlet extends HttpServlet {

	protected void doPost(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		HttpSession session = req.getSession();
		String cusEmail = req.getParameter("login_email");
		String cusPassword = req.getParameter("login_password");
		
		try {
			Query q= pm.newQuery(AdminJDO.class);
			q.setFilter("custEmail =='"+cusEmail+"' && custPassword =='"+cusPassword+"'");
			List<AdminJDO> result = (List<AdminJDO>)q.execute();
			if(!(result.isEmpty())) {
				session.setAttribute("sessionname", cusEmail);
				res.sendRedirect("customerPage.jsp");
			}
			else
			{
				
				res.sendRedirect("login.jsp");
			}
		}finally {
			pm.close();
		}
		
		
	}
	
	
}
