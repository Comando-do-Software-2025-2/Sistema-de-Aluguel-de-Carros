package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.dto.AutomovelDTO;
import com.app.sistema_de_aluguel.services.AutomovelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/veiculos")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AutomovelController {
    private final AutomovelService automovelService;

    @GetMapping
    public ResponseEntity<List<AutomovelDTO>> getAll() {
        return ResponseEntity.ok(automovelService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AutomovelDTO> getById(@PathVariable Long id) {
        return automovelService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AutomovelDTO> create(@RequestBody AutomovelDTO automovel) {
        return ResponseEntity.ok(automovelService.create(automovel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AutomovelDTO> update(@PathVariable Long id, @RequestBody AutomovelDTO automovelAtualizado) {
        Optional<AutomovelDTO> updated = automovelService.update(id, automovelAtualizado);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        automovelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}