// Datos para los ejemplos
const standardsData = {
    classes: [
        {
            title: "Clases Principales",
            good: "class UserAccount {}",
            bad: "class user_account {}",
            description: "Usar PascalCase y nombres sustantivos"
        },
        {
            title: "Clases de Servicio",
            good: "class AuthService {}",
            bad: "class auth_helper {}",
            description: "Sufijo 'Service' para clases de lógica de negocio"
        },
        {
            title: "Clases de Utilidad",
            good: "class StringUtils {}",
            bad: "class stringTools {}",
            description: "Sufijo 'Utils' para clases de utilidad"
        }
    ],
    methods: [
        {
            title: "Métodos Públicos",
            good: "getUserProfile() {}",
            bad: "fetch_user() {}",
            description: "camelCase con verbo descriptivo"
        },
        {
            title: "Métodos Privados",
            good: "#validateCredentials() {}",
            bad: "_checkCredentials() {}",
            description: "Prefijo # para privados (ES6+)"
        },
        {
            title: "Handlers de Eventos",
            good: "handleClickSubmit() {}",
            bad: "clickSubmit() {}",
            description: "Prefijo 'handle' para event handlers"
        }
    ],
    comments: [
        {
            title: "Comentarios de Clase",
            good: "/**\n * Representa un usuario del sistema\n * @class User\n */",
            bad: "// Clase de usuario",
            description: "Usar JSDoc para documentación"
        },
        {
            title: "Comentarios de Método",
            good: "/**\n * Obtiene el perfil completo del usuario\n * @param {string} userId - ID del usuario\n * @returns {Promise<User>}\n */",
            bad: "// Método para traer usuario",
            description: "Documentar parámetros y retorno"
        },
        {
            title: "Comentarios Inline",
            good: "// Validación especial para clientes premium\nif (user.isPremium) { ... }",
            bad: "// Check if premium\nif (user.p) { ... }",
            description: "Explicar el 'por qué', no el 'qué'"
        }
    ],
    fullExample: `/**
 * Servicio para autenticación de usuarios
 * @class AuthService
 */
class AuthService {
    /**
     * Valida las credenciales del usuario
     * @param {string} email - Correo electrónico
     * @param {string} password - Contraseña
     * @returns {Promise<AuthResponse>}
     * @throws {AuthError}
     */
    async validateCredentials(email, password) {
        // Validación básica del formato email
        if (!this.#isValidEmail(email)) {
            throw new AuthError('Formato de email inválido');
        }
        
        // Lógica de autenticación...
        const user = await UserRepository.findByEmail(email);
        
        if (!user) {
            throw new AuthError('Usuario no encontrado');
        }
        
        return this.#createAuthResponse(user);
    }

    /**
     * Crea la respuesta de autenticación
     * @private
     * @param {User} user 
     * @returns {AuthResponse}
     */
    #createAuthResponse(user) {
        return {
            token: generateJWT(user),
            profile: user.toProfileDTO()
        };
    }
    
    // Helper para validar email
    #isValidEmail(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    }
}`
};

// Renderizar ejemplos
function renderExamples() {
    renderSection('classes', 'classes-examples');
    renderSection('methods', 'methods-examples');
    renderSection('comments', 'comments-examples');
    document.getElementById('full-example-code').textContent = standardsData.fullExample;
}

function renderSection(dataKey, containerId) {
    const container = document.getElementById(containerId);
    standardsData[dataKey].forEach(item => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="good-example"><code>${item.good}</code></div>
            <div class="bad-example"><code>${item.bad}</code></div>
        `;
        container.appendChild(card);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', renderExamples);