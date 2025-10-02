package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.dto.ContratoDTO;
import com.app.sistema_de_aluguel.services.ContratoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contrato")
@RequiredArgsConstructor
public class ContratoController {
    private final ContratoService contratoService;

    @PostMapping
    public ResponseEntity<HttpStatus> createContrato(@RequestBody @Valid ContratoDTO contratoDTO) {
        contratoService.create(contratoDTO);
        return ResponseEntity.ok().build();
    }

}
