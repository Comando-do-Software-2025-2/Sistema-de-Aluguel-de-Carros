package com.app.sistema_de_aluguel.models.Usuarios;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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

}
