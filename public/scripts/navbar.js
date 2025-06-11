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
  <a class="btn btn-info" href="/cart"><i class="bi bi-cart4"></i></a>
  <a class="btn btn-info" href="/profile"><i class="bi bi-person-circle"></i></a>
  <a class="btn btn-info" id="signout" href="#"><i class="bi bi-x-circle-fill"></i></a>
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
      <a class="btn btn-success py-1 px-2 m-1" href="/login"><i class="bi bi-box-arrow-in-right" style="font-size: 1.8rem;"></i></a>
      <a class="btn btn-success py-1 px-2 m-1" href="/register"><i class="bi bi-pencil-square" style="font-size: 1.7rem;"></i></a>
    `;
  }
};

renderNavbar();
