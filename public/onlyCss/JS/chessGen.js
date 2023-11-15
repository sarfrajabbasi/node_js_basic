(function () {
  var black_cell = '<div class="black">Hello</div>';
  var white_cell = '<div class="white">Bye</div>';
  var max_cell = 8;

  var container = document.getElementsByClassName("container")[0];
  console.log(container);

  for (let i = 0; i < max_cell; i++) {
    for (let j = 0; j < max_cell; j++) {
      if ((i+j ) % 2 === 0) {
        container.insertAdjacentHTML("beforeend",black_cell)
      }else{
        container.insertAdjacentHTML("beforeend",white_cell)
      }
    }
  }
})();
