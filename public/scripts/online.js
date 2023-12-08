let cookie = document.cookie.split("; ")
cookie = cookie.find(each=>each.split("=")[0]==="token")


if (cookie) {
  fetch("/api/sessions/online", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res,req) => res.json())
    .then((res,req) => {
      if (res.response) {
        document.querySelector("#register").remove();
        if (res.response.role === "admin") {
          const anchor3 = document.createElement("a");
          anchor3.href = "/api/views/add";
          anchor3.className = "btn btn-secondary m-1 py-1 px-3";
          anchor3.textContent = "New";
          document.querySelector(".navbar-nav").append(anchor3);
          const anchor4 = document.createElement("a");
          anchor4.href = "/api/views/modify";
          anchor4.className = "btn btn-secondary m-1 py-1 px-3";
          anchor4.textContent = "Update";
          document.querySelector(".navbar-nav").append(anchor4);
          document.querySelector("#cart").remove()

        } 
        if (res.response.role === "user") {
            const anchor1 = document.createElement("a");
            anchor1.href = "/api/sessions/premium";
            anchor1.className = "btn btn-secondary m-1 py-1 px-3 pixel";
            anchor1.textContent = "Cambiar de Role";
            document.querySelector(".navbar-nav").append(anchor1);
          }
          if (res.response.role === "premium") {
            const anchor3 = document.createElement("a");
            anchor3.href = "/api/views/add";
            anchor3.className = "btn btn-secondary m-1 py-1 px-3";
            anchor3.textContent = "New";
            document.querySelector(".navbar-nav").append(anchor3);
            const anchor4 = document.createElement("a");
            anchor4.href = "/api/views/modify";
            anchor4.className = "btn btn-secondary m-1 py-1 px-3";
            anchor4.textContent = "Update";
            document.querySelector(".navbar-nav").append(anchor4);
          }
        document.querySelector("#login").remove();
        const button = document.createElement("button");
        button.id = "signout";
        button.type = "button";
        button.className = "btn btn-outline-dark m-1 py-1 px-3";
        button.textContent = "Sign out";
        button.addEventListener("click", signout);
        document.querySelector(".navbar-nav").append(button);
      }
    });
}

async function signout() {
  try {
    let response = await fetch("/api/sessions/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json"}
    });
    response = await response.json();
    location.replace("/");
  } catch (error) {
    console.log(error);
  }
}
