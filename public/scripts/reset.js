import { Toast } from "./toast.js";

document.querySelector("#resetForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.querySelector("#password").value;
  const confirm = document.querySelector("#confirm").value;
  const token = window.location.pathname.split("/").pop();

  if (!password || !confirm) {
    return Toast.fire({
      icon: "warning",
      title: "Todos los campos son obligatorios",
    });
  }

  if (password !== confirm) {
    return Toast.fire({
      icon: "error",
      title: "Las contraseñas no coinciden",
    });
  }

  try {
    const res = await fetch(`/api/auth/reset/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, confirm }),
    });

    const result = await res.json();

    if (res.ok) {
      Toast.fire({
        icon: "success",
        title: "Contraseña actualizada",
      });
      setTimeout(() => location.replace("/login"), 3000);
    } else {
      Toast.fire({
        icon: "error",
        title: result.error || "Error al actualizar",
      });
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Error del servidor",
    });
  }
});