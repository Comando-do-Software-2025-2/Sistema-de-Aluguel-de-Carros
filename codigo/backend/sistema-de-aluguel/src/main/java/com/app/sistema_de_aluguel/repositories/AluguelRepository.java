package com.app.sistema_de_aluguel.repositories;

import com.app.sistema_de_aluguel.enums.AluguelStatus;
import com.app.sistema_de_aluguel.models.Aluguel.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
    List<Aluguel> findByStatus(AluguelStatus status);
    List<Aluguel> findByClienteId(Long clienteId);
    List<Aluguel> findByAutomovelId(Long automovelId);
}