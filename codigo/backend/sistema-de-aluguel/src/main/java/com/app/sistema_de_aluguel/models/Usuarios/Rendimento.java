package com.app.sistema_de_aluguel.models.Usuarios;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Rendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entidadeEmpregadora;

    private BigDecimal valor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    public Rendimento(String entidadeEmpregadora, BigDecimal valor, Cliente cliente) {
        this.entidadeEmpregadora = entidadeEmpregadora;
        this.valor = valor;
        this.cliente = cliente;
    }
}
