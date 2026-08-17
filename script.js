/* =========================================================
   LimpioMax — Prototipo de tienda de productos de limpieza
   Todo lo que el cliente debe personalizar está marcado
   con // CONFIGURAR. No es necesario tocar el resto del
   archivo para adaptarlo a un negocio real.
   ========================================================= */

const CONFIG = {
    NEGOCIO: {
        nombre: "LimpioMax", // CONFIGURAR
        eslogan: "Todo para la limpieza de tu hogar y tu negocio", // CONFIGURAR
        telefono: "529991234567", // CONFIGURAR (52 + 10 dígitos, sin +, sin espacios)
        direccionTexto: "Villahermosa, Tabasco", // CONFIGURAR (dirección o referencia a mostrar en el mapa por defecto)
        horario: "Lunes a Sábado · 8:00 AM – 7:00 PM" // CONFIGURAR
    },
    ENVIO_GRATIS_DESDE: 500 // CONFIGURAR (monto en pesos; poner 0 para desactivar el aviso)
};

/* Catálogo de demostración. Datos genéricos y reutilizables:
   solo se necesita editar CONFIG arriba para adaptar el
   prototipo a un negocio real; el catálogo puede quedarse
   igual como ejemplo o reemplazarse producto por producto. */
const PRODUCTOS = [
    // Cloro y Desinfectantes
    { id: 1, categoria: "cloro", nombre: "Cloro Regular 1L", precio: 22, unidad: "botella", icono: "🧴" },
    { id: 2, categoria: "cloro", nombre: "Cloro Concentrado 1L", precio: 32, unidad: "botella", icono: "🧴" },
    { id: 3, categoria: "cloro", nombre: "Desinfectante Multiusos 1L", precio: 45, unidad: "botella", icono: "🧫" },
    { id: 4, categoria: "cloro", nombre: "Desinfectante Aroma Lavanda 1L", precio: 48, unidad: "botella", icono: "🧫" },
    { id: 5, categoria: "cloro", nombre: "Alcohol en Gel 500ml", precio: 55, unidad: "botella", icono: "🧴" },

    // Detergentes y Jabón
    { id: 6, categoria: "detergentes", nombre: "Detergente en Polvo 1kg", precio: 38, unidad: "bolsa", icono: "🧼" },
    { id: 7, categoria: "detergentes", nombre: "Detergente Líquido 1L", precio: 42, unidad: "botella", icono: "🧴" },
    { id: 8, categoria: "detergentes", nombre: "Jabón de Trastes 750ml", precio: 28, unidad: "botella", icono: "🍽️" },
    { id: 9, categoria: "detergentes", nombre: "Jabón en Barra Multiusos", precio: 15, unidad: "pieza", icono: "🧼" },
    { id: 10, categoria: "detergentes", nombre: "Suavizante de Telas 1L", precio: 40, unidad: "botella", icono: "🧺" },

    // Aromatizantes
    { id: 11, categoria: "aromatizantes", nombre: "Aromatizante en Spray 400ml", precio: 35, unidad: "botella", icono: "🌸" },
    { id: 12, categoria: "aromatizantes", nombre: "Pastillas para Baño", precio: 20, unidad: "paquete", icono: "🌺" },
    { id: 13, categoria: "aromatizantes", nombre: "Sachet Aromático para Closet", precio: 18, unidad: "pieza", icono: "🌼" },
    { id: 14, categoria: "aromatizantes", nombre: "Difusor de Varillas 200ml", precio: 65, unidad: "pieza", icono: "🪔" },

    // Papel y Desechables
    { id: 15, categoria: "papel", nombre: "Papel Higiénico 12 rollos", precio: 85, unidad: "paquete", icono: "🧻" },
    { id: 16, categoria: "papel", nombre: "Toallas de Papel 2 rollos", precio: 45, unidad: "paquete", icono: "🧻" },
    { id: 17, categoria: "papel", nombre: "Servilletas 200 pzas", precio: 30, unidad: "paquete", icono: "🧻" },
    { id: 18, categoria: "papel", nombre: "Bolsas de Basura 30pzas", precio: 32, unidad: "paquete", icono: "🗑️" },
    { id: 19, categoria: "papel", nombre: "Guantes de Látex 10 pares", precio: 50, unidad: "caja", icono: "🧤" },

    // Utensilios de Limpieza
    { id: 20, categoria: "utensilios", nombre: "Trapeador Industrial", precio: 120, unidad: "pieza", icono: "🧹" },
    { id: 21, categoria: "utensilios", nombre: "Escoba con Recogedor", precio: 95, unidad: "set", icono: "🧹" },
    { id: 22, categoria: "utensilios", nombre: "Cubeta con Exprimidor 12L", precio: 150, unidad: "pieza", icono: "🪣" },
    { id: 23, categoria: "utensilios", nombre: "Franelas Microfibra 5pzas", precio: 60, unidad: "paquete", icono: "🧽" },
    { id: 24, categoria: "utensilios", nombre: "Esponjas Multiusos 6pzas", precio: 25, unidad: "paquete", icono: "🧽" },

    // Paquetes y Ofertas
    { id: 25, categoria: "paquetes", nombre: "Kit Limpieza para Hogar", precio: 280, unidad: "kit", icono: "📦" },
    { id: 26, categoria: "paquetes", nombre: "Kit Limpieza para Negocio", precio: 520, unidad: "kit", icono: "📦" },
    { id: 27, categoria: "paquetes", nombre: "Paquete Cocina (jabón + franelas + esponjas)", precio: 95, unidad: "paquete", icono: "📦" }
];

