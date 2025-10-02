package com.app.sistema_de_aluguel.dto;

import com.app.sistema_de_aluguel.enums.ContratoStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ContratoResponseDTO {
    private Long id;
    private AluguelDTO pedido;
    private Long contratoDeCreditoId;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private ContratoStatus status;
}