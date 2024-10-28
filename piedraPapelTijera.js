// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

var partidas = 0;
var jugador = "";
var partidasTotales = document.getElementById("total");
var partidaActual = document.getElementById("actual");


// FUNCION INICIALIZAR EVENTOS
function inicializarEventos() {
	var botonJugar = document.getElementsByTagName("button")[0];
	console.log(botonJugar);
	botonJugar.addEventListener("click", jugar);
}
document.addEventListener ("DOMContentLoaded", inicializarEventos);


//FUNCION DE JUGAR
function jugar(){
	jugador = document.getElementsByName("nombre")[0]; // COMPROBACIÓN DEL COMIENZO DE LA PARTIDA
	console.log(jugador.value);

	partidas = document.getElementsByName("partidas")[0];
	console.log(partidas.value);

	if(jugador.value.length <= 2 || !isNaN(jugador.value.charAt(0))){
		console.log("nombre no valido");
		jugador.classList.add("fondoRojo");
	}

	else {
		jugador.classList.remove("fondoRojo");
	}

	if(partidas.value <= 0){
		console.log("partida no valida");
		partidas.classList.add("fondoRojo");
	}

	else {
		partidas.classList.remove("fondoRojo");
	}

    partidasTotales.textContent = partidas.value;

}



// IMAGENES DEL JUGADOR
 var imagenes = document.querySelectorAll('#jugador img');
 for (var i = 0; i < imagenes.length; i++) {
imagenes[i].src = 'img/' + posibilidades[i] +'Jugador' + '.png'; // AÑADIR IMÁGENES
        imagenes[i].addEventListener('click', function seleccionada() { // EVENTO CLICK ASOCIADO A LA FUNCIÓN SELECCIONADA

            for (var j = 0; j < imagenes.length; j++) { // les pongo a todas la clase no seleccionadas
                imagenes[j].classList.remove('seleccionado');
                imagenes[j].classList.add('noSeleccionado');
            }

            this.classList.remove('noSeleccionado'); //les pongo a la que se selecciona, la clase seleccionada
            this.classList.add('seleccionado');
			var indice = Array.from(imagenes).indexOf(this);
			tiradaJugador = posibilidades[indice];
			console.log(tiradaJugador);
        });
    }



// TIRADAS

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el botón "¡YA!" mediante la etiqueta h2
    var botonYa = document.querySelector('h2 button');

    // Agregar un evento de clic al botón
    botonYa.addEventListener('click', function(){
        // Obtener la imagen de la maquina
        var imagenMaquina = document.querySelector('#maquina img');

        // Generar un número aleatorio para seleccionar una imagen aleatoria
        var indiceAleatorio = Math.floor(Math.random() * 3);

		// Opción máquina
        var tiradaMaquina = posibilidades[indiceAleatorio];
		console.log(tiradaMaquina);

		// INFORMAR DE CUÁNTAS PARTIDAS VAN QUEDANDO
        var partidaActualNumero = parseInt(partidaActual.textContent) + 1;
        partidaActual.textContent = partidaActualNumero;

		if (partidaActualNumero >= parseInt(partidasTotales.textContent)) {
		botonYa.disabled = true; //DESHABILITAR EL BOTONYA PARA QUE NO PUEDA JUGAR MAS
		}

		var resultadoHistorial = resultado(tiradaJugador, tiradaMaquina);
		console.log(resultadoHistorial);
        // Cambiar el src de la imagen según el índice aleatorio
        imagenMaquina.src = 'img/' + posibilidades[indiceAleatorio] + "Ordenador" + '.png';

		// Mostrar historial
		var historial = document.getElementById("historial");
		var li = document.createElement("li");
		li.textContent = resultadoHistorial;
		historial.appendChild(li);

		function resultado(){
		if (tiradaJugador === tiradaMaquina) {
			return "Empate";
		}
		else if (
			(tiradaJugador === "piedra" & tiradaMaquina === "tijera") ||
			(tiradaJugador === "papel" & tiradaMaquina === "piedra") ||
			(tiradaJugador === "tijera" & tiradaMaquina === "papel")
			){
			return "Ganas";}
			else {
			return "Pierdes";
			}

	};

});
});




document.addEventListener("DOMContentLoaded", function() {
    var botonReset = document.querySelector("div button"); // Seleccionar el botón RESET

    botonReset.addEventListener("click", function() { // Agregar un evento de clic al botón RESET

	botonReset.addEventListener('click', () => {
    historial.innerHTML = '';
});

		// Reiniciar el valor del número de partidas jugadas
        var partidaActual = document.getElementById("actual");
        partidaActual.textContent = "0";

        // Reiniciar el valor del input de partidas
        var partidasTotales = document.getElementById("total");
        partidasTotales.textContent = "0";

        // Reiniciar el valor del input de nombre del jugador
        var jugador = document.getElementsByName("nombre")[0];
        jugador.value = "";
		var partidas = document.getElementsByName("partidas")[0];
		partidas.value = 0;

        // Reiniciar el estado de las imágenes del jugador
        var imagenes = document.querySelectorAll('#jugador img');
        for (var i = 0; i < imagenes.length; i++) {
            imagenes[i].classList.remove('seleccionado');
            imagenes[i].classList.add('noSeleccionado');
        }

        // Reiniciar el estado de la imagen de la máquina
        var imagenMaquina = document.querySelector('#maquina img');
        imagenMaquina.src = 'img/defecto.png';

        // Habilitar el botón ¡YA!
        var botonYa = document.querySelector('h2 button');
        botonYa.disabled = false;
    });
});