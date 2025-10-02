package com.app.sistema_de_aluguel.controllers;

import com.app.sistema_de_aluguel.dto.LoginDTO;
import com.app.sistema_de_aluguel.dto.RegisterDTO;
import com.app.sistema_de_aluguel.dto.TokenDTO;
import com.app.sistema_de_aluguel.models.Usuarios.Cliente;
import com.app.sistema_de_aluguel.models.Usuarios.Usuario;
import com.app.sistema_de_aluguel.repositories.UsuarioRepository;
import com.app.sistema_de_aluguel.security.TokenService;
import com.app.sistema_de_aluguel.services.ClienteService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ClienteService clienteService;

    @Value("${api.security.token.secret}")
    private String secret;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO data, HttpServletResponse response) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getSenha());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            String token = tokenService.generateToken((Usuario) auth.getPrincipal());
            TokenDTO tokenDTO = new TokenDTO(token);

            //salva o token no cookie;
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .maxAge( 24 * 60 * 60)
                    .path("/")
                    .secure(false)
                    .sameSite(SameSiteCookies.STRICT.toString())
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.ok(new TokenDTO(token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
        if (this.usuarioRepository.findByEmail(data.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Um usuário com este e-mail já existe.");
        }

        Cliente novoCliente = new Cliente();
        novoCliente.setNome(data.getNome());
        novoCliente.setEmail(data.getEmail());
        novoCliente.setSenha(data.getSenha()); // A senha será criptografada pelo serviço
        novoCliente.setRg(data.getRg());
        novoCliente.setCpf(data.getCpf());
        novoCliente.setEndereco(data.getEndereco());
        novoCliente.setProfissao(data.getProfissao());

        Cliente clienteSalvo = clienteService.create(novoCliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteSalvo);
    }

}