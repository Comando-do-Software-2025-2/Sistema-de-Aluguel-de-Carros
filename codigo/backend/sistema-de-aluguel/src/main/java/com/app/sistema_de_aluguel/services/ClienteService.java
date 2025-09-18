package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.models.Cliente;
import com.app.sistema_de_aluguel.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepository;
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente create(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> update(Long id, Cliente clienteAtualizado) {
        return clienteRepository.findById(id)
                .map(cliente -> {
                    cliente.setNome(clienteAtualizado.getNome());
                    cliente.setRg(clienteAtualizado.getRg());
                    cliente.setCpf(clienteAtualizado.getCpf());
                    cliente.setEndereco(clienteAtualizado.getEndereco());
                    cliente.setProfissao(clienteAtualizado.getProfissao());
                    return clienteRepository.save(cliente);
                });
    }

    public void delete(Long id) {
        clienteRepository.deleteById(id);
    }
}
