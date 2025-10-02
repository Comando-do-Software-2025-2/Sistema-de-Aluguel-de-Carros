package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.*;
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

    public Contrato create(ContratoDTO contratoDTO) {
        Aluguel aluguel = aluguelRepository.findById(contratoDTO.getIdAluguel())
                .orElseThrow(() -> new EntityNotFoundException("Pedido de aluguel não encontrado"));

        Contrato contrato = new Contrato(aluguel,
                contratoDTO.getContratoDeCredito(),
                contratoDTO.getDataInicio(),
                contratoDTO.getDataFim());
        return contratoRepository.save(contrato);
    }

    public Optional<ContratoResponseDTO> findById(Long id) {
        return contratoRepository.findById(id).map(this::convertToDTO);
    }

    public ContratoResponseDTO convertToDTO(Contrato contrato) {
        ContratoResponseDTO dto = new ContratoResponseDTO();
        dto.setId(contrato.getId());
        dto.setDataInicio(contrato.getDataInicio());
        dto.setDataFim(contrato.getDataFim());
        dto.setStatus(contrato.getStatus());

        if (contrato.getAluguel() != null) {
            dto.setPedido(convertToAluguelDTO(contrato.getAluguel()));
        }

        if (contrato.getContratoDeCredito() != null) {
            dto.setContratoDeCreditoId(contrato.getContratoDeCredito().getId());
        }

        return dto;
    }

    private AluguelDTO convertToAluguelDTO(Aluguel pedido) {
        AluguelDTO dto = new AluguelDTO();
        dto.setId(pedido.getId());
        dto.setStatus(pedido.getStatus());
        dto.setCreatedAt(pedido.getCreatedAt());
        dto.setUpdatedAt(pedido.getUpdatedAt());

        if (pedido.getCliente() != null) {
            ClienteSimpleDTO clienteDTO = new ClienteSimpleDTO();
            clienteDTO.setId(pedido.getCliente().getId());
            clienteDTO.setNome(pedido.getCliente().getNome());
            clienteDTO.setCpf(pedido.getCliente().getCpf());
            dto.setCliente(clienteDTO);
        }

        if (pedido.getAutomovel() != null) {
            AutomovelDTO automovelDTO = new AutomovelDTO();
            automovelDTO.setMarca(pedido.getAutomovel().getMarca());
            automovelDTO.setModelo(pedido.getAutomovel().getModelo());
            automovelDTO.setPlaca(pedido.getAutomovel().getPlaca());
            dto.setAutomovel(automovelDTO);
        }

        return dto;
    }

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
