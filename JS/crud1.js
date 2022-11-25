
//Linea para mantener la inforación siempre cargada en la pagina sin importar si se cierra o no
let hayInfo = localStorage.getItem('usuarios')
if (hayInfo === null) {
	localStorage.setItem('usuarios', JSON.stringify([]))
}
else {
	let lista = document.getElementById('listaProductos')
	let arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
	arrayUsuarios.map((e, j) => {
		return $("#listaProductos").append(`<tr id="row${j}" class="Reg_A"><td><span class="mid">${j + 1} </span></td><td><span id="tittle${j}" class="rowData${j}">${e.Input}</span></td><td><span id="slry${j}" class="slryData${j}">${e.Salary} USD$</span></td><td><span id="desc${j}" class="descData${j}">${e.Descripcion}</span></td></span></td><td><button type="button" id="A${j}" class="btn btn-secondary" onclick="editar(${j},this)">Editar</button></td><td><button type="button" id="A${j}" class="btn btn-danger" onclick="eliminarRegistro(${j})">Eliminar</button></td></tr>`);
	})
	contador()
}

//Función para agregar registros
function add_row() {
	//En esta parte se guarda el contenido de cada input
	var new_title = document.getElementById("Rol").value;
	var new_salary = document.getElementById("Salario").value;
	var new_description = document.getElementById("descr").value;

	//Esta parte valida si se ingreso la información en cada uno de los inputs y con base a eso calcula
	//El tamaño del contenido almanecado hasta el momento
	if (new_title && new_description != "") {

		if (new_salary > 0) {
			var table = document.getElementById("listaProductos");
			var table_len = (table.rows.length) - 1;

			//Agrega la estructura del html con base a los registros
			var row = table.insertRow(table_len + 1).outerHTML =
				`<tr id="row${table_len - 1}" class="Reg_A"><td><span class="mid">${table_len} </span></td><td><span id="tittle${table_len - 1}" class="rowData${table_len - 1}">${new_title}</span></td><td><span id="slry${table_len - 1}" class="slryData${table_len - 1}">${new_salary} USD$</span></td><td><span id="desc${table_len - 1}" class="descData${table_len - 1}">${new_description}</span></td></span></td><td><button type="button" id="A${table_len - 1}" class="btn btn-secondary" onclick="editar(${table_len - 1},this)">Editar</button></td><td><button type="button" id="A${table_len - 1}" class="btn btn-danger" onclick="eliminarRegistro(${table_len - 1})">Eliminar</button></td></tr>`

			//Almacena los datos en el localStorage
			let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))
			usuariosGuardados.push({ Input: new_title, Salary: new_salary, Descripcion: new_description })
			localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))

			//Vacia los inputs en la pagina
			inputs_empty()
		}

		else {
			alert('Debe ingresar un valor numerico o mayor a 0 en el campo "SALARIO" ');
			return false;
		}
	}
	//En caso de no tener datos arroja la alerta
	else {
			alert('Debe ingresar un valor en todos los campos');
			return false;
		}
	


	contador()
}


//Esta función elimina todo el contenido del localstorage y la tabla del HTML
function Borrar() {
	if (!confirm("¿Estás seguro de borrar la tabla? Todos los datos se perderán permanentemente", ""))
		return
	localStorage.removeItem('usuarios')
	window.location.reload()
	inputs_empty()
}

//Función para eliminar registros puntuales selecionados
function eliminarRegistro(no) {
	let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))

	//Lee el tamaño del array en el LocalStorage y con base a eso elimina todas las estructura del html una por una
	usuariosGuardados.map((e, j) => {
		return document.getElementById("row" + j + "").outerHTML = "";
	})
	//El parametro "no" determina  el index a eliminar del localstorage y guarda los cambios
	usuariosGuardados.splice(no, 1)
	localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))
	cargar()
	contador()
	habilitar_botones()
	inputs_empty()
}

//Se decide eliminar la estructura del HTML para poder recalcula la columna ID que determina la posición


