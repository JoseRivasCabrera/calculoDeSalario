let totalNormal = 0;
let totalExtras = 0;
const salarioDiurno = 13306.79;
const salarioMixto = 16158.24;
const salarioNocturno = 19960.18;
const salarioLibre = 13306.79;
const porcentajeCCSS = 0.1067;

function calcularSalario() {
    // Restablecer el campo de guardias extras al comenzar un nuevo cálculo
    document.getElementById('cantidadExtras').value = '';

    const diurno = parseInt(document.getElementById('diurno').value) || 0;
    const mixto = parseInt(document.getElementById('mixto').value) || 0;
    const nocturno = parseInt(document.getElementById('nocturno').value) || 0;
    const libre = parseInt(document.getElementById('libre').value) || 0;

    if (diurno < 0 || mixto < 0 || nocturno < 0 || libre < 0) {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popupMensaje').style.display = 'block';
        return;
    }

    totalNormal = (diurno * salarioDiurno) + (mixto * salarioMixto) + (nocturno * salarioNocturno) + (libre * salarioLibre);
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popupExtras').style.display = 'block';
}

function guardiaExtras(realizada) {
    if (realizada) {
        document.getElementById('popupExtras').style.display = 'none';
        document.getElementById('popupCantidadExtras').style.display = 'block';
    } else {
        // Si no hay extras, asignamos 0
        totalExtras = 0;
        cerrarPopups();
        mostrarResultado();
    }
}

function agregarGuardiasExtras() {
    const cantidadExtras = parseInt(document.getElementById('cantidadExtras').value) || 0;
    totalExtras = cantidadExtras * salarioDiurno;
    cerrarPopups();
    mostrarResultado();
}

function cerrarPopups() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popupExtras').style.display = 'none';
    document.getElementById('popupCantidadExtras').style.display = 'none';
    document.getElementById('popupMensaje').style.display = 'none';
}

function mostrarResultado() {
    const ccss = (totalNormal + totalExtras) * porcentajeCCSS;
    const salarioLibreTotal = totalNormal + totalExtras - ccss;
    const formatoMoneda = new Intl.NumberFormat('es-CR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let resultadoHtml = `
        <p>Salario Ordinario: ₡${formatoMoneda.format(totalNormal)}</p>
        ${totalExtras > 0 ? `<p>Guardias Extras: ₡${formatoMoneda.format(totalExtras)}</p>` : ''}
        <p>CCSS (10,67%): ₡${formatoMoneda.format(ccss)}</p>
        <div class="salario-libre">Salario Libre: ₡${formatoMoneda.format(salarioLibreTotal)}</div>
    `;

    document.getElementById('resultado').innerHTML = resultadoHtml;

    // Ocultar formulario y mostrar resultados
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';
}

function limpiarCampos() {
    document.getElementById('diurno').value = '';
    document.getElementById('mixto').value = '';
    document.getElementById('nocturno').value = '';
    document.getElementById('libre').value = '';
    document.getElementById('cantidadExtras').value = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('resultado').style.display = 'none';
}