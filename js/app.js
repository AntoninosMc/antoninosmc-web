// scripts.js

// Función para seleccionar pizza y almacenar en localStorage
function seleccionarPizza(pizza) {
  localStorage.setItem('pizzaSeleccionada', pizza);
  window.location.href = 'pedido.html'; // Redirige a la página de pedido
}

// Función para cargar los detalles del pedido en la página de pedido.html
function cargarPedido() {
  const pizza = localStorage.getItem('pizzaSeleccionada');
  if (!pizza) {
    window.location.href = 'index.html'; // Si no hay pizza seleccionada, volver a la página de inicio
  } else {
    document.getElementById('pedido-info').innerText = `Pizza seleccionada: ${pizza}`;
    document.getElementById('precio-total').innerText = "S/ 25.00"; // Aquí podrías hacer la lógica del precio dinámico
  }
}

// Si estamos en la página de pedido, cargar los datos del pedido
if (document.getElementById('pedido-info')) {
  cargarPedido();
}

// Función para confirmar el pedido y redirigir a la página de confirmación
function confirmarPedido() {
  window.location.href = 'confirmacion.html';
}

// Función para empezar un nuevo pedido
function nuevoPedido() {
  localStorage.clear(); // Limpiar el almacenamiento para iniciar un nuevo pedido
  window.location.href = 'index.html';
}
