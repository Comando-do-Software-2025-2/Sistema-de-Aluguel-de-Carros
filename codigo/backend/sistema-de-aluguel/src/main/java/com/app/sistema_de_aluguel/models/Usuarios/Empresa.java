package com.app.sistema_de_aluguel.models.Usuarios;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Setter
@Getter
@NoArgsConstructor
public class Empresa extends Agente {
    private String cnaePrincipal;

    public Empresa(String cnaePrincipal){
        this.cnaePrincipal = cnaePrincipal;
    }
}