const CATEGORIAS = [
    { id: "cloro", nombre: "Cloro y Desinfectantes" },
    { id: "detergentes", nombre: "Detergentes y Jabón" },
    { id: "aromatizantes", nombre: "Aromatizantes" },
    { id: "papel", nombre: "Papel y Desechables" },
    { id: "utensilios", nombre: "Utensilios de Limpieza" },
    { id: "paquetes", nombre: "Paquetes y Ofertas" }
];

let categoriaActiva = "cloro";
let carrito = {}; // { productoId: cantidad }

/* ---------- Utilidades ---------- */
function formatoPrecio(valor) {
    return "$" + valor.toFixed(0);
}

function totalCarrito() {
    let total = 0;
    for (const id in carrito) {
        const producto = PRODUCTOS.find(p => p.id === Number(id));
        if (producto) total += producto.precio * carrito[id];
    }
    return total;
}

function totalArticulos() {
    return Object.values(carrito).reduce((acc, cant) => acc + cant, 0);
}

/* ---------- Render de categorías (tabs) ---------- */
function renderTabs() {
    const cont = document.getElementById("tabs");
    cont.innerHTML = "";
    CATEGORIAS.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "tab-btn" + (cat.id === categoriaActiva ? " activo" : "");
        btn.textContent = cat.nombre;
        btn.setAttribute("data-cat", cat.id);
        btn.addEventListener("click", () => {
            categoriaActiva = cat.id;
            renderTabs();
            renderProductos();
        });
        cont.appendChild(btn);
    });
}

/* ---------- Render de productos ---------- */
function renderProductos() {
    const grid = document.getElementById("grid-productos");
    grid.innerHTML = "";

    const productosFiltrados = PRODUCTOS.filter(p => p.categoria === categoriaActiva);

    productosFiltrados.forEach(producto => {
        const cantidadActual = carrito[producto.id] || 0;

        const card = document.createElement("div");
        card.className = "card-producto";
        card.innerHTML = `
            <div class="card-icono">${producto.icono}</div>
            <div class="card-info">
                <h3>${producto.nombre}</h3>
                <p class="card-precio">${formatoPrecio(producto.precio)} <span>/ ${producto.unidad}</span></p>
            </div>
            <div class="card-acciones">
                <button class="btn-cantidad" data-accion="restar" aria-label="Quitar uno">−</button>
                <span class="cantidad" id="cant-${producto.id}">${cantidadActual}</span>
                <button class="btn-cantidad" data-accion="sumar" aria-label="Agregar uno">+</button>
            </div>
        `;

        card.querySelector('[data-accion="sumar"]').addEventListener("click", () => cambiarCantidad(producto.id, 1));
        card.querySelector('[data-accion="restar"]').addEventListener("click", () => cambiarCantidad(producto.id, -1));

        grid.appendChild(card);
    });
}

function cambiarCantidad(id, delta) {
    const actual = carrito[id] || 0;
    const nueva = Math.max(0, actual + delta);

    if (nueva === 0) {
        delete carrito[id];
    } else {
        carrito[id] = nueva;
    }

    const span = document.getElementById(`cant-${id}`);
    if (span) span.textContent = nueva;

    actualizarBarraCotizacion();
    renderPanelCotizacion();
}

/* ---------- Panel / barra de cotización flotante ---------- */
function actualizarBarraCotizacion() {
    const barra = document.getElementById("barra-cotizacion");
    const contador = document.getElementById("contador-articulos");
    const totalTexto = document.getElementById("total-barra");

    const items = totalArticulos();

    if (items > 0) {
        barra.classList.add("visible");
    } else {
        barra.classList.remove("visible");
    }

    contador.textContent = items;
    totalTexto.textContent = formatoPrecio(totalCarrito());
}

function renderPanelCotizacion() {
    const lista = document.getElementById("lista-cotizacion");
    lista.innerHTML = "";

    const ids = Object.keys(carrito);

    if (ids.length === 0) {
        lista.innerHTML = `<p class="cotizacion-vacia">Aún no has agregado productos.</p>`;
    } else {
        ids.forEach(id => {
            const producto = PRODUCTOS.find(p => p.id === Number(id));
            if (!producto) return;
            const cantidad = carrito[id];

            const fila = document.createElement("div");
            fila.className = "fila-cotizacion";
            fila.innerHTML = `
                <span class="fila-icono">${producto.icono}</span>
                <span class="fila-nombre">${producto.nombre}</span>
                <span class="fila-cantidad">x${cantidad}</span>
                <span class="fila-subtotal">${formatoPrecio(producto.precio * cantidad)}</span>
            `;
            lista.appendChild(fila);
        });
    }

    document.getElementById("total-panel").textContent = formatoPrecio(totalCarrito());

    const avisoEnvio = document.getElementById("aviso-envio");
    if (CONFIG.ENVIO_GRATIS_DESDE > 0) {
        const faltante = CONFIG.ENVIO_GRATIS_DESDE - totalCarrito();
        if (totalCarrito() === 0) {
            avisoEnvio.textContent = "";
        } else if (faltante > 0) {
            avisoEnvio.textContent = `Te faltan ${formatoPrecio(faltante)} para envío gratis`;
        } else {
            avisoEnvio.textContent = "¡Tu pedido tiene envío gratis! 🎉";
        }
    } else {
        avisoEnvio.textContent = "";
    }
}

