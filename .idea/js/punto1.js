/**
 * Versión Profesional - Herramientas de Versionamiento
 *
 * @file script.js
 * @description Controlador principal de la aplicación
 * @version 1.0.0
 * @license MIT
 */

// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    // Establecer tema inicial
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    // Cargar herramientas
    loadTools();

    // Configurar gráfico comparativo
    setupComparisonChart();

    // Configurar eventos
    setupEventListeners();

    // Mostrar mensaje en consola
    console.log('%c🚀 VersionPro - Herramientas de Versionamiento',
        'color: #4361ee; font-size: 18px; font-weight: bold;');
    console.log('%cVersión 1.0.0 | Desarrollado con estándares profesionales',
        'color: #4cc9f0;');
});

// Datos de las herramientas
const versioningTools = [
    {
        id: 1,
        name: "Git",
        type: "distributed",
        logo: "git.png",
        description: "Sistema de control de versiones distribuido de código abierto diseñado para manejar todo tipo de proyectos con velocidad y eficiencia.",
        features: [
            "Control distribuido completo del historial",
            "Soporte para desarrollo no lineal",
            "Diseñado para rendimiento óptimo",
            "Ramas económicas y fáciles de manejar"
        ],
        releaseYear: 2005,
        popularity: 95,
        website: "https://git-scm.com",
        stars: 5
    },
    // Más herramientas...
];

// Cargar herramientas en el DOM
function loadTools() {
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.innerHTML = '';

    versioningTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card animate__animated animate__fadeIn';
        toolCard.dataset.type = tool.type;

        toolCard.innerHTML = `
            <span class="tool-badge" data-filter="${tool.type}">
                ${tool.type === 'distributed' ? 'Distribuido' :
            tool.type === 'centralized' ? 'Centralizado' : 'En la Nube'}
            </span>
            <div class="tool-header">
                <div class="tool-icon">
                    <img src="assets/icons/${tool.logo}" alt="${tool.name}" loading="lazy">
                </div>
                <div>
                    <h3 class="tool-title">${tool.name}</h3>
                    <p class="tool-subtitle">Lanzado en ${tool.releaseYear}</p>
                </div>
            </div>
            <div class="tool-body">
                <p class="tool-description">${tool.description}</p>
                
                <div class="tool-meta">
                    <div class="meta-item">
                        <div class="meta-value">${tool.popularity}%</div>
                        <div class="meta-label">Popularidad</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-value">${tool.stars}/5</div>
                        <div class="meta-label">Valoración</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-value">${tool.features.length}</div>
                        <div class="meta-label">Características</div>
                    </div>
                </div>
                
                <div class="tool-features">
                    <h4>Principales características:</h4>
                    <ul>
                        ${tool.features.map(feat => `<li>${feat}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="tool-footer">
                <a href="${tool.website}" target="_blank" class="tool-link">
                    Visitar sitio <i class="fas fa-external-link-alt"></i>
                </a>
                <div class="tool-stars">
                    ${'<i class="fas fa-star"></i>'.repeat(tool.stars)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - tool.stars)}
                </div>
            </div>
        `;

        toolsContainer.appendChild(toolCard);
    });

    // Configurar observador de intersección para animaciones
    setupIntersectionObserver();
}

// Configurar gráfico comparativo
function setupComparisonChart() {
    const ctx = document.getElementById('featuresChart').getContext('2d');
    const toolsForChart = versioningTools.slice(0, 3);

    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Rendimiento', 'Facilidad de uso', 'Colaboración', 'Escalabilidad', 'Adopción', 'Características'],
            datasets: toolsForChart.map((tool, index) => ({
                label: tool.name,
                data: [
                    tool.name === 'Git' ? 95 : tool.name === 'SVN' ? 80 : 85,
                    tool.name === 'Git' ? 80 : tool.name === 'SVN' ? 85 : 90,
                    tool.type === 'cloud' ? 95 : tool.type === 'distributed' ? 90 : 75,
                    tool.name === 'Git' ? 90 : tool.name === 'SVN' ? 85 : 80,
                    tool.popularity,
                    tool.features.length * 15
                ],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.5)',
                    'rgba(247, 37, 133, 0.5)',
                    'rgba(76, 201, 240, 0.5)'
                ][index],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(247, 37, 133, 1)',
                    'rgba(76, 201, 240, 1)'
                ][index],
                borderWidth: 2,
                pointBackgroundColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(247, 37, 133, 1)',
                    'rgba(76, 201, 240, 1)'
                ][index],
                pointRadius: 4
            }))
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            family: 'Poppins',
                            size: 12
                        },
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20
                    }
                }
            }
        }
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Cambiar tema
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Filtrado de herramientas
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', filterTools);
    });

    // Ordenación
    document.getElementById('sort-tools').addEventListener('change', sortTools);

    // Pestañas de flujo de trabajo
    document.querySelectorAll('.workflow-tab').forEach(tab => {
        tab.addEventListener('click', switchWorkflowTab);
    });

    // Pestañas de estándares
    document.querySelectorAll('.standard-tab').forEach(tab => {
        tab.addEventListener('click', switchStandardTab);
    });

    // Menú hamburguesa en móviles
    document.querySelector('.hamburger').addEventListener('click', toggleMobileMenu);
}

// Cambiar tema claro/oscuro
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

// Actualizar botón de tema
function updateThemeButton(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    if (theme === 'dark') {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        themeBtn.title = 'Cambiar a modo claro';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeBtn.title = 'Cambiar a modo oscuro';
    }
}

// Filtrar herramientas
function filterTools(e) {
    const filter = e.currentTarget.dataset.filter;

    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');

    // Filtrar herramientas
    const tools = document.querySelectorAll('.tool-card');
    tools.forEach(tool => {
        if (filter === 'all' || tool.dataset.type === filter) {
            tool.style.display = 'block';
        } else {
            tool.style.display = 'none';
        }
    });
}

// Ordenar herramientas
function sortTools() {
    const sortBy = this.value;
    let sortedTools = [...versioningTools];

    switch(sortBy) {
        case 'name':
            sortedTools.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'release':
            sortedTools.sort((a, b) => b.releaseYear - a.releaseYear);
            break;
        case 'popularity':
        default:
            sortedTools.sort((a, b) => b.popularity - a.popularity);
    }

    loadTools(sortedTools);
}

// Cambiar pestaña de flujo de trabajo
function switchWorkflowTab(e) {
    const workflow = e.currentTarget.dataset.workflow;

    // Actualizar pestañas activas
    document.querySelectorAll('.workflow-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    e.currentTarget.classList.add('active');

    // Mostrar contenido correspondiente
    document.querySelectorAll('.workflow-diagram').forEach(diagram => {
        diagram.classList.remove('active');
    });
    document.getElementById(`${workflow}-flow`).classList.add('active');
}

// Cambiar pestaña de estándares
function switchStandardTab(e) {
    const standard = e.currentTarget.dataset.standard;

    // Actualizar pestañas activas
    document.querySelectorAll('.standard-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    e.currentTarget.classList.add('active');

    // Mostrar contenido correspondiente
    document.querySelectorAll('.standard-info').forEach(info => {
        info.classList.remove('active');
    });
    document.getElementById(`${standard}-standards`).classList.add('active');
}

// Mostrar/ocultar menú en móviles
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Configurar observador de intersección para animaciones
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.tool-card, .section-header, .comparison-chart').forEach(el => {
        observer.observe(el);
    });
}