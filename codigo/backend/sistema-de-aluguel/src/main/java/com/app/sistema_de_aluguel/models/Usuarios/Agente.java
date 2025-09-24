package com.app.sistema_de_aluguel.models.Usuarios;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Agente extends Usuario {
    @Column(unique = true)
    private String cnpj;
}
