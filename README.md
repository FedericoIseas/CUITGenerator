# 🧾 Generador de CUIT para Testing

**Herramienta web que genera CUITs argentinos válidos para usar en pruebas y entornos de desarrollo.**

🔗 **Demo en vivo:** [federicoiseas.github.io/CUITGenerator](https://federicoiseas.github.io/CUITGenerator/)

---

## ¿Qué hace?

Genera lotes de 6 CUITs válidos de forma instantánea, calculando correctamente el dígito verificador mediante el algoritmo módulo 11. Cada CUIT puede copiarse al portapapeles con un solo clic.

Pensada para desarrolladores y testers que trabajan con sistemas de facturación electrónica, integraciones con ARCA/AFIP u otras plataformas que requieren CUITs válidos sin utilizar datos reales.

---

## ✨ Funcionalidades

- ⚡ Generación instantánea de 6 CUITs válidos al cargar la página
- 🔄 Botón para regenerar nuevos CUITs en cualquier momento
- 📋 Copia individual de cada CUIT al portapapeles
- ✅ Indicador visual de CUITs ya copiados durante la sesión
- 💬 Mensajes de feedback (éxito / error) con auto-ocultamiento
- 🌗 Soporte para modo claro y oscuro según preferencia del sistema

---

## 🏗️ Estructura del CUIT

El CUIT (Código Único de Identificación Tributaria) es el identificador fiscal argentino, emitido por ARCA. Consta de **11 dígitos** con el formato `XX-XXXXXXXX-X`:

| Posición | Longitud | Descripción |
|---|---|---|
| Prefijo | 2 dígitos | Tipo de persona: `23`, `24`, `25`, `26` o `27` |
| Identificación | 8 dígitos | DNI (personas humanas) o número de sociedad (empresas) |
| Verificador | 1 dígito | Calculado con el algoritmo módulo 11 |

### Algoritmo del dígito verificador

```
multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
suma = Σ (dígito[i] × multiplicadores[i])
resto = suma % 11
verificador = 11 - resto

Si verificador == 11 → se usa 0
Si verificador == 10 → se usa 9
```

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura y accesibilidad |
| CSS3 (Vanilla) | Estilos, dark mode, animaciones |
| JavaScript (Vanilla) | Lógica de generación y UI |
| GitHub Pages | Hosting estático |

Sin dependencias externas ni frameworks. Todo el proyecto funciona con un solo archivo HTML, un CSS y un JS.

---

## 📁 Estructura del proyecto

```
CUITGenerator/
├── index.html      # Estructura principal de la página
├── scripts.js      # Lógica de generación de CUITs
├── styles.css      # Estilos y diseño responsive
└── img/
    └── og-img.png  # Imagen para Open Graph (redes sociales)
```

---

## 🚀 Uso local

No requiere instalación ni servidor. Simplemente cloná el repositorio y abrí `index.html` en tu navegador:

```bash
git clone https://github.com/federicoiseas/CUITGenerator.git
cd CUITGenerator
# Abrí index.html en tu navegador
```

---

## ⚠️ Aviso importante

Los CUITs generados son **matemáticamente válidos** (pasan la validación del dígito verificador), pero son **ficticios**. No corresponden a personas o empresas reales. Su uso está destinado exclusivamente a **entornos de prueba y desarrollo**.

---

## 📚 Referencias

- [ARCA – CUIT: Conceptos básicos](https://servicioscf.afip.gob.ar/publico/abc/ABCpaso2.aspx?cat=3040)

---

## 👤 Autor

**Federico Iseas**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/federico-iseas)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/federicoiseas)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:federicoiseas@gmail.com)

---

*Generador de CUIT para Testing – 2026*
