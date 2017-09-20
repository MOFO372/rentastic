package com.libertymutual.goforcode.spark.app.utilities;

import java.util.Map;

import org.jtwig.JtwigModel;
import org.jtwig.JtwigTemplate;

import spark.ModelAndView;
import spark.TemplateEngine;

public class JtwigRenderer extends TemplateEngine {

	private String templatesDirectory;

	public JtwigRenderer() {
		this.templatesDirectory = "templates";
	}

	public JtwigRenderer(String customTemplatesDirectory) {
		this.templatesDirectory = customTemplatesDirectory;
	}

	@Override
	public String render(ModelAndView modelAndView) {
		String viewName = templatesDirectory + "/" + modelAndView.getViewName();
		JtwigTemplate template = JtwigTemplate.classpathTemplate(viewName);
		JtwigModel model = JtwigModel.newModel((Map<String, Object>) modelAndView.getModel());
		return template.render(model);
	}
}
