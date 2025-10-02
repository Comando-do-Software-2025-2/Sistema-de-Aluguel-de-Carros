package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.ContratoDTO;
import com.app.sistema_de_aluguel.models.Aluguel.Contrato;
import com.app.sistema_de_aluguel.repositories.ContratoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContratoService {
    private final ContratoRepository contratoRepository;

    public void create(ContratoDTO contratoDTO) {
        Contrato contrato = new Contrato(contratoDTO.getPedido(),
                contratoDTO.getContratoDeCredito(),
                contratoDTO.getDataFim(),
                contratoDTO.getDataFim());
        contratoRepository.save(contrato);
    }
}
