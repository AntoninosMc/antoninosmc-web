document.addEventListener('DOMContentLoaded', function() {
  cargarMenu();

  function cargarMenu() {
    fetch('pizzas.json')
      .then(response => response.json())
      .then(data => {
        const pizzasContainer = document.getElementById('pizzas');
        if (data.pizzas && data.pizzas.length > 0) {
          data.pizzas.forEach(pizza => {
            const pizzaElement = document.createElement('div');
            
            const imagenPizza = pizza.imagen ? `01/${pizza.imagen}` : 'placeholder.jpg';
            
            pizzaElement.innerHTML = `
              <img src="${imagenPizza}" alt="${pizza.nombre}" onerror="this.src='placeholder.jpg';">
              <h3>${pizza.nombre}</h3>
              <p>${pizza.descripcion}</p>
              <p>Precio Base: S/ ${pizza.precioBase.bipersonal} (Bipersonal)</p>
              <button onclick="seleccionarPizza('${pizza.nombre}')">Seleccionar</button>
            `;
            pizzasContainer.appendChild(pizzaElement);
          });
        } else {
          pizzasContainer.innerHTML = '<p>No se encontraron pizzas en el menú.</p>';
        }
      })
      .catch(error => {
        console.error('Error cargando las pizzas:', error);
        document.getElementById('pizzas').innerHTML = '<p>Error al cargar el menú.</p>';
      });
  }

  function seleccionarPizza(nombrePizza) {
    if (!nombrePizza) {
      console.error('No se seleccionó ninguna pizza.');
      return;
    }

    localStorage.setItem('pizzaSeleccionada', nombrePizza);
    const pizzaGuardada = localStorage.getItem('pizzaSeleccionada');
    if (pizzaGuardada) {
      window.location.href = 'pedido.html';
    } else {
      console.error('Error al almacenar la pizza seleccionada en LocalStorage.');
    }
  }

  if (document.getElementById('pedido-form')) {
    cargarPedido();
    manejarSubmit();
  }

  function cargarPedido() {
    const pizzaSeleccionada = localStorage.getItem('pizzaSeleccionada');
    
    if (!pizzaSeleccionada) {
      window.location.href = 'index.html';
      return;
    }

    fetch('pizzas.json')
      .then(response => response.json())
      .then(data => {
        const pizza = data.pizzas.find(p => p.nombre === pizzaSeleccionada);
        if (!pizza) {
          document.getElementById('pizza-info').innerHTML = '<p>No se encontró la pizza seleccionada.</p>';
          return;
        }

        const pizzaInfo = document.getElementById('pizza-info');
        pizzaInfo.innerHTML = `
          <h3>Pizza: ${pizza.nombre}</h3>
          <p>${pizza.descripcion}</p>
        `;

        const ingredientesEstandar = document.getElementById('ingredientes-estandar');
        pizza.ingredientes.forEach(ingrediente => {
          ingredientesEstandar.innerHTML += `<p>${ingrediente}</p>`;
        });

        const ingredientesOpcionales = document.getElementById('ingredientes-opcionales');
        data.ingredientesOpcionales.forEach(ingrediente => {
          ingredientesOpcionales.innerHTML += `
            <input type="checkbox" id="${ingrediente.nombre}" name="ingrediente" value="${ingrediente.nombre}">
            <label for="${ingrediente.nombre}">${ingrediente.nombre}</label>
            <select>
              <option value="leveTentacion">Leve Tentación (S/ ${ingrediente.precios.leveTentacion})</option>
              <option value="equilibrioSabroso">Equilibrio Sabroso (S/ ${ingrediente.precios.equilibrioSabroso})</option>
              <option value="festinCompleto">Festín Completo (S/ ${ingrediente.precios.festinCompleto})</option>
            </select>
            <br>
          `;
        });
      })
      .catch(error => {
        console.error('Error cargando los datos de la pizza:', error);
        document.getElementById('pizza-info').innerHTML = '<p>Error al cargar la información de la pizza.</p>';
      });
  }

  function manejarSubmit() {
    const form = document.getElementById('pedido-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const tamanoPizza = document.getElementById('tamano-pizza').value;
      const ingredientesSeleccionados = [];
      const checkboxes = document.querySelectorAll('input[name="ingrediente"]:checked');

      if (checkboxes.length === 0) {
        alert('Por favor, seleccione al menos un ingrediente opcional.');
        return;
      }

      checkboxes.forEach(checkbox => {
        const cantidad = checkbox.nextElementSibling.value;
        ingredientesSeleccionados.push({
          nombre: checkbox.value,
          cantidad: cantidad
        });
      });

      const pizzaSeleccionada = localStorage.getItem('pizzaSeleccionada');
      if (!pizzaSeleccionada) {
        alert('No hay pizza seleccionada. Por favor, vuelva al menú.');
        window.location.href = 'index.html';
        return;
      }

      const pedido = {
        pizza: pizzaSeleccionada,
        tamano: tamanoPizza,
        ingredientes: ingredientesSeleccionados
      };

      localStorage.setItem('pedido', JSON.stringify(pedido));
      window.location.href = 'confirmacion.html';
    });
  }

  if (document.getElementById('pedido-resumen')) {
    cargarResumen();
  }

  function cargarResumen() {
    const pedido = JSON.parse(localStorage.getItem('pedido'));
    const resumenElement = document.getElementById('pedido-resumen');
    if (!pedido) {
      resumenElement.innerHTML = '<p>No se ha encontrado ningún pedido.</p>';
      return;
    }

    let precioFinal = 0;

    fetch('pizzas.json')
      .then(response => response.json())
      .then(data => {
        const pizza = data.pizzas.find(p => p.nombre === pedido.pizza);
        if (!pizza) {
          resumenElement.innerHTML = '<p>No se encontró la pizza seleccionada.</p>';
          return;
        }

        const precioBase = pizza.precioBase[pedido.tamano];
        precioFinal = precioBase;

        resumenElement.innerHTML = `<h3>Pizza: ${pedido.pizza} (${pedido.tamano})</h3>`;
        resumenElement.innerHTML += `<p>Precio Base: S/ ${precioBase}</p>`;

        pedido.ingredientes.forEach(ingrediente => {
          const ingredienteData = data.ingredientesOpcionales.find(i => i.nombre === ingrediente.nombre);
          if (ingredienteData) {
            const precioIngrediente = ingredienteData.precios[ingrediente.cantidad];
            precioFinal += precioIngrediente;
            resumenElement.innerHTML += `<p>${ingrediente.nombre} (${ingrediente.cantidad}): S/ ${precioIngrediente}</p>`;
          }
        });

        resumenElement.innerHTML += `<h3>Precio Total: S/ ${precioFinal.toFixed(2)}</h3>`;
      })
      .catch(error => {
        console.error('Error cargando el resumen del pedido:', error);
        resumenElement.innerHTML = '<p>Error al cargar el resumen del pedido.</p>';
      });
  }
});
