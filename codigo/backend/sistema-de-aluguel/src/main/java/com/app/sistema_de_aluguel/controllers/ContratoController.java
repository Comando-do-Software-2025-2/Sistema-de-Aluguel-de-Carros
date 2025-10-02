package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.dto.ContratoDTO;
import com.app.sistema_de_aluguel.dto.ContratoResponseDTO;
import com.app.sistema_de_aluguel.models.Aluguel.Contrato;
import com.app.sistema_de_aluguel.services.ContratoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contratos")
@RequiredArgsConstructor
public class ContratoController {
    private final ContratoService contratoService;

    @PostMapping
    public ResponseEntity<ContratoResponseDTO> createContrato(@RequestBody @Valid ContratoDTO contratoDTO) {
        Contrato novoContrato = contratoService.create(contratoDTO);
        ContratoResponseDTO responseDTO = contratoService.convertToDTO(novoContrato);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContratoResponseDTO> getContrato(@PathVariable Long id) {
        return contratoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contrato> updateContrato(@PathVariable Long id,
                                                   @RequestBody @Valid ContratoDTO contratoDTO) {
        Contrato contrato = contratoService.update(id, contratoDTO);
        return ResponseEntity.ok(contrato);
    }

    @GetMapping
    public ResponseEntity<List<Contrato>> getAllContratos() {
        return ResponseEntity.ok(contratoService.findAll());
    }
}
