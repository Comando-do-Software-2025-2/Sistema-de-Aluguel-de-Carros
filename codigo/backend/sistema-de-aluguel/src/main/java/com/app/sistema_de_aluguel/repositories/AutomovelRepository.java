package com.app.sistema_de_aluguel.repositories;

import com.app.sistema_de_aluguel.models.Aluguel.Automovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutomovelRepository extends JpaRepository<Automovel, Long> {
}