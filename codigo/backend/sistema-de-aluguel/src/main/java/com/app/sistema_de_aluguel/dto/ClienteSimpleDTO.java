package com.app.sistema_de_aluguel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteSimpleDTO {
    private Long id;
    private String nome;
    private String rg;
    private String cpf;
    private String endereco;
    private String profissao;
    private String senha;
}