package ru.anontmization.dataanonymizationtool.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.anontmization.dataanonymizationtool.dto.DataPreparationDto;
import ru.anontmization.dataanonymizationtool.dto.StatisticResponseDto;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;
import ru.anontmization.dataanonymizationtool.services.DataPreparationService;
import ru.anontmization.dataanonymizationtool.services.DepersonalizationService;
import ru.anontmization.dataanonymizationtool.services.StatisticService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mask")
@RequiredArgsConstructor
@CrossOrigin
public class DepersonalizationController {

    private final DepersonalizationService service;
    private final DataPreparationService dataPreparationService;
    private final StatisticService statisticService;
    private final ControllerDataBaseService controllerService;

    @GetMapping("/methods")
    public String getAllMethods() {
        return service.getMethods();
    }

    @PostMapping("/config")
    public void setConfig(@RequestBody String request) {
        service.setConfig(request);
    }

    @PostMapping("/config/preparation")
    public void setConfigPreparation(@RequestBody List<DataPreparationDto> request) {
        dataPreparationService.setConfig(request);
    }

    @GetMapping("/start")
    public String startMasking() {
        if (controllerService.checkConnection()) {
            return service.start();
        }
        return "{\"error\" : \"connection\"}";
    }

    @GetMapping("/clear")
    public void clearMasking() {
        service.clear();
    }

    @GetMapping("/status")
    public String getStatus() {
        return service.getStatus();
    }

    @GetMapping("/statistic")
    public StatisticResponseDto getStatistic() {
        return statisticService.getStatistic();
    }

    @GetMapping("/check")
    public boolean checkStatus() {
        return controllerService.checkConnection();
    }
}
