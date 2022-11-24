let hayInfo = localStorage.getItem('usuarios')
if (hayInfo === null) {
	localStorage.setItem('usuarios', JSON.stringify([]))}
else {
	let lista = document.getElementById('listaProductos')
	let arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
	arrayUsuarios.map((e, j) => {
		// return $("#listaProductos").append('<tr id="row' + (j + 1) + '" class="Reg_A' + '"><td><span class="mid">' +
		// 	(j + 1) + '</span></td><td><span class="tittle">' + e.Input + '</span></td><td><span class="slry">' + e.Salary + ' USD$</span></td><td><span class="desc">' + e.Descripcion + '</span></td></span></td><td><button type="button" id="A' + (j + 1) + '" class="btn btn-secondary" onclick="editar(' + j + ')">Editar</button></td><td><button type="button" id="A' + (j + 1) + '" class="btn btn-danger" onclick="eliminarRegistro(' + j + ')">Eliminar</button></td></tr>');
	
			return $("#listaProductos").append(`<tr id="row${j}" class="Reg_A"><td><span class="mid">${j+1} </span></td><td><span id="tittle${j}"> ${e.Input} </span></td><td><span id="slry${j}">${e.Salary} USD$</span></td><td><span id="desc${j}"> ${e.Descripcion} </span></td></span></td><td><button type="button" id="A${j}" class="btn btn-secondary" onclick="editar(${j},this)">Editar</button></td><td><button type="button" id="A${j}" class="btn btn-danger" onclick="eliminarRegistro(${j})">Eliminar</button></td></tr>`);
		})
	// 
}


function add_row() {

	var new_title = document.getElementById("Rol").value;
	var new_salary = document.getElementById("Salario").value;
	var new_description = document.getElementById("descr").value;

	if (new_title && new_salary && new_description != "") {
		var table = document.getElementById("listaProductos");
		var table_len = (table.rows.length) - 1;
		var row = table.insertRow(table_len + 1).outerHTML =
		// 	'<tr id="row' + (table_len + 1) + '" class="Reg_A' + '"><td><span class="mid">' +
		// 	table_len + '</span></td><td><span>' + new_title + '</span></td><td><span>' +
		// 	new_salary + ' USD$</span></td><td><span>' + new_description + '</span></td>'
		// '<td><button type="button" id="A' + (table_len + 1) + '" class="btn btn-secondary" onclick="editar(' + table_len + ')">Editar</button></td>'
		// '<td><button type="button" id="A' + (table_len + 1) + '" class="btn btn-danger" onclick="eliminarRegistro(' + table_len + ')">Eliminar</button></td>'
		// '</tr>';
		`<tr id="row${table_len}" class="Reg_A"><td><span class="mid">${table_len+1} </span></td><td><span id="tittle${table_len}"> ${new_title} </span></td><td><span id="slry${table_len}">${new_salary} USD$</span></td><td><span id="desc${table_len}"> ${new_description} </span></td></span></td><td><button type="button" id="A${table_len}" class="btn btn-secondary" onclick="editar(${table_len},this)">Editar</button></td><td><button type="button" id="A${table_len}" class="btn btn-danger" onclick="eliminarRegistro(${table_len})">Eliminar</button></td></tr>`
		let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))
		usuariosGuardados.push({ Input: new_title, Salary: new_salary, Descripcion: new_description})
		localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))

		document.getElementById("Rol").value = "";
		document.getElementById("Salario").value = "";
		document.getElementById("descr").value = "";
	}

	else {
		alert('Debe ingresar un valor');
		return false;
	}
}

function Borrar() {
	if (!confirm("¿Estás seguro de borrar la tabla? Todos los datos se perderán permanentemente", ""))
		return
	localStorage.removeItem('usuarios')
	window.location.reload()
}

// function eliminarRegistro(no) {
// 	document.getElementById("row" + no + "").outerHTML = "";
// 	let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))
// 	usuariosGuardados.splice(no, 1)
// 	localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))
// 	document.getElementById("listaProductos").outerHTML = "";
// 	cargar()
// }

// function cargar(){
// 	let arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
// 	arrayUsuarios.map((e, j) => {
// 			return $("#listaProductos").append(`<tr id="row${j}" class="Reg_A"><td><span class="mid">${j} </span></td><td><span class="tittle"> ${e.Input} </span></td><td><span class="slry">${e.Salary} USD$</span></td><td><span class="desc"> ${e.Descripcion} </span></td></span></td><td><button type="button" id="A${j}" class="btn btn-secondary" onclick="editar(${j},this)">Editar</button></td><td><button type="button" id="A${j}" class="btn btn-danger" onclick="eliminarRegistro(${j})">Eliminar</button></td></tr>`);
// 		})
// }

function eliminarRegistro(no) {
	let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))
	usuariosGuardados.map((e, j) => {
		return document.getElementById("row" + j + "").outerHTML = "";
})
	usuariosGuardados.splice(no, 1)
	localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))
	cargar()
}

function cargar(){
	let arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
	arrayUsuarios.map((e, j) => {
			return $("#listaProductos").append(`<tr id="row${j}" class="Reg_A"><td><span class="mid">${j} </span></td><td><span id="tittle"> ${e.Input} </span></td><td><span id="slry">${e.Salary} USD$</span></td><td><span id="desc"> ${e.Descripcion} </span></td></span></td><td><button type="button" id="A${j}" class="btn btn-secondary" onclick="editar(${j},this)">Editar</button></td><td><button type="button" id="A${j}" class="btn btn-danger" onclick="eliminarRegistro(${j})">Eliminar</button></td></tr>`);
		})
}



function editar(no, ref) {
    ref.innerHTML = "Guardar Cambios";
	ref.className  = "btn btn-warning";
    ref.removeAttribute("onclick");

    var titl = document.getElementById("tittle" + no);
    console.log(titl,2);
 
    var salry = document.getElementById("slry" + no);
    console.log(salry);

	var description = document.getElementById("desc" + no);
    console.log(description);

    var title_data = titl.innerHTML;
	var salry_data = salry.innerHTML.split(" ",1);
    var description_data = description.innerHTML;
    document.getElementById("Rol").value = title_data;
	document.getElementById("Salario").value = salry_data;
    document.getElementById("descr").value = description_data;

    // ref.setAttribute("onclick", "saveEdit(this,'" + no + "')");
}

//Agregar map para validar el guardar cambios que solo salga 1


function saveEdit(ref, no) {
    var new_title = document.getElementById("new_title").value;
    var new_description = document.getElementById("new_description").value;

    var parent = (ref.parentElement).parentElement;

    var list = document.getElementById(parent.id);
    var title = list.getElementsByClassName("titleData")[0];
    var desc = list.getElementsByClassName("descData")[0];

    title.innerHTML = new_title;
    desc.innerHTML = new_description;

    ref.value = "Edit";
    ref.removeAttribute("onclick");
    ref.setAttribute("onclick", "edit_row(" + no + ",this)");


    document.getElementById("new_title").value = "";
    document.getElementById("new_description").value = "";
}