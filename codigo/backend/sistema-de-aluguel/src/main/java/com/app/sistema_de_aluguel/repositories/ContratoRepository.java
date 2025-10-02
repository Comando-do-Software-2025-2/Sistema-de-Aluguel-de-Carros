package com.app.sistema_de_aluguel.repositories;

import com.app.sistema_de_aluguel.models.Aluguel.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContratoRepository extends JpaRepository<Contrato, Long> {
}
