package com.app.sistema_de_aluguel.models.Usuarios;

import com.app.sistema_de_aluguel.models.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table
@Setter
@Getter
@NoArgsConstructor
public class Banco extends Agente{
    public String codigoDoBanco;

    public Banco(String senha, String email, String nome, String endereco, Set<Role> permissoes, String cnpj, String codigoDoBanco) {
        super(senha, email, nome, endereco, permissoes, cnpj);
        this.codigoDoBanco = codigoDoBanco;
    }
}
