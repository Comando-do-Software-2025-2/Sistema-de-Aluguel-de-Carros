package com.app.sistema_de_aluguel.models.Aluguel;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Year;

@Entity
@Table
@NoArgsConstructor
@Setter
@Getter
public class Automovel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String matricula;

    @PastOrPresent
    private Year ano;

    @NotEmpty
    private String marca;

    @NotEmpty
    private String modelo;

    @NotEmpty
    private String placa;

    public Automovel(String matricula, Year ano, String marca, String modelo, String placa) {
        this.matricula = matricula;
        this.ano = ano;
        this.marca = marca;
        this.modelo = modelo;
        this.placa = placa;
    }
}