//Crea nuevamente la estructura del HTML con base a los cambios (eliminaciones/ediciones) en el localStorage
function cargar() {
	let arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
	arrayUsuarios.map((e, j) => {
		return $("#listaProductos").append(`<tr id="row${j}" class="Reg_A"><td><span class="mid">${j + 1}</span></td><td><span id="tittle${j}" class="rowData${j}">${e.Input}</span></td><td><span id="slry${j}" class="slryData${j}">${e.Salary} USD$</span></td><td><span id="desc${j}" class="descData${j}">${e.Descripcion}</span></td></span></td><td><button type="button" id="A${j}" class="btn btn-secondary" onclick="editar(${j},this)">Editar</button></td><td><button type="button" id="A${j}" class="btn btn-danger" onclick="eliminarRegistro(${j})">Eliminar</button></td></tr>`);
	})
}


function editar(no, ref) {
	//Cambia el contenido del botón editar por "Guardar Cambios" 
	ref.innerHTML = "Guardar Cambios";

	//Cambia la clase del boton para poder cambiar el color con CSS
	ref.className = "btn btn-warning";

	//Remueve el aributo para evitar mapear el evento del botón	
	ref.removeAttribute("onclick");

	//Mapea la estructua del HTML con base al id y el parametro "no" que determina la posición sobre la cual se hizo click
	var titl = document.getElementById("tittle" + no);
	// console.log(titl);
	var salry = document.getElementById("slry" + no);
	// console.log(salry);
	var description = document.getElementById("desc" + no);
	// console.log(description);

	//Muestra en los inputs del HTMl la fila que se quiere editar de la tabla
	var title_data = titl.innerHTML;
	var salry_data = salry.innerHTML.split(" ", 1);
	var description_data = description.innerHTML;
	document.getElementById("Rol").value = title_data;
	document.getElementById("Salario").value = salry_data;
	document.getElementById("descr").value = description_data;

	//Función para ocultar el botón Agregar y eliminar todo
	Ocultar_botones()

	//LLama la función de editar y guardar cambios
	ref.setAttribute("onclick", `saveEdit(${no},this)`);

	//Actualiza el contador
	contador()
}

function saveEdit(no, ref) {

	var new_rol = document.getElementById("Rol").value
	var new_Salario = document.getElementById("Salario").value;
	var new_description = document.getElementById("descr").value;

	//Trae la estructura HTML de la fila donde se clicleo el botón siempre trayendo del mas pequeño al mayor
	var parent = (ref.parentElement).parentElement;
	var list = document.getElementById(parent.id);

	//Busca los elementos de los 3 inputs
	var title = list.getElementsByClassName(`rowData${no}`)[0];
	var Salary = list.getElementsByClassName(`slryData${no}`)[0];
	var desc = list.getElementsByClassName(`descData${no}`)[0];

	//Extrae el contenido de cada elemento
	title.innerHTML = new_rol;
	Salary.innerHTML = new_Salario;
	desc.innerHTML = new_description;

	//Devuelve el valor del boton a editar y su clase anterior
	ref.innerHTML = "Editar";
	ref.className = "btn btn-secondary";
	ref.removeAttribute("onclick");
	ref.setAttribute("onclick", `editar(${no},this)`);

	//Devuelve los input a vacio
	inputs_empty()

	//Develve el poton Crear nuevamente
	habilitar_botones()
	// document.getElementById('crear').style.display = 'block';
	// document.getElementById('borrarTodo').style.display = 'block';

}

//Función para contar los registros y mostrarlo siempre en la pagina
function contador() {
	var table = document.getElementById("listaProductos");
	var conteo = (table.rows.length) - 2;
	var Contador_html = document.getElementById('counter');
	var name = 'Registro';
	if (conteo) {
		if (conteo > 1) {
			name = 'Registros';
		}
		Contador_html.innerHTML = conteo + ' ' + name
	} else {
		Contador_html.innerHTML = 0 + name;
	}
}

function Ocultar_botones() {
	document.getElementById('crear').style.display = 'none';
	document.getElementById('borrarTodo').style.display = 'none';
}

function habilitar_botones() {
	document.getElementById('crear').style.display = 'block';
	document.getElementById('borrarTodo').style.display = 'block';
}

function inputs_empty() {
	document.getElementById("Rol").value = "";
	document.getElementById("Salario").value = "";
	document.getElementById("descr").value = "";
}



//Agregar map para validar el guardar cambios que solo salga 1
//Alimentar contador  ok
//Alerta para validar campo numerico

