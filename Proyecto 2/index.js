let hayInfo = localStorage.getItem('usuarios')
if (hayInfo === null) { localStorage.setItem('usuarios', JSON.stringify([])) }


let lista = document.getElementById('lista')
let arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
let items = arrayUsuarios.map((e) => {
    return  `<li>${e.nombre}</li>`
})
lista.innerHTML = items.join('')
document.body.appendChild(lista)

function nuevoUsuario() {
    let inputNombre = document.getElementById('inputNombre').value
    if (inputNombre.length == 0) {
        alert('Debe ingresar un valor');
        return false;
    }
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))
    usuariosGuardados.push({ nombre: inputNombre,edad: (inputNombre.length+1) })
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))
    window.location.reload()
}

