package com.app.sistema_de_aluguel.dto;

import com.app.sistema_de_aluguel.enums.TipoAgente;
import com.app.sistema_de_aluguel.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.Set;

@Getter
@Setter
public class AgenteDTO extends UsuarioDTO {
    private String cnpj;
    private TipoAgente tipoAgente;
    private String cnaePrincipal;
    private String codigoDoBanco;
    private Set<Role> permissoes;

    public AgenteDTO(String senha, String email, String nome, String endereco, String cnpj, TipoAgente tipoAgente, String cnaePrincipal, String codigoDoBanco, Set<Role> permissoes) {
        super(senha, email, nome, endereco, null, null);
        this.cnpj = cnpj;
        this.tipoAgente = tipoAgente;
        this.cnaePrincipal = cnaePrincipal;
        this.codigoDoBanco = codigoDoBanco;
        this.permissoes = permissoes;
    }
}
