// Función para mostrar los pedidos en 'dashboard.html'
function mostrarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const tablaPedidosBody = document.querySelector('#tabla-pedidos tbody');

    // Limpiar el cuerpo de la tabla antes de actualizar
    tablaPedidosBody.innerHTML = '';

    // Ordenar los pedidos para mostrar el más reciente primero
    const pedidosOrdenados = pedidos.reverse();

    pedidosOrdenados.forEach((pedido, index) => {
        // Verificar que el pedido y sus datos existen antes de intentar mostrarlos
        if (pedido && pedido.cliente && pedido.pizza) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${pedido.cliente.nombre || 'No disponible'}</td>
                <td>${pedido.cliente.direccion || 'No disponible'}</td>
                <td>${pedido.cliente.celular || 'No disponible'}</td>
                <td>${pedido.cliente.correo || 'No disponible'}</td>
                <td>${pedido.pizza.nombre || 'No disponible'}</td>
                <td>${pedido.pizza.tamaño || 'No disponible'}</td>
                <td>${pedido.pizza.cantidad || '1'}</td>
                <td>S/ ${pedido.pizza.total || pedido.pizza.precio}</td>
            `;
            tablaPedidosBody.appendChild(fila);
        }
    });
}

// Para actualizar la tabla manualmente con un botón
document.addEventListener('DOMContentLoaded', function () {
    const botonActualizar = document.getElementById('actualizar');
    if (botonActualizar) {
        botonActualizar.addEventListener('click', mostrarPedidos);
    }
});

