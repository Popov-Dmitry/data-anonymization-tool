package ru.anontmization.dataanonymizationtool.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.anontmization.dataanonymizationtool.Methods.controllers.ControllerDB;
import ru.anontmization.dataanonymizationtool.Methods.options.type.*;
import ru.anontmization.dataanonymizationtool.dto.mask.*;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;
import ru.anontmization.dataanonymizationtool.services.DepersonalizationService;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/mask")
@RequiredArgsConstructor
public class DepersonalizationController {

    private final DepersonalizationService service;
    private final ControllerDataBaseService controllerService;

    @GetMapping("/methods")
    public String getAllMethods(){
        return service.getMethods();
    }

    @GetMapping("/config")
    public String getConfig(){
        return service.getConfig();
    }

    @PostMapping("/config")
    public void setConfig(@RequestBody String request){
        service.setConfig(request);
    }


    @GetMapping("/start")
    public String startMasking(){
        if(controllerService.checkConnection()){
            service.start();
            return "start";
        }
        return "error";
    }

    @GetMapping("/clear")
    public void clearMasking(){
        service.clear();
    }

    @GetMapping("/check")
    public boolean checkStatus(){
        return controllerService.checkConnection();
    }
}
