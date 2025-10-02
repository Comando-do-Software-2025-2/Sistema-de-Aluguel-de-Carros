package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.ContratoDTO;
import com.app.sistema_de_aluguel.models.Aluguel.Aluguel;
import com.app.sistema_de_aluguel.models.Aluguel.Contrato;
import com.app.sistema_de_aluguel.repositories.AluguelRepository;
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
    private final AluguelRepository aluguelRepository;

    public void create(ContratoDTO dto) {
        Aluguel aluguel = aluguelRepository.findById(dto.getIdAluguel()).get();
        Contrato contrato = new Contrato(aluguel,
                dto.getContratoDeCredito(),
                dto.getDataInicio(),
                dto.getDataFim());
        contratoRepository.save(contrato);
    }

    public Optional<Contrato> findById(Long id) { return contratoRepository.findById(id);}

    public Contrato update(Long id, ContratoDTO dto) {
        if (findById(id).isEmpty()) { throw new EntityNotFoundException("Contrato não encontrado."); }
        Aluguel aluguel = aluguelRepository.findById(dto.getIdAluguel()).get();
        return new Contrato(aluguel, dto.getContratoDeCredito(),
                dto.getDataInicio(), dto.getDataFim());
    }

    public List<Contrato> findAll() {
        if (contratoRepository.findAll().isEmpty()) { throw new EntityNotFoundException("Não há contratos."); }
        return contratoRepository.findAll();
    }
}
