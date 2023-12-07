let query = location.search;
const params = new URLSearchParams(query);
const pid = params.get("pid");

fetch("/api/products/" + pid)
  .then((res) => res.json())
  .then((res) => {
    const card = `
            <article class="card mx-3 mb-3" style="height: 400px; width: 340px">
              <img src="${
                res.payload.thumbnail
              }" style="height: 280px" class="card-img-top object-fit-cover" alt="...">
              <div id="data" class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">${res.payload.title} - ${
      res.payload.description
    }</h5>
                ${
                  cookie
                    ? `<button style="width: 106px" id="addToCart" class="btn btn-secondary m-0">addToCart</button>`
                    : `<a href="./login.html" style="width: 106px" class="btn btn-secondary m-0">Log in!</a>`
                }
              </div>
            </article>`;
    document.querySelector("section").innerHTML = card;
    document.querySelector("#addToCart").addEventListener("click", addToCart);
  });

function addToCart() {
  document.querySelector("#addToCart").remove();
  const p = document.createElement("p");
  p.className = "text-success addToCart m-0";
  p.textContent = "Producto Agregado!";
  document.querySelector("#data").append(p);
}
