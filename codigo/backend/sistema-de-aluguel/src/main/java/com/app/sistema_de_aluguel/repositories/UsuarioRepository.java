package com.app.sistema_de_aluguel.repositories;

import com.app.sistema_de_aluguel.models.Usuarios.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByEmail(String email);
}
