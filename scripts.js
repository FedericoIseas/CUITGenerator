// Elementos del DOM
const cuitSpan = document.getElementById('cuit');
const mensajeDiv = document.getElementById('mensaje');
const cuitsList = document.querySelector('.cuits-list');

// Almacenar CUITs copiados para notificaciones
let cuitsCopiadosEnEstaSesion = new Set();
let cuitsActuales = [];

/**
 * Calcula el dígito verificador del CUIT
 * El algoritmo multiplica cada dígito por un factor específico y calcula el módulo 11
 * @param {string} cuitSinVerificador - CUIT sin el dígito verificador (10 dígitos)
 * @returns {number} El dígito verificador (0-9)
 */
function calcularDigitoVerificador(cuitSinVerificador) {
    const multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;

    for (let i = 0; i < 10; i++) {
        suma += parseInt(cuitSinVerificador[i]) * multiplicadores[i];
    }

    const resto = suma % 11;
    const verificador = 11 - resto;

    // Si el resultado es 11, se usa 0; si es 10, se usa 9
    if (verificador === 11) return 0;
    if (verificador === 10) return 9;
    return verificador;
}

/**
 * Genera un CUIT válido aleatorio
 * Formato: XX-XXXXXXXX-X (con dígito verificador)
 * @returns {string} Un CUIT válido con formato
 */
function generar() {
    // Tipo de persona: 23 (Sociedad Comercial), 24 (Sociedad Civil), 25 (No categorizado), 26 o 27
    const tiposPersona = [23, 24, 25, 26, 27];
    const tipoPersona = tiposPersona[Math.floor(Math.random() * tiposPersona.length)];

    // Generar 8 dígitos aleatorios para el DNI/número secuencial
    let numeroIdentificacion = '';
    for (let i = 0; i < 8; i++) {
        numeroIdentificacion += Math.floor(Math.random() * 10);
    }

    // Construir CUIT sin verificador
    const cuitSinVerificador = tipoPersona.toString() + numeroIdentificacion;

    // Calcular dígito verificador
    const digitoVerificador = calcularDigitoVerificador(cuitSinVerificador);

    // Dar formato final: XX-XXXXXXXX-X
    const cuitFormateado = `${tipoPersona}-${numeroIdentificacion}-${digitoVerificador}`;

    return cuitFormateado;
}

/**
 * Muestra un mensaje en el sitio
 * @param {string} texto - Texto del mensaje
 * @param {string} tipo - Tipo de mensaje: 'exito', 'error', 'info'
 */
function mostrarMensaje(texto, tipo = 'info') {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje-container mensaje-${tipo}`;
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.textContent = '';
        mensajeDiv.className = 'mensaje-container';
    }, 3000);
}

/**
 * Copia un CUIT individual al portapapeles
 * @param {string} cuit - El CUIT a copiar
 * @param {number} indice - El índice del CUIT en la lista
 */
function copiarCuit(cuit, indice) {
    navigator.clipboard.writeText(cuit).then(() => {
        // Marcar como copiado
        cuitsCopiadosEnEstaSesion.add(cuit);
        
        // Actualizar el mensaje
        const mensaje = `✅ ${cuit} copiado al portapapeles`;
        mostrarMensaje(mensaje, 'exito');
        
        // Actualizar el botón para mostrar que ya fue copiado
        const btn = document.querySelector(`.copy-cuit-btn[data-index="${indice}"]`);
        if (btn) {
            btn.classList.add('ya-copiado');
            btn.textContent = '✅ Copiado';
        }
    }).catch(() => {
        mostrarMensaje('❌ Error al copiar al portapapeles', 'error');
    });
}

/**
 * Genera 5 CUITs válidos diferentes y los muestra con botones de copiar individuales
 */
function generarMultiples() {
    cuitsActuales = [];
    for (let i = 0; i < 6; i++) {
        cuitsActuales.push(generar());
    }
    
    // Limpiar lista anterior
    cuitsList.innerHTML = '';
    
    // Crear elementos para cada CUIT
    cuitsActuales.forEach((cuit, indice) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cuit-item';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'cuit-header';
        
        const cuitSpanElement = document.createElement('span');
        cuitSpanElement.className = 'cuit-texto';
        cuitSpanElement.textContent = cuit;
        
        const copiarBtn = document.createElement('button');
        copiarBtn.className = `copy-cuit-btn ${cuitsCopiadosEnEstaSesion.has(cuit) ? 'ya-copiado' : ''}`;
        copiarBtn.textContent = cuitsCopiadosEnEstaSesion.has(cuit) ? '✅' : '📋 Copiar';
        copiarBtn.setAttribute('data-index', indice);
        copiarBtn.onclick = () => copiarCuit(cuit, indice);
        copiarBtn.title = 'Copiar este CUIT';
        
        headerDiv.appendChild(cuitSpanElement);
        headerDiv.appendChild(copiarBtn);
        itemDiv.appendChild(headerDiv);
        cuitsList.appendChild(itemDiv);
    });
    
    mostrarMensaje('✨ 6 CUITs generados correctamente', 'exito');
}

/**
 * Se ejecuta cuando carga la página
 */
window.addEventListener('load', () => {
    generarMultiples();
});
