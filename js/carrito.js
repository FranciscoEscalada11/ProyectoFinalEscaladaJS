
const pintarCarrito =()=>{
    modalContainer.innerHTML= "";
    modalContainer.style.display= "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className= "modal-header";
    modalHeader.innerHTML=`
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    const modalButton = document.createElement("h1");
    modalButton.innerText= "X";
    modalButton.className= "modal-header-button";
    modalHeader.append(modalButton);

    modalButton.addEventListener("click" , ()=> {
        modalContainer.style.display = "none";
});

    carrito.forEach((product)=>{
        let carritoContent = document.createElement("div");
        carritoContent.className= "modal-content"
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>$ ${product.precio}</p>
        <p>Cantidad: ${product.cantidad}</p>
        <p>Total: ${product.cantidad * product.precio}</p>
        <span class="delete-product">X</span>
        `;

        modalContainer.append(carritoContent);

        let eliminar = carritoContent.querySelector(".delete-product")
        eliminar.addEventListener("click", ()=>{
            eliminarProducto(product.id);
        });

    })
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying= document.createElement("div");
    totalBuying.className= "total-content";
    totalBuying.innerHTML= `total a pagar: $ ${total}`;
    modalContainer.append(totalBuying);

    let buy =document.createElement("button");
    buy.className="buy";
    buy.innerText="finalizar compra"
    totalBuying.append(buy);
    let finalizar = totalBuying.querySelector(".buy");
    finalizar.addEventListener("click", ()=>{
        const finalizarCompra = document.getElementById("finalizarCompra");
        finalizarCompra.addEventListener('click', ()=>{
            Swal.fire({
                icon: 'success',
                title: 'Muchas gracias por su compra!!!',
                text: 'Ya estamos preparando su pedido',
                confirmButtonText: 'Seguir comprando'
            })
        })
    })
}
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto =(id)=>{
    const foundId= carrito.find((element)=> element.id === id);

    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};
const carritoCounter = ()=>{
    cantidadCarrito.style.display= "block";
    const carritoLegth= carrito.length;
    localStorage.setItem ("carritoLegth", JSON.stringify(carritoLegth));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLegth"));
};
carritoCounter();
