let hayInfo = localStorage.getItem('usuarios')
if (hayInfo === null) {localStorage.setItem('usuarios', JSON.stringify([]))
} else {
	let lista = document.getElementById('listaProductos')
	let arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
	// let items = arrayUsuarios.map((e, j) => {
	// 	return lista.insertRow(j + 1).outerHTML =
	// 		'<tr id="row' + j + 1 + '" class="Reg_A' + j + '"><td><span class="mid">' +
	// 		j + '</span></td><td><span>' + e.Input + '</span></td><td><span>' +
	// 		e.Salary + ' USD$</span></td><td><span>' + e.Descripcion + '</span></td><td><button type="button" id="A' + j + '" class="btn btn-success" onclick="editar()">Editar</button></td><td><button type="button" id="A' + j + '" class="btn btn-danger" onclick="eliminarRegistro()">Eliminar</button></td></tr>';
	// })
arrayUsuarios.map((e,j) => {
    return $("#listaProductos").append(	'<tr id="row' + (j+1) + '" class="Reg_A' + j + '"><td><span class="mid">' +
	(j+1) + '</span></td><td><span>' + e.Input + '</span></td><td><span>' + e.Salary + ' USD$</span></td><td><span>' + e.Descripcion + '</span></td></span></td><td><button type="button" id="A' + j + '" class="btn btn-secondary" onclick="editar()">Editar</button></td><td><button type="button" id="A' + j + '" class="btn btn-danger" onclick="eliminarRegistro()">Eliminar</button></td></tr>');
})


}


function add_row() {
	var new_title = document.getElementById("Rol").value;
	var new_salary = document.getElementById("Salario").value;
	var new_description = document.getElementById("descr").value;

	if (new_title && new_salary && new_description != "") {
		var table = document.getElementById("listaProductos");
		var table_len = (table.rows.length) - 1;
		var row = table.insertRow(table_len + 1).outerHTML =
			'<tr id="row' + table_len + 1 + '" class="Reg_A' + table_len + '"><td><span class="mid">' +
			table_len + '</span></td><td><span>' + new_title + '</span></td><td><span>' +
			new_salary + ' USD$</span></td><td><span>' + new_description + '</span></td>'
		'<td><button type="button" id="A' + table_len + '" class="btn btn-secondary" onclick="editar()">Editar</button></td>'
		'<td><button type="button" id="A' + table_len + '" class="btn btn-danger" onclick="eliminarRegistro()">Eliminar</button></td>'
		'</tr>';

		let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))
		usuariosGuardados.push({ Input: new_title, Salary: new_salary, Descripcion: new_description })
		localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))

		document.getElementById("Rol").value = "";
		document.getElementById("Salario").value = "";
		document.getElementById("descr").value = "";

	}

	else {
		alert('Debe ingresar un valor');
		return false;
	}
    window.location.reload()
}
