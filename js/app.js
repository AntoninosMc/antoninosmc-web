// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Obtener todos los botones con la clase 'seleccionar-pizza'
  const botonesSeleccionar = document.querySelectorAll('.seleccionar-pizza');

  // Agregar un evento de clic a cada botón
  botonesSeleccionar.forEach(function (boton) {
      boton.addEventListener('click', function () {
          // Obtener el nombre de la pizza del atributo data-nombre
          const nombrePizza = boton.getAttribute('data-nombre');

          // Obtener el valor seleccionado del menú desplegable
          const tamañoSelect = boton.parentElement.querySelector('.tamaño-seleccion');
          console.log("tamañoSelect", tamañoSelect)
          const tamañoPizza = tamañoSelect.value;

          // Llamar a la función seleccionarPizza con los valores obtenidos
          seleccionarPizza(nombrePizza, tamañoPizza);
      });
  });

  // Si estamos en la página de 'pedidos.html', mostrar el resumen del pedido
  if (window.location.pathname.includes('pedidos.html')) {
      mostrarResumenPedido();
  }

  // Si estamos en la página de 'confirmacion.html', cargar la información del cliente
  if (window.location.pathname.includes('confirmacion.html')) {
      mostrarDatosConfirmacion();
      document.getElementById('formulario').addEventListener('submit', function (event) {
          event.preventDefault();
          guardarCliente();
      });
  }
});

// Función para seleccionar una pizza y guardar el nombre y tamaño seleccionados
function seleccionarPizza(nombrePizza, element) {
  
  // Definir el precio de acuerdo al nombre de la pizza y tamaño
  const tamañoPizza = element.parentElement.parentElement.querySelector("select").value
  const precioPizza = obtenerPrecio(nombrePizza, tamañoPizza);

  // Crear un objeto con los datos de la pizza elegida
  const pizzaElegida = {
      nombre: nombrePizza,
      tamaño: tamañoPizza,
      precio: precioPizza
  };

  // Guardar los datos de la pizza en localStorage
  localStorage.setItem('pizzaElegida', JSON.stringify(pizzaElegida));

  // Redirigir a la página de pedidos para mostrar el resumen
  window.location.href = 'pedidos.html';
}

// Función para obtener el precio según el nombre de la pizza y el tamaño
function obtenerPrecio(nombrePizza, tamaño) {
    console.log(nombrePizza, tamaño)
  const precios = {
      "margarita": { Personal: 17, Mediana: 25, Familiar: 30 },
      "pepperoni": { Personal: 18, Mediana: 26, Familiar: 32 },
      "cuatro-quesos": { Personal: 20, Mediana: 28, Familiar: 34 }
  };

  // Retorna el precio de la pizza por nombre y tamaño
  return precios[nombrePizza][tamaño];
}

// Función para mostrar el resumen del pedido en 'pedidos.html'
function mostrarResumenPedido() {
  const pizzaElegida = JSON.parse(localStorage.getItem('pizzaElegida'));
  const cantidadInput = document.getElementById('cantidad');
  const aumentarCantidad = document.getElementById('aumentar-cantidad');
  const disminuirCantidad = document.getElementById('disminuir-cantidad');
  const totalPrecio = document.getElementById('precio-total');

  if (pizzaElegida) {
      const precio = pizzaElegida.precio;
      let cantidad = parseInt(cantidadInput.value);

      function actualizarTotal() {
          const total = precio * cantidad;
          totalPrecio.textContent = `S/ ${total}`;
      }

      // Eventos para aumentar y disminuir la cantidad
      aumentarCantidad.addEventListener('click', function () {
          cantidad++;
          cantidadInput.value = cantidad;
          actualizarTotal();
      });

      disminuirCantidad.addEventListener('click', function () {
          if (cantidad > 1) {
              cantidad--;
              cantidadInput.value = cantidad;
              actualizarTotal();
          }
      });

      // Mostrar la información del pedido
      document.getElementById('pedido-info').innerHTML = `
          <p>Pizza: ${pizzaElegida.nombre}</p>
          <p>Tamaño Seleccionado: ${pizzaElegida.tamaño}</p>
          <p>Precio: S/ ${precio}</p>
      `;

      // Actualizar el total inicialmente
      actualizarTotal();
  } else {
      document.getElementById('pedido-info').innerHTML = '<p>No has seleccionado ninguna pizza aún.</p>';
  }
}

// Función para confirmar el pedido y pasar a la confirmación del cliente
function confirmarPedido() {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const pizzaElegida = JSON.parse(localStorage.getItem('pizzaElegida'));

  // Guardar la cantidad seleccionada en el pedido
  pizzaElegida.cantidad = cantidad;
  pizzaElegida.total = pizzaElegida.precio * cantidad;
  localStorage.setItem('pizzaElegida', JSON.stringify(pizzaElegida));

  // Redirigir a la página de confirmación
  window.location.href = 'confirmacion.html';
}

// Función para mostrar la información del pedido en la página de confirmación
function mostrarDatosConfirmacion() {
  const pizzaElegida = JSON.parse(localStorage.getItem('pizzaElegida'));
  if (pizzaElegida) {
      document.getElementById('confirmacion-pedido').innerHTML += `
          <div>
              <h3>Detalles del Pedido</h3>
              <p>Pizza: ${pizzaElegida.nombre}</p>
              <p>Tamaño: ${pizzaElegida.tamaño}</p>
              <p>Cantidad: ${pizzaElegida.cantidad}</p>
              <p>Total: S/ ${pizzaElegida.total}</p>
          </div>
      `;
  }
}

// Función para guardar los datos del cliente y mostrar un comprobante
function guardarCliente() {
  const nombre = document.getElementById('nombre').value;
  const direccion = document.getElementById('direccion').value;
  const celular = document.getElementById('celular').value;
  const correo = document.getElementById('correo').value;

  // Validar que todos los campos estén completos
  if (!nombre || !direccion || !celular || !correo) {
      alert('Por favor, completa todos los campos.');
      return;
  }

  const cliente = {
      nombre: nombre,
      direccion: direccion,
      celular: celular,
      correo: correo
  };

  const pizzaElegida = JSON.parse(localStorage.getItem('pizzaElegida'));

  const pedido = {
      cliente: cliente,
      pizza: pizzaElegida
  };

  // Guardar el pedido en un array en el localStorage
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  // Mostrar el comprobante en la misma página en lugar de redirigir
  const comprobante = `
      <div class="comprobante">
          <h3>¡Solicitud Enviada!</h3>
          <p>Cliente: ${cliente.nombre}</p>
          <p>Dirección: ${cliente.direccion}</p>
          <p>Celular: ${cliente.celular}</p>
          <p>Correo: ${cliente.correo}</p>
          <h4>Detalles de la Pizza</h4>
          <p>Pizza: ${pizzaElegida.nombre}</p>
          <p>Tamaño: ${pizzaElegida.tamaño}</p>
          <p>Cantidad: ${pizzaElegida.cantidad}</p>
          <p>Total: S/ ${pizzaElegida.total}</p>
      </div>
  `;

  // Inserta el comprobante en la página
  document.getElementById('confirmacion-pedido').innerHTML = comprobante;
}
