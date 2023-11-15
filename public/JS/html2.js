const elemt = document.getElementById("flower");

let elementCoordinate = elemt.getBoundingClientRect();

console.log(elementCoordinate.top,elementCoordinate.right,elementCoordinate.bottom,elementCoordinate.left);