package com.app.sistema_de_aluguel.models.Aluguel;

import com.app.sistema_de_aluguel.enums.PedidoActions;
import com.app.sistema_de_aluguel.models.Usuarios.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class PedidosHistorico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PedidoActions action;

    @ManyToOne(optional = false)
    @JoinColumn(name = "actor_id", nullable = false, referencedColumnName = "id")
    private Usuario actor;

    @CreationTimestamp
    private Instant timestamp;

    public PedidosHistorico(PedidoActions action, Usuario actor) {
        this.action = action;
        this.actor = actor;
    }
}
