if (cookie) {
    document.querySelector("#login_index").remove();
    document.querySelector("#github").remove();
    document.querySelector("#register").remove();
  }else if(!cookie){
    document.querySelector("#cart").remove();
  }
  