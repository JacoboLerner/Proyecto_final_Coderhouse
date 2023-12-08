document.addEventListener('DOMContentLoaded', () => {
    const button5 = document.getElementById('submit');
    const createBtn = document.getElementById('createBtn');
    console.log(button5,createBtn);
if(button5){    
    const userId = createBtn.getAttribute('data-role');
    button5.addEventListener("click", async () => {
    try {
      const title = document.querySelector("#title").value;
      console.log(title);
      const description = document.querySelector("#description").value;
      const price = document.querySelector("#price").value;
      const thumbnail = document.querySelector("#thumbnail").value;
      const code = document.querySelector("#code").value;
      const stock = document.querySelector("#stock").value;
      const category = document.querySelector("#category").value;
      const data = { title, description, code, price, stock, category, thumbnail,owner:userId};
      console.log(data);
  
      let response = await fetch("/api/products", {
        method: "POST",
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
      }
    } catch (error) {
      console.log(error);
    }
  })}

;})
