function verifyArray(array) {
	const cantidad = array.length;

	const pares = array.filter(function (elemento) {
		return elemento % 2 === 0;
	})

	const impares = array.filter(function (elemento) {
		return elemento % 2 !== 0;
	})

	const porcentajePares = (pares.length * 100 / cantidad).toFixed(2);
	const porcentajeImpares = (impares.length * 100 / cantidad).toFixed(2);

	const menor = array.sort((a, b) => a - b)[0]
	const mayor = array.sort((a, b) => a - b)[array.length - 1]

	const porcentajeNumMinimo = ((menor / mayor) * 100).toFixed(2);

	const sumaNumeros = array.reduce((acc, num) => acc + num, 0);
	const promedioNumeros = sumaNumeros / array.length;
	const promedio = ((promedioNumeros / mayor) * 100).toFixed(2);

	return {cantidad, porcentajePares, porcentajeImpares, menor, mayor, porcentajeNumMinimo, porcentajePromedio: promedio};
}

const result = verifyArray([9, 10, 11, 13, 15, 21, 1, 2, 3, 4, 5, 6, 7, 8])
console.log(result)
