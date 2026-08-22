// Llena la ventana modal de confirmacion antes de eliminar un registro.
// El formulario del modal se envia por POST y method-override lo convierte en DELETE.
function modal_eliminar(tabla, mensaje, url) {
    document.getElementById("modal_title").innerHTML = "Eliminar " + tabla;
    document.getElementById("modal_body").innerHTML = mensaje;
    document.getElementById("formEliminar").action = url + "?_method=DELETE";
}

// Igual que la anterior pero para confirmaciones que no eliminan (ej: recibir una compra).
function modal_confirmar(titulo, mensaje, url) {
    document.getElementById("modal_title").innerHTML = titulo;
    document.getElementById("modal_body").innerHTML = mensaje;
    document.getElementById("formEliminar").action = url;
}

// Marca en azul el enlace del menu que corresponde a la pagina abierta.
function marcarMenu() {
    var enlaces = document.querySelectorAll(".sidebar-link");

    enlaces.forEach(function (enlace) {
        if (enlace.getAttribute("href") === window.location.pathname) {
            enlace.classList.add("active");
        }
    });
}

window.addEventListener("DOMContentLoaded", function () {
    marcarMenu();
});
