let query = location.search;
const params = new URLSearchParams(query);
const currentPage = Number(params.get("page")) || 1;


fetch("/api/products?page=" + currentPage)
  .then((res) => res.json())
  .then((res) => {

    const cards = res.payload.ProductModels
    
      .map(
        (each) => `
            <article class="card mx-3 mb-4 style="height: 500px; width: 340px">
              <img src="${each.thumbnail}" style="height: 280px" class="card-img-top object-fit-cover" alt="...">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h4 class="card-title">${each.title} - ${each.description}</h5>
                <h5 class="card-title">$${each.price} pesos - ${each.stock}</h5>
                <a href="/pages/product.html?pid=${each._id}" style="width: 106px" class="btn btn-secondary m-0" id="buttton">Agregar!</a>
              </div>
            </article>`
           
            
      ) 
      .join("");
    document.querySelector("section").innerHTML = cards;
    const buttons = `${
      res.payload.prev &&
      `<a href="/pages/products.html?page=${res.payload.prev}" style="width: 106px" class="btn btn-secondary mx-2 mt-1 mb-3">previous</a>`
    }${
      res.payload.next &&
      `<a href="/pages/products.html?page=${res.payload.next}" style="width: 106px" class="btn btn-secondary mx-2 mt-1 mb-3">next</a>`
    }`;
    document.querySelector("aside").innerHTML = buttons;

  });

  if(!cookie){document.querySelector("#cart").remove();
}