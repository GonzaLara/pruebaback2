const verify = async () => {
  try {
    const email = document.querySelector('#email').value
    const code = document.querySelector('#code').value
    const url = `/api/auth/verify/${email}/${code}`;
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
      location.replace("/login")
    }
  } catch (error) {
    alert(error.message);
  }
};

document.querySelector("#verify").addEventListener("click", verify);