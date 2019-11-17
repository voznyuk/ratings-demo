package vvoznyuk.demo.tpe.ratings.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UIController {

    @GetMapping("/")
    public String app(Model model) {
        return "app";
    }

}
