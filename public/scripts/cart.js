import { Toast } from "./toast.js";

document.addEventListener("DOMContentLoaded", () => {
  window.removeOne = async (product_id) => {
    const res = await fetch(`/api/carts/remove-one`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ product_id }),
    });

    if (res.ok) {
      Toast.fire({
        icon: "success",
        title: "Unidad eliminada del carrito",
      });
      setTimeout(() => location.reload(), 2000);
    } else {
      const result = await res.json();
      Swal.fire("Error", result.error || "No se pudo eliminar", "error");
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

    if (res.ok) {
      Toast.fire({
        icon: "success",
        title: "Producto eliminado del carrito",
      });
      setTimeout(() => location.reload(), 1600);
    } else {
      const result = await res.json();
      Swal.fire("Error", result.error || "No se pudo eliminar", "error");
    }
  };
});
