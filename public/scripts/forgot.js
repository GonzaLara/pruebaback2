import { Toast } from "./toast.js";

document.querySelector("#send").addEventListener("click", async () => {
  const email = document.querySelector("#email").value;

  if (!email) {
    return Toast.fire({
      icon: "warning",
      title: "Se necesita un correo",
    });
  }

  const res = await fetch("/api/auth/send-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: "Correo enviado",
    });
    setTimeout(() => location.replace("/login"), 3000);
  } else {
    Toast.fire({
      icon: "error",
      title: result.error || "Error al enviar el correo",
    });
  }
});