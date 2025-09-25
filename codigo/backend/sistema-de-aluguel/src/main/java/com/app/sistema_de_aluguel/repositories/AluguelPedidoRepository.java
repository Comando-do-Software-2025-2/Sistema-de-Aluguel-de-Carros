package com.app.sistema_de_aluguel.repositories;

import com.app.sistema_de_aluguel.enums.AluguelPedidoStatus;
import com.app.sistema_de_aluguel.models.Aluguel.AluguelPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AluguelPedidoRepository extends JpaRepository<AluguelPedido, Long> {
    List<AluguelPedido> findByStatus(AluguelPedidoStatus status);
    List<AluguelPedido> findByClienteId(Long clienteId);
    List<AluguelPedido> findByAutomovelId(Long automovelId);
}