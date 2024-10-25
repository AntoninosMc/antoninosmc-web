const pizzas = [
    {
        id: "cuatro-quesos",
        img: "img/cuatro-quesos.png",
        alt: "Pizza Cuatro Quesos",
        title: "Cuatro Quesos",
        description: "Mix de 4 quesos, Salsa de Tomate, Tocino y Jamón.",
        price: "S/ 30.00"
    },
    {
        id: "pepperoni",
        img: "img/pepperoni.png",
        alt: "pepperoni",
        title: "Pepperoni",
        description: "Mix de 4 quesos, Salsa de Tomate, Tocino y Jamón.",
        price: "S/ 20.90"
    },
    {
        id: "margarita",
        img: "img/pizza-continentalle.png",
        alt: "pizza-continentalle",
        title: "Continentalle",
        description: "Queso Mozzarella, Jamón, Salsa de Tomate, Champiñones y Cebolla.",
        price: "S/ 49.90"
    },
    {
        id: "parrillera",
        img: "img/pizza-parrillera.png",
        alt: "pizza-parrillera",
        title: "Parrillera",
        description: "Mix de 4 quesos, Salsa de Tomate, Tocino y Jamón.",
        price: "S/ 30.00"
    },
    {
        id: "veggie-6-quesos",
        img: "img/veggie-6-quesos.png",
        alt: "veggie-6-quesos",
        title: "Veggie 6 Quesos",
        description: "Chorizo en finas hierbas son salsa de chimichurri y pimiento rojo, sobre salsa de ajo y queso mozarella.",
        price: "S/ 39.90"
    },
    {
        id: "pizza-all-the-meats",
        img: "img/pizza-all-the-meats_1.png",
        alt: "pizza-all-the-meats",
        title: "All The Meats",
        description: "Queso Mozzarella, Salsa de Tomate, Pepperoni, Carne de Res y Salchicha de Cerdo.",
        price: "S/ 29.90"
    },
    {
        id: "pizza-the-works",
        img: "img/pizza-the-works.png",
        alt: "pizza-the-works",
        title: "The Works",
        description: "Queso Mozarella, Salsa de Tomate, Pepperoni, Cebolla blanca, Pimientos verdes, Champiñones y Aceitunas negras.",
        price: "S/ 30.00"
    },
    {
        id: "pizza-la-favorita",
        img: "img/pizza-la-favorita.png",
        alt: "pizza-la-favorita",
        title: "La Favorita",
        description: "6 Quesos,  Salsa de Tomate, Salchicha de Cerdo y Sazonador italiano.",
        price: "S/ 43.00"
    },
    {
        id: "pizza-espanola",
        img: "img/pizza-espanola.png",
        alt: "pizza-espanola",
        title: "Española",
        description: "Queso mozarella, Base de salsa de mantequilla y ajo, Cebolla blanca, Aceitunas verdes y Aceitunas negras.",
        price: "S/ 24.90"
    },
]

const masVendidos = ["cuatro-quesos", "pepperoni", "margarita"]
const pizzasContainer = document.querySelector("#pizzas-container")

function renderPizzas() {
    let data = pizzas;

    if (pizzasContainer.dataset.masvendidos) {
        data = pizzas.filter((pizza) => masVendidos.includes(pizza.id))
    }

    for (let pizza of data) {
        const div = document.createElement("div")
        div.classList.add("pizza")
        div.id = pizza.id

        const divPizzaText = document.createElement("div")
        divPizzaText.classList.add("pizza-text")

        div.appendChild(divPizzaText)

        const image = document.createElement("img")
        image.src = pizza.img
        image.alt = pizza.alt

        const title = document.createElement("h3")
        title.textContent = pizza.title

        const description = document.createElement("p")
        description.textContent = pizza.description

        const label = document.createElement("label")
        label.textContent = "Tamaño:"
        label.htmlFor = "tamaño-cuatro-quesos"

        const select = document.createElement("select")
        select.classList.add("tamaño-seleccion")

        const optionPersonal = document.createElement("option")
        optionPersonal.value = "Personal"
        optionPersonal.textContent = "Personal"

        const optionMediana = document.createElement("option")
        optionMediana.value = "Mediana"
        optionMediana.textContent = "Mediana"

        const optionFamiliar = document.createElement("option")
        optionFamiliar.value = "Familiar"
        optionFamiliar.textContent = "Familiar"

        select.appendChild(optionPersonal)
        select.appendChild(optionMediana)
        select.appendChild(optionFamiliar)

        const divPrecio = document.createElement("div")
        divPrecio.classList.add("precio")

        const span = document.createElement("span")
        span.textContent = pizza.price

        const button = document.createElement("button")
        button.textContent = "Seleccionar"

        button.addEventListener("click", function () {
            seleccionarPizza(pizza.id, this)
        })

        divPizzaText.appendChild(image)
        divPizzaText.appendChild(title)
        divPizzaText.appendChild(description)
        divPizzaText.appendChild(label)
        divPizzaText.appendChild(select)
        divPizzaText.appendChild(divPrecio)
        divPrecio.appendChild(span)
        divPrecio.appendChild(button)

        pizzasContainer.appendChild(div)
    }
}

renderPizzas()



