package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.services.ContratoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contrato")
@RequiredArgsConstructor
public class ContratoController {
    private final ContratoService contratoService;
    
}
