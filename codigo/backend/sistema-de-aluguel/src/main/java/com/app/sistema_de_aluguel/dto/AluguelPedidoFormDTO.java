package com.app.sistema_de_aluguel.dto;

import com.app.sistema_de_aluguel.enums.AluguelPedidoStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AluguelPedidoFormDTO {
    private Long clienteId;
    private Long automovelId;
    private AluguelPedidoStatus status;
}