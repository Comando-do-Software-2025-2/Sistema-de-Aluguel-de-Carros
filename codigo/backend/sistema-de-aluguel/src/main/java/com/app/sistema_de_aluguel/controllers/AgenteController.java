package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.dto.AgenteDTO;
import com.app.sistema_de_aluguel.models.Usuarios.Agente;
import com.app.sistema_de_aluguel.services.AgenteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agentes")
@RequiredArgsConstructor
public class AgenteController {
    private final AgenteService agenteService;

    public ResponseEntity<HttpStatus> cadastrarAgente(@RequestBody @Valid AgenteDTO agenteDTO) {
        agenteService.cadastrar(agenteDTO);
        return ResponseEntity.ok().build();
    }
}
