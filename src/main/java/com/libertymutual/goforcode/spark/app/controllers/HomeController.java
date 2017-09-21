package com.libertymutual.goforcode.spark.app.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.libertymutual.goforcode.spark.app.models.Apartment;
import com.libertymutual.goforcode.spark.app.utilities.AutoCloseableDb;
import com.libertymutual.goforcode.spark.app.utilities.MustacheRenderer;
import spark.Request;
import spark.Response;
import spark.Route;

public class HomeController {

	public final static Route index = (Request req, Response res) -> {
		
		try(AutoCloseableDb db = new AutoCloseableDb()) {
			List<Apartment> apartments = Apartment.findAll(); 		
			Map<String, Object> model = new HashMap<String, Object>(); //maps a string to another value based on that string
			model.put("apartments", apartments);
			model.put("currentUser", req.session().attribute("currentUser"));
			model.put("noUser",  req.session().attribute("currentUser") == null); 
			//model.put("isActive", req.session().attribute("isActive") == true); 
			return MustacheRenderer.getInstance().render("apartment/index.html", model); //REWRITE THIS LINE WITH NEW TEMPLATE TO RENDER
			
		}
		
	};
	
}
