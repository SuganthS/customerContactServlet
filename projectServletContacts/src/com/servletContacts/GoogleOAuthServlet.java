package com.servletContacts;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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

public class GoogleOAuthServlet extends HttpServlet {

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

		HttpSession session = req.getSession();
		String auth_code = req.getParameter("code");
		System.out.println("successfully came back...............");
		System.out.println("This is git checking");
		// String auth_code = code;
		System.out.println(auth_code);

		// Code for getting access token from the authorization_code.....

		System.out.println("Before");
		URL url = new URL("https://www.googleapis.com/oauth2/v4/token?"
				+ "client_id=439621455268-mqgr2qlcede8t691tgljslojbrq7kpv2.apps.googleusercontent.com"
				+ "&client_secret=GVCIumIfCkcG47UqF0AbaX8f&"
				+ "redirect_uri=http://1-dot-contactsgae-179613.appspot.com/oauth2callback&"
				+ "grant_type=authorization_code&" + "code=" + auth_code);
		System.out.println("After");

		HttpURLConnection connect = (HttpURLConnection) url.openConnection();
		connect.setRequestMethod("POST");
		connect.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		connect.setDoOutput(true);
		BufferedReader in = new BufferedReader(new InputStreamReader(connect.getInputStream()));
		String inputLine;
		String response = "";
		while ((inputLine = in.readLine()) != null) {
			response += inputLine;
		}
		in.close();
		System.out.println(response.toString());
		// JSONParser parser = new JSONParser();
		JSONObject json_access_token = null;
		try {
			json_access_token = new JSONObject(response);
			System.out.println(json_access_token);
		} catch (JSONException e) {

			e.printStackTrace();
		}
		// String access_token="";
		String access_token = null;
		try {
			access_token = (String) json_access_token.get("access_token");
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		System.out.println("Access token =" + access_token);
		System.out.println("access token caught");

		// code for getting user details by sending access token.......

		URL obj1 = new URL("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + access_token);
		HttpURLConnection conn = (HttpURLConnection) obj1.openConnection();
		BufferedReader in1 = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String inputLine1;
		String responsee = "";
		while ((inputLine1 = in1.readLine()) != null) {
			responsee += inputLine1;
		}
		in1.close();
		System.out.println(responsee.toString());
		String resp = responsee.toString();
		JSONObject json_user_details = null;
		try {
			json_user_details = new JSONObject(responsee);

			System.out.println("email of customer :" + json_user_details.get("email"));
		} catch (JSONException e) {
			e.printStackTrace();
		}

		PersistenceManager pm = PMF.get().getPersistenceManager();

		try {
			Query q = pm.newQuery(AdminJDO.class);
			String custEmail = json_user_details.get("email").toString();
			String custName = json_user_details.get("name").toString();

			q.setFilter("custEmail == '" + custEmail + "'");
			List<AdminJDO> result = (List<AdminJDO>) q.execute();
			if (!(result.isEmpty())) {
				session.setAttribute("sessionname", custEmail);
				res.sendRedirect("customerPage.jsp");
			} else {
				AdminJDO admin = new AdminJDO();
				admin.setCustName(custName);
				admin.setCustEmail(custEmail);
				// admin.setCustPassword(cusPassword);
				pm.makePersistent(admin);
				session.setAttribute("sessionname", custEmail);
				res.sendRedirect("customerPage.jsp");
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			pm.close();
		}

	}
}
