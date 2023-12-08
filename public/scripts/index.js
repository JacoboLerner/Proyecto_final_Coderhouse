if (cookie) {
    document.querySelector("#login_index").remove();
    document.querySelector("#github").remove();
  }else if(!cookie){
    document.querySelector("#cart").remove();
  }
  