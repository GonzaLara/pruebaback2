const reset = async () => {
  try {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirm = document.querySelector("#confirm").value;

    if (!email || !password || !confirm) {
      return alert("Todos los campos son obligatorios");
    }

    if (password !== confirm) {
      return alert("Las contraseñas no coinciden");
    }

    const url = `/api/auth/reset`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Contraseña actualizada");
      location.replace("/login");
    }
  } catch (error) {
    alert("Ocurrio un error: " + error.message);
  }
};

document.querySelector("#reset").addEventListener("click", reset);
