document.addEventListener('DOMContentLoaded', () => {
    const button5 = document.getElementById('submit');
if(button5){    
    button5.addEventListener("click", async () => {
    try {
      const title = document.querySelector("#title").value;
      console.log(title);
      const description = document.querySelector("#description").value;
      const price = document.querySelector("#price").value;
      const thumbnail = document.querySelector("#thumbnail").value;
      const code = document.querySelector("#code").value;
      const stock = document.querySelector("#stock").value;
      const _id = document.querySelector("#_id").value;
      const category = document.querySelector("#category").value;
      const data = { title, description, code, price, stock, category, thumbnail};
      console.log(data);
  
      let response = await fetch(`/api/products/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      response = await response.json();
      if (response.status !== "success") {
        document.querySelector(
          ".alerts"
        ).innerHTML = `<span class="text-center text-danger w-100">${response.message}</span>`;
      } else {
        document.querySelector("form").reset();
        document.querySelector(
          ".alerts"
        ).innerHTML = `<span class="text-center text-success w-100">Done!</span>`;
        setTimeout(function () {
            window.location.href = "/api/views/modify"; 
         }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  })}

;})
