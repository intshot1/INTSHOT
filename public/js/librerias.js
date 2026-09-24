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

// Switch de modo oscuro/claro.
// El tema ya viene aplicado desde el <head> (partials/head.ejs); aqui solo se
// maneja el cambio y se guarda la preferencia en el navegador.
(function () {
    var switches = document.querySelectorAll('.theme-toggle');
    if (!switches.length) return;

    var esOscuro = document.documentElement.getAttribute('data-bs-theme') === 'dark';

    function pintarSwitches() {
        switches.forEach(function (boton) {
            boton.setAttribute('aria-pressed', esOscuro ? 'true' : 'false');
            boton.setAttribute('aria-label', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
            var icono = boton.querySelector('.theme-toggle-icon');
            if (icono) {
                icono.textContent = esOscuro ? 'dark_mode' : 'light_mode';
            }
        });
    }

    pintarSwitches();

    switches.forEach(function (boton) {
        boton.addEventListener('click', function () {
            esOscuro = !esOscuro;
            document.documentElement.setAttribute('data-bs-theme', esOscuro ? 'dark' : 'light');
            try {
                localStorage.setItem('intshot-theme', esOscuro ? 'dark' : 'light');
            } catch (e) {}
            pintarSwitches();
        });
    });
})();

// Muestra u oculta la contrasena en los formularios de login y registro.
document.querySelectorAll('.toggle-password').forEach(function (boton) {
    boton.addEventListener('click', function () {
        var campo = document.getElementById(boton.getAttribute('data-target'));
        var icono = boton.querySelector('.material-symbols-outlined');
        if (campo.type === 'password') {
            campo.type = 'text';
            icono.textContent = 'visibility_off';
        } else {
            campo.type = 'password';
            icono.textContent = 'visibility';
        }
    });
});
