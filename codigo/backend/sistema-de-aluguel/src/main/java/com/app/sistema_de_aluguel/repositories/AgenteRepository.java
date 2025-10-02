package com.app.sistema_de_aluguel.repositories;

import com.app.sistema_de_aluguel.models.Usuarios.Agente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgenteRepository extends JpaRepository<Agente, Long> {
}
