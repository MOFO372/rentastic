package com.libertymutual.goforcode.spark.app;

import static spark.Spark.*;
import org.mindrot.jbcrypt.BCrypt;

import com.libertymutual.goforcode.spark.app.controllers.ApartmentApiController;
import com.libertymutual.goforcode.spark.app.controllers.ApartmentController;
import com.libertymutual.goforcode.spark.app.controllers.HomeController;
import com.libertymutual.goforcode.spark.app.controllers.SessionController;
import com.libertymutual.goforcode.spark.app.controllers.UserController;
import com.libertymutual.goforcode.spark.app.filters.SecurityFilters;
import com.libertymutual.goforcode.spark.app.models.Apartment;
import com.libertymutual.goforcode.spark.app.models.User;
import com.libertymutual.goforcode.spark.app.utilities.AutoCloseableDb;


public class Application {

	public static void main(String[] args) {
		
		String encryptedPassword = BCrypt.hashpw("password", BCrypt.gensalt());
		
		try(AutoCloseableDb db = new AutoCloseableDb()) {
			User.deleteAll(); 
			User curtis = new User("curtis.schlak@theironyard.com", encryptedPassword, "Curtis", "Schlak"); 
			curtis.saveIt(); 
			
			Apartment.deleteAll();
			Apartment apartment = new Apartment(6969, 1, 0, 350, "123 Main St", "San Francisco", "CA", "95125"); 
			curtis.add(apartment);
			apartment.saveIt();
			
			apartment = new Apartment(4, 5, 6, 350, "123 Cowboy Way", "Houston", "TX", "77006");
			curtis.add(apartment);
			apartment.saveIt();
			
		}
		
		
		path("/apartments", () -> {
			before("/new", SecurityFilters.isAuthenticated); 
			
			get("/new", ApartmentController.newForm);
			before("/mine", SecurityFilters.isAuthenticated);
			get("/mine", ApartmentController.index); 
			get("/:id", ApartmentController.details); //put this last since it has to be at the very end of the URL
			
			before("", SecurityFilters.isAuthenticated); 
			post("", ApartmentController.create); 
		});
		
		
		get("/", HomeController.index); 
		get("/login", SessionController.newForm); 
		post("/login", SessionController.create); 
		
		get("/users/new", UserController.newForm); 
		post("/signup", UserController.create);
		
		post("/logout", SessionController.destroy); 
		
		path("/api", () -> {
			get("/apartments/:id", ApartmentApiController.details); 
			post("/apartments", ApartmentApiController.create); 
		});
	}
	
}
