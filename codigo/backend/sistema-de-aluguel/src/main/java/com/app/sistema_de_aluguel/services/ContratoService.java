package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.ContratoDTO;
import com.app.sistema_de_aluguel.models.Aluguel.Contrato;
import com.app.sistema_de_aluguel.repositories.ContratoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Contrato> findById(Long id) { return contratoRepository.findById(id);}

    public Contrato update(Long id, ContratoDTO dto) {
        if (findById(id).isEmpty()) { throw new EntityNotFoundException("Contrato não encontrado."); }
        return new Contrato(dto.getPedido(), dto.getContratoDeCredito(),
                dto.getDataInicio(), dto.getDataFim());
    }

    public List<Contrato> findAll() {
        if (contratoRepository.findAll().isEmpty()) { throw new EntityNotFoundException("Não há contratos."); }
        return contratoRepository.findAll();
    }
}
