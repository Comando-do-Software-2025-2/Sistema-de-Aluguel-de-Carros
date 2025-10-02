package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.AgenteDTO;
import com.app.sistema_de_aluguel.enums.AluguelStatus;
import com.app.sistema_de_aluguel.models.Aluguel.Aluguel;
import com.app.sistema_de_aluguel.models.Usuarios.Agente;
import com.app.sistema_de_aluguel.models.Usuarios.Banco;
import com.app.sistema_de_aluguel.models.Usuarios.Empresa;
import com.app.sistema_de_aluguel.repositories.AgenteRepository;
import com.app.sistema_de_aluguel.repositories.AluguelRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgenteService {
    private final AgenteRepository agenteRepository;
    private final AluguelRepository aluguelRepository;
    private final PasswordEncoder passwordEncoder;


    public Agente cadastrar(AgenteDTO dto) {
        String senhaCriptografada = passwordEncoder.encode(dto.getSenha());
        Agente agente;

        switch (dto.getTipoAgente()) {
            case BANCO:
                agente = new Banco(
                        senhaCriptografada,
                        dto.getEmail(),
                        dto.getNome(),
                        dto.getEndereco(),
                        dto.getPermissoes(),
                        dto.getCnpj(),
                        dto.getCodigoDoBanco()
                );
                break;
            case EMPRESA:
                agente = new Empresa(
                );
                break;
            default:
                throw new IllegalArgumentException("Tipo de agente inválido: " + dto.getTipoAgente());
        }

        return agenteRepository.save(agente);
    }

    public void aprovar(Long aluguelId) {
        Aluguel aluguel = aluguelRepository.findById(aluguelId)
                .orElseThrow(() -> new EntityNotFoundException("Pedido de aluguel não encontrado com o id: " + aluguelId));

        aluguel.setStatus(AluguelStatus.APROVADO);
        aluguelRepository.save(aluguel);
    }

    public void rejeitar(Long aluguelId) {
        Aluguel aluguel = aluguelRepository.findById(aluguelId)
                .orElseThrow(() -> new EntityNotFoundException("Pedido de aluguel não encontrado com o id: " + aluguelId));

        aluguel.setStatus(AluguelStatus.REJEITADO);
        aluguelRepository.save(aluguel);
    }
}
