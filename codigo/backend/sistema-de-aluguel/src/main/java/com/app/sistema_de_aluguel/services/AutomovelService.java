package com.app.sistema_de_aluguel.services;

import com.app.sistema_de_aluguel.dto.AutomovelDTO;
import com.app.sistema_de_aluguel.models.Aluguel.Automovel;
import com.app.sistema_de_aluguel.repositories.AutomovelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AutomovelService {
    private final AutomovelRepository automovelRepository;
    
    public List<AutomovelDTO> findAll() {
        return automovelRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<AutomovelDTO> findById(Long id) {
        return automovelRepository.findById(id)
                .map(this::convertToDTO);
    }

    public AutomovelDTO create(AutomovelDTO automovelDTO) {
        Automovel automovel = convertToEntity(automovelDTO);
        Automovel savedAutomovel = automovelRepository.save(automovel);
        return convertToDTO(savedAutomovel);
    }

    public Optional<AutomovelDTO> update(Long id, AutomovelDTO automovelDTO) {
        return automovelRepository.findById(id)
                .map(automovel -> {
                    automovel.setMatricula(automovelDTO.getMatricula());
                    automovel.setAno(Year.of(automovelDTO.getAno()));
                    automovel.setMarca(automovelDTO.getMarca());
                    automovel.setModelo(automovelDTO.getModelo());
                    automovel.setPlaca(automovelDTO.getPlaca());
                    return convertToDTO(automovelRepository.save(automovel));
                });
    }

    public void delete(Long id) {
        automovelRepository.deleteById(id);
    }

    private AutomovelDTO convertToDTO(Automovel automovel) {
        AutomovelDTO dto = new AutomovelDTO();
        dto.setMatricula(automovel.getMatricula());
        dto.setAno(automovel.getAno().getValue());
        dto.setMarca(automovel.getMarca());
        dto.setModelo(automovel.getModelo());
        dto.setPlaca(automovel.getPlaca());
        return dto;
    }

    private Automovel convertToEntity(AutomovelDTO dto) {
        Automovel automovel = new Automovel();
        automovel.setMatricula(dto.getMatricula());
        automovel.setAno(Year.of(dto.getAno()));
        automovel.setMarca(dto.getMarca());
        automovel.setModelo(dto.getModelo());
        automovel.setPlaca(dto.getPlaca());
        return automovel;
    }
}