// Elemento donde se mostrarán los CUITs
const cuitSpan = document.getElementById('cuit');

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
 * Genera 5 CUITs válidos diferentes
 */
function generarMultiples() {
    const cuits = [];
    for (let i = 0; i < 5; i++) {
        cuits.push(generar());
    }
    cuitSpan.textContent = cuits.join('\n');
}

/**
 * Copia todos los CUITs al portapapeles
 */
function copiarAlPortapapeles() {
    const cuits = cuitSpan.textContent.trim();

    if (cuits === 'Haz clic en "Generar 5 CUITs válidos"') {
        alert('⚠️ Primero debes generar los CUITs');
        return;
    }

    navigator.clipboard.writeText(cuits).then(() => {
        alert('✅ CUITs copiados al portapapeles');
    }).catch(() => {
        alert('❌ Error al copiar al portapapeles');
    });
}
