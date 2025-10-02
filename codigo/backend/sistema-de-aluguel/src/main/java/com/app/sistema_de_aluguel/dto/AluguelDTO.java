package com.app.sistema_de_aluguel.dto;

import com.app.sistema_de_aluguel.enums.AluguelStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AluguelDTO {
    private Long id;
    private ClienteSimpleDTO cliente;
    private AutomovelDTO automovel;
    private AluguelStatus status;
    private Instant createdAt;
    private Instant updatedAt;
    private Long contratoId;
}