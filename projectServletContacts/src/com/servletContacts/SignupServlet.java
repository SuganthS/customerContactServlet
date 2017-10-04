package com.servletContacts;

import java.io.IOException;
import java.util.List;
import java.util.Properties;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SignupServlet extends HttpServlet {

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

		HttpSession errsession = req.getSession();
		System.out.println("inside signup servlet");
		String cusName = req.getParameter("signup_username");
		String cusEmail = req.getParameter("signup_email");
		String cusPassword = req.getParameter("signup_password");
		String cusRePassword = req.getParameter("signup_retype_password");

		PersistenceManager pm = PMF.get().getPersistenceManager();

		try {
			Query q = pm.newQuery(AdminJDO.class);
			q.setFilter("custEmail == '" + cusEmail + "'");
			List<AdminJDO> result = (List<AdminJDO>) q.execute();
			if (!(result.isEmpty())) {
				String error="duplicate";
				req.setAttribute("error", error);
				errsession.setAttribute("error", "signup_duplicate_email");
				errsession.setMaxInactiveInterval(5);
				/*RequestDispatcher dispacther = req.getRequestDispatcher("login.jsp");
				dispacther.include(req, res);*/
				res.sendRedirect("login.jsp");
				System.out.println("Duplicate profile");
			} else {
				AdminJDO admin = new AdminJDO();
				admin.setCustName(cusName);
				admin.setCustEmail(cusEmail);
				admin.setCustPassword(cusPassword);
				pm.makePersistent(admin);

				String to = cusEmail;
				String from = "suganth81994@gmail.com";
				String host = "smtp.gmail.com";
				Properties properties = System.getProperties();
				properties.setProperty("mail.smtp.host", host);
				Session session = Session.getDefaultInstance(properties);

				try {
					MimeMessage message = new MimeMessage(session);
					message.setFrom(new InternetAddress(from));
					message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

					message.setSubject("New Signup ( Welcome )");
					message.setText("Welcome" + cusName + ",");

					Transport.send(message);
					System.out.println(message);
				} catch (MessagingException mex) {
					mex.printStackTrace();
				}
				res.sendRedirect("login.jsp");
			}
			
		} finally {
			pm.close();
		}

		

	}

}
