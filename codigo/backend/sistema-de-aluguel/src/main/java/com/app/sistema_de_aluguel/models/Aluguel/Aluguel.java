package com.app.sistema_de_aluguel.models.Aluguel;

import com.app.sistema_de_aluguel.enums.AluguelStatus;
import com.app.sistema_de_aluguel.models.Usuarios.Cliente;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class Aluguel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "automovel_id", nullable = false)
    private Automovel automovel;

    @OneToOne
    @JoinColumn(name = "contrato_id", referencedColumnName = "id", nullable = true)
    private Contrato contrato;

    @Enumerated(EnumType.STRING)
    private AluguelStatus status;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public Aluguel() {}

    public Aluguel(Cliente cliente, Automovel automovel, AluguelStatus status) {
        this.cliente = cliente;
        this.automovel = automovel;
        this.contrato = null;
        this.status = status;
    }
}
