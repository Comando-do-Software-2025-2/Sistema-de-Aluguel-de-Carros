package com.app.sistema_de_aluguel.models.Aluguel;

import com.app.sistema_de_aluguel.enums.ContratoStatus;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table
@NoArgsConstructor
@Setter
@Getter
public class Contrato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "aluguel_id", referencedColumnName = "id")
    @NotNull
    private Aluguel aluguel;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contrato_de_credito_id", referencedColumnName = "id")
    @Nullable
    private ContratoDeCredito contratoDeCredito;

    @NotNull
    private LocalDate dataInicio;
    @NotNull
    private LocalDate dataFim;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ContratoStatus status;

    public Contrato(Aluguel aluguel, ContratoDeCredito contratoDeCredito, LocalDate dataInicio, LocalDate dataFim) {
        this.aluguel = aluguel;
        this.contratoDeCredito = contratoDeCredito;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = ContratoStatus.ATIVO;
    }

    public Contrato(Aluguel aluguel, LocalDate dataInicio, LocalDate dataFim) {
        this.aluguel = aluguel;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = ContratoStatus.ATIVO;
    }
}
