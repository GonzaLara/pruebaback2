const renderNavbar = async () => {
  try {
    const optsDiv = document.querySelector("#opts");
    optsDiv.innerHTML = "";

    const response = await fetch("/api/auth/online", {
      credentials: "same-origin",
    });
    const data = await response.json();

    if (data.error) throw new Error(data.error);

   optsDiv.innerHTML += `
  <span class="navbar-text text-white me-2 d-flex align-items-center">
    ${data.avatar ? `<img src="${data.avatar}" alt="avatar" style="width:30px; height:30px; border-radius:50%; margin-right:5px;">` : ""}
    Hola, ${data.response?.name || "Usuario"}
  </span>
  <a class="btn btn-light py-1 px-2 m-1" href="/cart">CARRITO</a>
  <a class="btn btn-light py-1 px-2 m-1" href="/profile">PERFIL</a>
  <a class="btn btn-light py-1 px-2 m-1" id="signout" href="#">SALIR</a>
`;


    document.querySelector("#signout").addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "same-origin",
      });
      location.replace("/");
    });
  } catch (error) {
    const optsDiv = document.querySelector("#opts");
    optsDiv.innerHTML = `
      <a class="btn btn-light py-1 px-2 m-1" href="/login">INGRESAR</a>
      <a class="btn btn-light py-1 px-2 m-1" href="/register">REGISTRARSE</a>
    `;
  }
};

renderNavbar();
