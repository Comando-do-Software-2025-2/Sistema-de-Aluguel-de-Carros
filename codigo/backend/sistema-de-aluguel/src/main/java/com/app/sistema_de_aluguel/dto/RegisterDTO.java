package com.app.sistema_de_aluguel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
    @NotEmpty
    private String nome;

    @Email
    @NotEmpty
    private String email;

    @NotEmpty
    private String senha;

    @NotEmpty
    private String rg;

    @NotEmpty
    private String cpf;

    @NotEmpty
    private String endereco;

    private String profissao;
}