package com.app.sistema_de_aluguel.models;

import com.app.sistema_de_aluguel.enums.Permissoes;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table
@NoArgsConstructor
@Setter
@Getter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Exemplo: ADMIN, USER

    @ElementCollection(targetClass = Permissoes.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "role_permissions", joinColumns = @JoinColumn(name = "role_id"))
    @Column(name = "permission") // deixei singular para ficar mais semântico
    @Enumerated(EnumType.STRING)
    private Set<Permissoes> permissions;
}
