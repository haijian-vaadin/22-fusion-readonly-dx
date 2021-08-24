package com.example.application;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;

@Endpoint
@AnonymousAllowed
public class WeatherEndpoint {
    @Nonnull
    public Temperature getTemperature(City city) {
        Temperature temperature = new Temperature();
        temperature.setUnit("Celcius");
        if(city != null) {
            if(city.getName().equalsIgnoreCase("Turku")) {
                temperature.setValue(20);        
            } else if(city.getName().equalsIgnoreCase("Helsinki")) {
                temperature.setValue(25);        
            }
        }
        return temperature;
    }
}
