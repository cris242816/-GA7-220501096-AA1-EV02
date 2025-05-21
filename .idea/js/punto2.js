// Datos para las tarjetas de variables
const variableTypes = [
    {
        type: "Strings",
        good: "userName",
        bad: "usrnm"
    },
    {
        type: "Booleanos",
        good: "isActive",
        bad: "act"
    },
    {
        type: "Arrays",
        good: "productList",
        bad: "arr"
    },
    {
        type: "Funciones",
        good: "calculateTotal",
        bad: "calc"
    },
    {
        type: "Números",
        good: "itemCount",
        bad: "cnt"
    },
    {
        type: "Objetos",
        good: "userProfile",
        bad: "usrPrf"
    }
];

// Datos para la tabla de constantes
const constantExamples = [
    {
        context: "Configuración API",
        good: "API_BASE_URL",
        bad: "apiBaseUrl"
    },
    {
        context: "Límites",
        good: "MAX_ITEMS_PER_PAGE",
        bad: "maxItems"
    },
    {
        context: "Valores fijos",
        good: "DEFAULT_TIMEOUT",
        bad: "defaultTimeout"
    },
    {
        context: "Colores",
        good: "PRIMARY_COLOR",
        bad: "primaryColor"
    },
    {
        context: "Entorno",
        good: "ENVIRONMENT",
        bad: "env"
    }
];

// Ejemplo de código integrado
const codeExample = `// Constantes de configuración
const API_ENDPOINT = "https://api.example.com";
const MAX_RETRIES = 3;

// Variables de estado
let currentPage = 1;
let isLoading = false;

// Función con parámetros descriptivos
function fetchUserProfile(userId) {
  const requestUrl = \`\${API_ENDPOINT}/users/\${userId}\`;
  
  if (isLoading) {
    console.log("Ya se está cargando");
    return;
  }
  
  isLoading = true;
  
  // Lógica de fetch...
}

// Clase con convenciones
class UserAuth {
  #privateToken = null;  // Campo privado
  
  constructor(initialToken) {
    this.#privateToken = initialToken;
  }
  
  // Método público
  updateToken(newToken) {
    this.#privateToken = newToken;
  }
}`;

// Función para renderizar tarjetas de variables
function renderVariableCards() {
    const container = document.getElementById('variables-container');

    variableTypes.forEach(item => {
        const card = document.createElement('div');
        card.className = 'naming-card';
        card.innerHTML = `
            <h3>${item.type}</h3>
            <p><span class="good-practice">✓ Bueno:</span> <code>${item.good}</code></p>
            <p><span class="bad-practice">✗ Malo:</span> <code>${item.bad}</code></p>
        `;
        container.appendChild(card);
    });
}

// Función para renderizar tabla de constantes
function renderConstantsTable() {
    const tbody = document.querySelector('#constants-table tbody');

    constantExamples.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.context}</td>
            <td><code>${item.good}</code></td>
            <td><code>${item.bad}</code></td>
        `;
        tbody.appendChild(row);
    });
}

// Función para cargar el ejemplo de código
function loadCodeExample() {
    document.getElementById('code-example').textContent = codeExample;
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    renderVariableCards();
    renderConstantsTable();
    loadCodeExample();

    // Efecto de resaltado para las filas de la tabla
    const tableRows = document.querySelectorAll('#constants-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'scale(1.02)';
            row.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        row.addEventListener('mouseleave', () => {
            row.style.transform = 'scale(1)';
            row.style.boxShadow = 'none';
        });
    });
});