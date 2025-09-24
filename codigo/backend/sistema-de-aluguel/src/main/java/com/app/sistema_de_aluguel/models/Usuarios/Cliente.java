package com.app.sistema_de_aluguel.models.Usuarios;

import com.app.sistema_de_aluguel.models.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table
@Setter
@Getter
@NoArgsConstructor
public class Cliente extends Usuario {

    private String rg;

    private String cpf;

    private String profissao;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rendimento> rendimentos;

    public Cliente(String senha, String email, String nome, String endereco, Set<Role> permissoes, String rg, String cpf, String profissao, List<Rendimento> rendimentos) {
        super(senha, email, nome, endereco, permissoes);
        this.rg = rg;
        this.cpf = cpf;
        this.profissao = profissao;
        this.rendimentos = rendimentos;
    }
}
