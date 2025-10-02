package com.app.sistema_de_aluguel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agentes")
@RequiredArgsConstructor
public class AgenteController {
    private final AgenteService agenteService;
}
