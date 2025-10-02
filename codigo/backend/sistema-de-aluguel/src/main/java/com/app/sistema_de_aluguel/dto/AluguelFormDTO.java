package com.app.sistema_de_aluguel.dto;

import com.app.sistema_de_aluguel.enums.AluguelStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AluguelFormDTO {
    private Long clienteId;
    private Long automovelId;
    private AluguelStatus status;
}