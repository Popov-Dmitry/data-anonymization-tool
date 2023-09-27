package ru.anontmization.dataanonymizationtool.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;
import ru.anontmization.dataanonymizationtool.services.DepersonalizationService;

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

    @PostMapping("/config")
    public void setConfig(@RequestBody String request){
        service.setConfig(request);
    }


    @GetMapping("/start")
    public String startMasking(){
        if(controllerService.checkConnection()){
            return service.start();
        }
        return "{\"error\" : \"connection\"}";
    }

    @GetMapping("/clear")
    public void clearMasking(){
        service.clear();
    }

    @GetMapping("/status")
    public String getStatus(){
        return service.getStatus();
    }

    @GetMapping("/check")
    public boolean checkStatus(){
        return controllerService.checkConnection();
    }
}
