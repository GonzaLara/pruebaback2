document.addEventListener("DOMContentLoaded", () => {
  window.removeOne = async (product_id) => {
    const res = await fetch(`/api/carts/remove-one`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ product_id }),
    });
    if (res.ok) location.reload();
    else {
      const result = await res.json();
      alert((result.error || "No se pudo eliminar"));
    }
  };

  window.removeAll = async (product_id) => {
    const res = await fetch(`/api/carts/remove-all`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ product_id }),
    });
    if (res.ok) location.reload();
    else {
      const result = await res.json();
      alert((result.error || "No se pudo eliminar"));
    }
  };
});
