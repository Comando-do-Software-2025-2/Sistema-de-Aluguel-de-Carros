package com.app.sistema_de_aluguel.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutomovelDTO {
    private Long id;
    private String matricula;
    private Integer ano;
    private String marca;
    private String modelo;
    private String placa;
}