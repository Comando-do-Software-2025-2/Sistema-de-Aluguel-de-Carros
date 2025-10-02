package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.dto.AluguelDTO;
import com.app.sistema_de_aluguel.dto.AluguelFormDTO;
import com.app.sistema_de_aluguel.enums.AluguelStatus;
import com.app.sistema_de_aluguel.services.AgenteService;
import com.app.sistema_de_aluguel.services.AluguelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alugueis")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AluguelController {
    private final AluguelService aluguelService;
    private final AgenteService agenteService;

    @GetMapping
    public ResponseEntity<List<AluguelDTO>> getAll() {
        return ResponseEntity.ok(aluguelService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AluguelDTO> getById(@PathVariable Long id) {
        return aluguelService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AluguelDTO>> getByStatus(@PathVariable AluguelStatus status) {
        return ResponseEntity.ok(aluguelService.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<AluguelDTO> create(@RequestBody AluguelFormDTO formDTO) {
        return ResponseEntity.ok(aluguelService.create(formDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AluguelDTO> update(@PathVariable Long id, @RequestBody AluguelFormDTO formDTO) {
        Optional<AluguelDTO> updated = aluguelService.update(id, formDTO);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        aluguelService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/aprovar")
    public ResponseEntity<HttpStatus> aprovar(@PathVariable Long id) {
        agenteService.aprovar(id);
        return ResponseEntity.ok().build();
    }

}