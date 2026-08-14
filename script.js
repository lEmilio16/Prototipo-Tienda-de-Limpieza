function buscarDireccion() {

    const direccion = document.getElementById("direccion").value.trim();

    if(!direccion){
        alert("Ingrese una dirección");
        return;
    }

    const mapa = document.getElementById("mapa");

    mapa.src =
        "https://maps.google.com/maps?q=" +
        encodeURIComponent(direccion) +
        "&output=embed";
}