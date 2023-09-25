
function Cuotas(monto, plazo) {
    const tasaInteresAnual = 0.1; 
    const tasaInteresMensual = tasaInteresAnual / 12; 
    const cuota = (monto * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazo));
    
    const cuotas = [];
    
    for (let i = 1; i <= plazo; i++) {
        const interes = monto * tasaInteresMensual;
        const amortizacion = cuota - interes;
        monto -= amortizacion;
        
        cuotas.push({ mes: i, cuota, interes, amortizacion, saldoRestante: monto });
    }
    
    return cuotas;
}


function Resultado(cuotas) {
    const resultadosDiv = document.getElementById('resultado');
    
    resultadosDiv.innerHTML = '';
    
    cuotas.forEach(cuota => {
        const cuotaDiv = document.createElement('div');
        cuotaDiv.innerHTML = `
            <p>Mes ${cuota.mes}</p>
            <p>Cuota: $${cuota.cuota.toFixed(2)}</p>
            <p>Interés: $${cuota.interes.toFixed(2)}</p>
            <p>Amortización: $${cuota.amortizacion.toFixed(2)}</p>
            <p>Saldo Restante: $${cuota.saldoRestante.toFixed(2)}</p>
        `;
        
        resultadosDiv.appendChild(cuotaDiv);
    });
}


document.getElementById('Total').addEventListener('click', () => {
    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    
    if (isNaN(monto) || isNaN(plazo) || monto <= 0 || plazo <= 0) {
        alert('Por favor, ingrese valores válidos.');
    } else {
        const cuotas = simularCuotas(monto, plazo);
        mostrarResultados(cuotas);
    }
});
