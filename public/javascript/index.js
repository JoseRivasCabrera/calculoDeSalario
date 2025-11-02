let totalNormal = 0;
let totalExtras = 0;
const salarioDiurno = 13306.79;
const salarioMixto = 16158.24;
const salarioNocturno = 19960.18;
const salarioLibre = 13306.79;
const porcentajeCCSS = 0.1067;
const valorHoraDiurna = salarioDiurno / 8;
const valorHoraMixta = salarioMixto / 8;
const valorHoraNocturna = salarioNocturno / 8;

function calcularSalario() {
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
  const horasExtraMixtas = mixto * 1;
  const horasExtraNocturnas = nocturno * 2;
  const valorExtrasMixto = horasExtraMixtas * valorHoraMixta;
  const valorExtrasNocturno = horasExtraNocturnas * valorHoraNocturna;
  totalExtras = valorExtrasMixto + valorExtrasNocturno;
  window.datosExtras = { horasExtraMixtas, horasExtraNocturnas, valorExtrasMixto, valorExtrasNocturno };

  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popupExtras').style.display = 'block';
}

function guardiaExtras(realizada) {
  if (realizada) {
    document.getElementById('popupExtras').style.display = 'none';
    document.getElementById('popupCantidadExtras').style.display = 'block';
  } else {
    cerrarPopups();
    mostrarResultado();
  }
}

function agregarGuardiasExtras() {
  const cantidadExtras = parseInt(document.getElementById('cantidadExtras').value) || 0;
  const valorGuardiasExtras = cantidadExtras * salarioDiurno;
  totalExtras += valorGuardiasExtras;
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
  const { horasExtraMixtas, horasExtraNocturnas, valorExtrasMixto, valorExtrasNocturno } = window.datosExtras;
  const diurno = parseInt(document.getElementById('diurno').value) || 0;
  const mixto = parseInt(document.getElementById('mixto').value) || 0;
  const nocturno = parseInt(document.getElementById('nocturno').value) || 0;
  const libre = parseInt(document.getElementById('libre').value) || 0;

  const totalDias = diurno + mixto + nocturno + libre;
  const horasOrdinarias = totalDias * 8;
  const subtotalLibre = libre * salarioLibre;
  const totalOrdinario = (diurno * salarioDiurno) + (mixto * salarioMixto) + (nocturno * salarioNocturno);
  const ccss = (totalOrdinario + subtotalLibre) * porcentajeCCSS;
  const salarioLibreTotal = totalOrdinario + subtotalLibre - ccss;

  const formatoMoneda = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const resultadoHtml = `
    <div class="resultado-plantilla">
      <div class="tabla-scroll">
        <table class="tabla-resultado">
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Cant.</th>
              <th></th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Días trabajados</td><td>${totalDias}</td><td></td><td></td></tr>
            <tr><td>H.Ordinarias</td><td>${horasOrdinarias}</td><td>₡</td><td>${formatoMoneda.format(valorHoraDiurna * horasOrdinarias)}</td></tr>
            <tr><td>H.extra mixtas</td><td>${horasExtraMixtas}</td><td>₡</td><td>${formatoMoneda.format(valorExtrasMixto)}</td></tr>
            <tr><td>H.extra nocturnas</td><td>${horasExtraNocturnas}</td><td>₡</td><td>${formatoMoneda.format(valorExtrasNocturno)}</td></tr>
            <tr><td>Días libres</td><td>${libre}</td><td>₡</td><td>${formatoMoneda.format(subtotalLibre)}</td></tr>
            <tr><td>Rebajos</td><td></td><td></td><td></td></tr>
            <tr><td>CCSS (10,67%)</td><td></td><td>₡</td><td>${formatoMoneda.format(ccss)}</td></tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div class="fila total">
        <span><strong>Salario libre:</strong></span>
        <span><strong>₡${formatoMoneda.format(salarioLibreTotal)}</strong></span>
      </div>
    </div>`;

  document.getElementById('resultado').innerHTML = resultadoHtml;
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