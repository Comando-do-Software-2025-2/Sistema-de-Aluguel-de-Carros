package com.app.sistema_de_aluguel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
public class UsuarioDTO {
    @NotEmpty
    protected String senha;

    @Email
    protected String email;

    @NotEmpty
    protected String nome;

    @NotEmpty
    protected String endereco;

    @CreationTimestamp
    protected Instant criadoEm;

    @UpdateTimestamp
    protected Instant ultimaModificacao;
}
