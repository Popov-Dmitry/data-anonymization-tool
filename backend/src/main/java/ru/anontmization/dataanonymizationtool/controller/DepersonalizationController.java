package ru.anontmization.dataanonymizationtool.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.anontmization.dataanonymizationtool.Methods.options.type.Shuffle;
import ru.anontmization.dataanonymizationtool.Methods.options.type.ValueReplacement;
import ru.anontmization.dataanonymizationtool.dto.mask.ShuffleDto;
import ru.anontmization.dataanonymizationtool.dto.mask.ValueReplacementDto;
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

    @GetMapping("/method/Shuffle")
    public void setShuffle(@RequestBody ShuffleDto request){
        service.addMethod(request.getId(), new Shuffle(request.getNameTable(), request.getNamesColumn()));
    }

    @GetMapping("/method/ValueReplacement")
    public void setValueReplacement(@RequestBody ValueReplacementDto request){
        service.addMethod(request.getId(), new ValueReplacement(request.getNameTable(), request.getNameColumn(), request.getValue()));
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
