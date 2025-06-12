import { Toast } from "./toast.js";

document.addEventListener("DOMContentLoaded", () => {
  window.removeOne = async (product_id) => {
    const res = await fetch(`/api/carts/remove-one`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ product_id }),
    });

    const result = await res.json();

    if (res.ok) {
      Toast.fire({
        icon: "success",
        title: "Unidad eliminada del carrito",
      });

      const qtyElem = document.querySelector(`#qty-${product_id}`);
      const card = document.querySelector(`#card-${product_id}`);

      if (result.response && result.response.quantity > 0) {
        if (qtyElem) {
          qtyElem.textContent = `Cantidad: ${result.response.quantity}`;
        }
      } else {
        if (card) {
          card.remove();
        }

        if (document.querySelectorAll(".card").length === 0) {
          const main = document.querySelector("main");
          main.innerHTML = `<h1 class="bg-dark-subtle p-3 text-center text-dark w-100 mb-4">MI CARRITO</h1> <p class="text-center text-muted">Carrito vacio</p>`;
        }
      }
    } else {
      Toast.fire({
        icon: "error",
        title: result.error || "No se pudo eliminar",
      });
    }
  };

  window.removeAll = async (product_id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar todas las unidades?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`/api/carts/remove-all`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ product_id }),
    });

    const result = await res.json();

    if (res.ok) {
      Toast.fire({
        icon: "success",
        title: "Producto eliminado del carrito",
      });

      const card = document.querySelector(`#card-${product_id}`);
      if (card) {
        card.remove();
      }

      if (document.querySelectorAll(".card").length === 0) {
        const main = document.querySelector("main");
        main.innerHTML = `<h1 class="bg-dark-subtle p-3 text-center text-dark w-100 mb-4">MI CARRITO</h1> <p class="text-center text-muted">Carrito vacio</p>`;
      }
    } else {
      Toast.fire({
        icon: "error",
        title: result.error || "No se pudo eliminar",
      });
    }
  };
});
