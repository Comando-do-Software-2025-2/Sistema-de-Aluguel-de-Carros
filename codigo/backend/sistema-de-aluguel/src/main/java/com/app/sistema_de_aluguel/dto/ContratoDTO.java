package com.app.sistema_de_aluguel.dto;

import com.app.sistema_de_aluguel.models.Aluguel.Aluguel;
import com.app.sistema_de_aluguel.models.Aluguel.ContratoDeCredito;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContratoDTO {
    private Aluguel pedido;
    private ContratoDeCredito contratoDeCredito;
    private LocalDate dataInicio;
    private LocalDate dataFim;
}
