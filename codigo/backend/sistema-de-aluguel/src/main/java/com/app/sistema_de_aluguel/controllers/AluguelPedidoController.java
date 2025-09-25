package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.dto.AluguelPedidoDTO;
import com.app.sistema_de_aluguel.dto.AluguelPedidoFormDTO;
import com.app.sistema_de_aluguel.enums.AluguelPedidoStatus;
import com.app.sistema_de_aluguel.services.AluguelPedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alugueis")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AluguelPedidoController {
    private final AluguelPedidoService aluguelPedidoService;

    @GetMapping
    public ResponseEntity<List<AluguelPedidoDTO>> getAll() {
        return ResponseEntity.ok(aluguelPedidoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AluguelPedidoDTO> getById(@PathVariable Long id) {
        return aluguelPedidoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AluguelPedidoDTO>> getByStatus(@PathVariable AluguelPedidoStatus status) {
        return ResponseEntity.ok(aluguelPedidoService.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<AluguelPedidoDTO> create(@RequestBody AluguelPedidoFormDTO formDTO) {
        return ResponseEntity.ok(aluguelPedidoService.create(formDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AluguelPedidoDTO> update(@PathVariable Long id, @RequestBody AluguelPedidoFormDTO formDTO) {
        Optional<AluguelPedidoDTO> updated = aluguelPedidoService.update(id, formDTO);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        aluguelPedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}