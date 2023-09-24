package ru.anontmization.dataanonymizationtool.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.anontmization.dataanonymizationtool.dto.ControllerDto;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final ControllerDataBaseService controllerService;

    @GetMapping("")
    public String getSettings(){
        return controllerService.toString();
    }

    @PostMapping("")
    public void setSettings(@RequestBody ControllerDto request){
        controllerService.setUrl(request.getUrl());
        controllerService.setNameDB(request.getNameDB());
        controllerService.setUserName(request.getUser());
        controllerService.setPassword(request.getPassword());
    }
}
