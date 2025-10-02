package com.app.sistema_de_aluguel.dto;

import com.app.sistema_de_aluguel.models.Aluguel.Aluguel;
import com.app.sistema_de_aluguel.models.Aluguel.ContratoDeCredito;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private Aluguel pedido;
    @Nullable
    private ContratoDeCredito contratoDeCredito;
    @NotNull
    private LocalDate dataInicio;
    @NotNull
    private LocalDate dataFim;
}
