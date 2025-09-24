package com.app.sistema_de_aluguel.repositories;

import com.app.sistema_de_aluguel.models.Usuarios.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository  extends JpaRepository<Cliente, Long> {
}
