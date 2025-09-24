package com.app.sistema_de_aluguel.models.Usuarios;

import com.app.sistema_de_aluguel.models.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;


@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Agente extends Usuario {
    @Column(unique = true)
    private String cnpj;

    public Agente(String senha, String email, String nome, String endereco, Set<Role> permissoes, String cnpj) {
        super(senha, email, nome, endereco, permissoes);
        this.cnpj = cnpj;
    }
}
