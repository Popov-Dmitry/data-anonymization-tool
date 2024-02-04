package ru.anontmization.dataanonymizationtool.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tables")
@RequiredArgsConstructor
@CrossOrigin
public class DataBaseController {
    private final ControllerDataBaseService controllerService;

    @GetMapping("")
    public List<String> getTables(){
        return controllerService.getTableNames();
    }

    @GetMapping("/columns/{name}")
    public List<String> getColumns(@PathVariable String name){
        return controllerService.getColumnNames(name);
    }

    @GetMapping("/{name}")
    public String getTable(@PathVariable String name){
        return controllerService.getTable(name);
    }
}
