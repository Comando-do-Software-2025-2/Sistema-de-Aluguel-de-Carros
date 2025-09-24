package com.app.sistema_de_aluguel.models.Usuarios;

import com.app.sistema_de_aluguel.models.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Set;


@Setter
@Getter
@Entity
@Table
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String senha;

    @Email
    private String email;

    @NotEmpty
    private String nome;

    @NotEmpty
    private String endereco;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> permissoes;

    @CreationTimestamp
    private Instant criadoEm;

    @UpdateTimestamp
    private Instant ultimaModificacao;


    public Usuario(String senha, String email, String nome, String endereco, Set<Role> permissoes) {
        this.senha = senha;
        this.email = email;
        this.nome = nome;
        this.endereco = endereco;
        this.permissoes = permissoes;
    }
}
