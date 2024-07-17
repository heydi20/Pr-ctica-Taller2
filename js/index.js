let productos = [];

const agregarProducto = (id, producto, precio) =>{
    let indice = productos.findIndex(p => p.id == id);

    if (indice != -1) {
        productos[indice].cantidad++;
        putJSON(productos[indice])
    } else {

        postJSON(
            {
                id: id,
                producto: producto,
                precio: precio,
                cantidad: 1,
            }
        )
    }

    console.log(productos);
    // No se llama actualizarTabla() aquí para evitar duplicados en la tabla.
    actualizarTabla()
}

const actualizarTabla = ()=> {
    let tbody = document.getElementById('tbody');
    let total = 0;

    tbody.innerHTML = '';

    for (let item of productos) {
        let fila = tbody.insertRow();

        let celdaProducto = fila.insertCell(0);
        let celdaCantidad = fila.insertCell(1);
        let celdaPrecio = fila.insertCell(2);
        let celdaTotal = fila.insertCell(3)
        let celdaBoton = fila.insertCell(4);

        celdaPrecio.textContent = item.precio;
        celdaCantidad.textContent = item.cantidad;
        celdaProducto.textContent = item.producto;
        celdaTotal.textContent = item.precio * item.cantidad

        let boton = document.createElement('button');
        boton.textContent = 'Borrar';
        celdaBoton.append(boton);

        boton.addEventListener("click", function () {
            eliminar(item.id); // Cambiado a eliminar por id
        });

        total = total + item.precio * item.cantidad;
    }
    document.getElementById('total').textContent = total;
}

const eliminar = (id) => { // Cambiado el argumento a id
    let indice = productos.findIndex(p => p.id == id);
    console.log(indice);
    if (indice != -1) {
        productos.splice(indice, 1);
       
        actualizarTabla();
        deleteJSON(id)

    }
}

/////////////GUARDAR/////////////////////////////////////////////////
async function postJSON(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

////////////////////////////////////////////////////////
//////////// CARGAR
async function getJSON(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos`, {
            method: "GET", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),

        });

        const result = await response.json();
        console.log("Success:", result);

        productos = result
        actualizarTabla()
        
    } catch (error) {
        console.error("Error:", error);
    }
}

window.onload = function () {
    getJSON();

};

/////////////////////////////////////////////////////////////////
//////////////// ACTUALIZAR
async function putJSON(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${data.id}`, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),

        });

        const result = await response.json();
        console.log("Success:", result);

       
        
    } catch (error) {
        console.error("Error:", error);
    }
}

/////////////////////////////////////////////////////////////////
//////////////// ELIMINAR
async function deleteJSON(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${data}`, {
            method: "DELETE", // or 'PUT'
            

        });

        const result = await response.json();
        console.log("Success:", result);
        
    } catch (error) {
        console.error("Error:", error);
    }
}