import { Toast } from "./toast.js";

const login = async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "same-origin",
    };

    const url = "/api/auth/login";
    let response = await fetch(url, opts);
    response = await response.json();

    if (response.error) {
      Toast.fire({ icon: "error", title: response.error });
    } else {
      Toast.fire({ icon: "success", title: "Bienvenido" });
      setTimeout(() => location.replace("/"), 1200);
    }
  } catch (error) {
    Toast.fire({ icon: "error", title: error.message });
  }
};

document.querySelector("#login").addEventListener("click", login);