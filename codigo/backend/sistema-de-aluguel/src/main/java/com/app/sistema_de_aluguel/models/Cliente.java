package com.app.sistema_de_aluguel.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(max = 100, message = "O limite maximo de caracteres e 100")
    private String nome;

    @Column(unique = true, nullable = false)
    private String rg;

    @Column(unique = true, nullable = false)
    private String cpf;

    @Size(max = 255, message = "O limite maximo de caracteres e 255.")
    private String endereco;

    private String profissao;

    public Cliente() {}
}
