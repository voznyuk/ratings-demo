package vvoznyuk.demo.tpe.ratings.controller.spring;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /* Tried to get webjars-locator work, but it had no effect. Have to specify version in <link> and <script> tags. */
        //registry.addResourceHandler("/webjars/**").addResourceLocations("/webjars/").resourceChain(false);
        //registry.setOrder(1);
    }

}
