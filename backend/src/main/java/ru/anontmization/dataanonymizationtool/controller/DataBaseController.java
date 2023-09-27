package ru.anontmization.dataanonymizationtool.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

@RestController
@RequestMapping("/api/v1/tables")
@RequiredArgsConstructor
public class DataBaseController {
    private final ControllerDataBaseService controllerService;

    //получение имен таблиц
    //получение таблиц
    //...
    @GetMapping("/")
    public String getStatus(){
        return controllerService.getTableNames();
    }
}
