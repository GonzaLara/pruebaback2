import { Toast } from "./toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addToCart");
  if (!addButton) return;

  addButton.addEventListener("click", async () => {
    const pid = addButton.dataset.pid;
    const stock = parseInt(addButton.dataset.stock);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (quantity < 1 || quantity > stock) {
      Swal.fire("Error", "Cantidad invalida", "error");
      return;
    }

    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ product_id: pid, quantity }),
      });

      const result = await response.json();

      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: "Producto agregado al carrito",
        });
      } else {
        Swal.fire("Error", result.error || "No se pudo agregar", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  });
});