function togglePanelCotizacion(forzar) {
    const panel = document.getElementById("panel-cotizacion");
    const abierto = panel.classList.contains("abierto");
    const debeAbrir = forzar !== undefined ? forzar : !abierto;

    if (debeAbrir) {
        panel.classList.add("abierto");
        panel.setAttribute("aria-hidden", "false");
    } else {
        panel.classList.remove("abierto");
        panel.setAttribute("aria-hidden", "true");
    }
}

/* ---------- WhatsApp ---------- */
function enviarCotizacionWhatsApp() {
    const ids = Object.keys(carrito);

    let mensaje = `Hola, quiero hacer un pedido en ${CONFIG.NEGOCIO.nombre}:%0A%0A`;

    if (ids.length === 0) {
        mensaje = `Hola, me gustaría más información sobre sus productos de ${CONFIG.NEGOCIO.nombre}`;
    } else {
        ids.forEach(id => {
            const producto = PRODUCTOS.find(p => p.id === Number(id));
            if (!producto) return;
            const cantidad = carrito[id];
            mensaje += `• ${producto.nombre} x${cantidad} — ${formatoPrecio(producto.precio * cantidad)}%0A`;
        });
        mensaje += `%0ATotal: ${formatoPrecio(totalCarrito())}`;
    }

    const url = `https://wa.me/${CONFIG.NEGOCIO.telefono}?text=${mensaje}`;
    window.open(url, "_blank");
}

function pedidoRapidoWhatsApp() {
    const mensaje = encodeURIComponent(`Hola, quiero hacer un pedido en ${CONFIG.NEGOCIO.nombre}`);
    window.open(`https://wa.me/${CONFIG.NEGOCIO.telefono}?text=${mensaje}`, "_blank");
}

/* ---------- Google Maps (funciona con cualquier dirección) ---------- */
function actualizarMapa(direccion) {
    const mapa = document.getElementById("mapa");
    if (!direccion || !direccion.trim()) return;
    mapa.src = "https://maps.google.com/maps?q=" + encodeURIComponent(direccion.trim()) + "&output=embed";
}

function buscarDireccion() {
    const input = document.getElementById("direccion");
    const direccion = input.value.trim();

    if (!direccion) {
        alert("Escribe una dirección para buscarla en el mapa");
        return;
    }

    actualizarMapa(direccion);
}

/* ---------- Inicialización ---------- */
function inicializar() {
    document.getElementById("nombre-negocio").textContent = CONFIG.NEGOCIO.nombre;
    document.getElementById("nombre-negocio-footer").textContent = CONFIG.NEGOCIO.nombre;
    document.getElementById("eslogan-negocio").textContent = CONFIG.NEGOCIO.eslogan;
    document.getElementById("horario-negocio").textContent = CONFIG.NEGOCIO.horario;

    document.querySelectorAll(".telefono-visible").forEach(el => {
        el.textContent = CONFIG.NEGOCIO.telefono.replace(/^52/, "");
    });

    document.querySelectorAll(".btn-whatsapp-directo").forEach(btn => {
        btn.addEventListener("click", pedidoRapidoWhatsApp);
    });

    document.getElementById("btn-buscar-direccion").addEventListener("click", buscarDireccion);
    document.getElementById("direccion").addEventListener("keydown", (e) => {
        if (e.key === "Enter") buscarDireccion();
    });

    document.getElementById("barra-cotizacion").addEventListener("click", () => togglePanelCotizacion(true));
    document.getElementById("btn-cerrar-cotizacion").addEventListener("click", () => togglePanelCotizacion(false));
    document.getElementById("btn-enviar-cotizacion").addEventListener("click", enviarCotizacionWhatsApp);

    // Cierra el panel si se toca fuera de él (en escritorio)
    document.addEventListener("click", (e) => {
        const panel = document.getElementById("panel-cotizacion");
        const barra = document.getElementById("barra-cotizacion");
        if (
            panel.classList.contains("abierto") &&
            !panel.contains(e.target) &&
            !barra.contains(e.target)
        ) {
            togglePanelCotizacion(false);
        }
    });

    renderTabs();
    renderProductos();
    renderPanelCotizacion();
    actualizarMapa(CONFIG.NEGOCIO.direccionTexto);
}

document.addEventListener("DOMContentLoaded", inicializar);