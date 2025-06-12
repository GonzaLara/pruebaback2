import { Toast } from "./toast.js";

const verify = async () => {
  try {
    const email = document.querySelector('#email').value;
    const code = document.querySelector('#code').value;

    if (!code) {
      return Toast.fire({
        icon: "warning",
        title: "Codigo requerido",
      });
    }

    const url = `/api/auth/verify/${email}/${code}`;
    let response = await fetch(url);
    response = await response.json();

    if (response.error) {
      Toast.fire({
        icon: "error",
        title: "Codigo incorrecto",
      });
    } else {
      Toast.fire({
        icon: "success",
        title: "Ya estas verificado",
      });
      setTimeout(() => location.replace("/login"), 3000);
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: error.message || "Error interno",
    });
  }
};

document.querySelector("#verify").addEventListener("click", verify);