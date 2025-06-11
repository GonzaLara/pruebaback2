document.querySelector("#send").addEventListener("click", async () => {
  const email = document.querySelector("#email").value;

  if (!email) {
    return alert("Debes ingresar un correo");
  }

  const res = await fetch("/api/auth/send-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();
  if (res.ok) {
    alert("Correo enviado");
    location.replace("/login");
  } else {
    alert(result.error || "Error al enviar correo");
  }
});
