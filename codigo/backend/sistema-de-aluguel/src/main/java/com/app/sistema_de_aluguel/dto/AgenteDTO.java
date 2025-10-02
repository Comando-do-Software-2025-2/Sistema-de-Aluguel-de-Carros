package com.app.sistema_de_aluguel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class AgenteDTO extends UsuarioDTO {
    private String cnpj;

    public AgenteDTO(String senha, String email, String nome, String endereco, Instant criadoEm, Instant ultimaModificacao) {
        super(senha, email, nome, endereco, criadoEm, ultimaModificacao);
    }
}
