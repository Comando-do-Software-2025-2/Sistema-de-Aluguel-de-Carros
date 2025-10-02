package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.AluguelDTO;
import com.app.sistema_de_aluguel.dto.AluguelFormDTO;
import com.app.sistema_de_aluguel.dto.AutomovelDTO;
import com.app.sistema_de_aluguel.dto.ClienteSimpleDTO;
import com.app.sistema_de_aluguel.enums.AluguelStatus;
import com.app.sistema_de_aluguel.models.Aluguel.Aluguel;
import com.app.sistema_de_aluguel.models.Aluguel.Automovel;
import com.app.sistema_de_aluguel.models.Usuarios.Cliente;
import com.app.sistema_de_aluguel.repositories.AluguelRepository;
import com.app.sistema_de_aluguel.repositories.AutomovelRepository;
import com.app.sistema_de_aluguel.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AluguelService {
    private final AluguelRepository aluguelRepository;
    private final ClienteRepository clienteRepository;
    private final AutomovelRepository automovelRepository;
    
    public List<AluguelDTO> findAll() {
        return aluguelRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<AluguelDTO> findById(Long id) {
        return aluguelRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<AluguelDTO> findByStatus(AluguelStatus status) {
        return aluguelRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AluguelDTO create(AluguelFormDTO formDTO) {
        Cliente cliente = clienteRepository.findById(formDTO.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        
        Automovel automovel = automovelRepository.findById(formDTO.getAutomovelId())
                .orElseThrow(() -> new RuntimeException("Automóvel não encontrado"));

        Aluguel aluguel = new Aluguel(cliente, automovel, formDTO.getStatus());
        Aluguel savedPedido = aluguelRepository.save(aluguel);
        
        return convertToDTO(savedPedido);
    }

    public Optional<AluguelDTO> update(Long id, AluguelFormDTO formDTO) {
        return aluguelRepository.findById(id)
                .map(pedido -> {
                    if (formDTO.getClienteId() != null) {
                        Cliente cliente = clienteRepository.findById(formDTO.getClienteId())
                                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
                        pedido.setCliente(cliente);
                    }
                    
                    if (formDTO.getAutomovelId() != null) {
                        Automovel automovel = automovelRepository.findById(formDTO.getAutomovelId())
                                .orElseThrow(() -> new RuntimeException("Automóvel não encontrado"));
                        pedido.setAutomovel(automovel);
                    }
                    
                    if (formDTO.getStatus() != null) {
                        pedido.setStatus(formDTO.getStatus());
                    }
                    
                    return convertToDTO(aluguelRepository.save(pedido));
                });
    }

    public void delete(Long id) {
        aluguelRepository.deleteById(id);
    }

    private AluguelDTO convertToDTO(Aluguel pedido) {
        AluguelDTO dto = new AluguelDTO();
        dto.setId(pedido.getId());
        dto.setStatus(pedido.getStatus());
        dto.setCreatedAt(pedido.getCreatedAt());
        dto.setUpdatedAt(pedido.getUpdatedAt());
        
        // Converter Cliente
        if (pedido.getCliente() != null) {
            ClienteSimpleDTO clienteDTO = new ClienteSimpleDTO();
            clienteDTO.setId(pedido.getCliente().getId());
            clienteDTO.setNome(pedido.getCliente().getNome());
            clienteDTO.setRg(pedido.getCliente().getRg());
            clienteDTO.setCpf(pedido.getCliente().getCpf());
            clienteDTO.setEndereco(pedido.getCliente().getEndereco());
            clienteDTO.setProfissao(pedido.getCliente().getProfissao());
            dto.setCliente(clienteDTO);
        }
        
        // Converter Automovel
        if (pedido.getAutomovel() != null) {
            AutomovelDTO automovelDTO = new AutomovelDTO();
            automovelDTO.setId(pedido.getAutomovel().getId());
            automovelDTO.setMatricula(pedido.getAutomovel().getMatricula());
            automovelDTO.setAno(pedido.getAutomovel().getAno().getValue());
            automovelDTO.setMarca(pedido.getAutomovel().getMarca());
            automovelDTO.setModelo(pedido.getAutomovel().getModelo());
            automovelDTO.setPlaca(pedido.getAutomovel().getPlaca());
            dto.setAutomovel(automovelDTO);
        }
        
        // Converter Contrato se existir
        if (pedido.getContrato() != null) {
            dto.setContratoId(pedido.getContrato().getId());
        }
        
        return dto;
    }

}