package com.app.sistema_de_aluguel.models.Aluguel;

import com.app.sistema_de_aluguel.models.Usuarios.Banco;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table
@NoArgsConstructor
@Setter
@Getter
public class ContratoDeCredito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contrato_aluguel_id", referencedColumnName = "id")
    private Contrato contratoDeAluguel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "banco_id", nullable = false)
    private Banco bancoConcessor;

    @Min(0)
    private BigDecimal valorFinanciado;

    @Min(1)
    private int numeroDeParcelas;

    public ContratoDeCredito(Contrato contratoDeAluguel, Banco bancoConcessor, BigDecimal valorFinanciado, int numeroDeParcelas) {
        this.contratoDeAluguel = contratoDeAluguel;
        this.bancoConcessor = bancoConcessor;
        this.valorFinanciado = valorFinanciado;
        this.numeroDeParcelas = numeroDeParcelas;
    }
}
