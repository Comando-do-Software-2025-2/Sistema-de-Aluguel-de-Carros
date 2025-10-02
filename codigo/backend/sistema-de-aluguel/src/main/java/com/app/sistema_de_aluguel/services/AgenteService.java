package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.AgenteDTO;
import com.app.sistema_de_aluguel.models.Usuarios.Agente;
import com.app.sistema_de_aluguel.repositories.AgenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgenteService {
    private final AgenteRepository agenteRepository;

    public void cadastrar(AgenteDTO dto) {

        agenteRepository.save(agente);
    }
}
