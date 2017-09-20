package com.libertymutual.goforcode.spark.app.utilities;

import java.io.StringWriter;
import java.util.Map;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;

public class MustacheRenderer {

	private static final MustacheRenderer instance = new MustacheRenderer("templates"); 
	private DefaultMustacheFactory factory; //this will generate mustaches
	
	private MustacheRenderer(String folderName) {		
		factory = new DefaultMustacheFactory(folderName); //single instance of the factory where we pass in the folder name
	}
	
	//returns a single instance of MustacheRenderer (sigleton pattern)
	public static MustacheRenderer getInstance() {
		return instance; 
	}
	
	public String render(String templatePath, Map<String, Object> model) {
		Mustache mustache = factory.compile(templatePath); 
		StringWriter writer = new StringWriter(); 
		mustache.execute(writer, model);
		return writer.toString(); 
	}
}
