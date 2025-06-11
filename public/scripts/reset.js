const reset = async () => {
  try {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirm = document.querySelector("#confirm").value;

    if (password !== confirm) return alert("Las contraseñas no coinciden");

    const url = `/api/auth/reset`;
    const body = { email, password };
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    response = await response.json();
    if (response.error) {
      alert(response.error);
    } else {
      alert("Contraseña actualizada");
      location.replace("/login");
    }
  } catch (error) {
    alert(error.message);
  }
};

document.querySelector("#reset").addEventListener("click", reset);
