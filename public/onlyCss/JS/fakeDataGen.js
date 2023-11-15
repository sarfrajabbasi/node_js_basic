function generateFakeData(){
    // target tbody
    const tbody = document.getElementById('table-body');

    // generate 10 rows of fake data
    for(let row = 0;row<10;row++){
        // create data and row
        const name = faker.name.findName();
        const age = faker.random.number({min:18,max:99});
        const email = faker.internet.email();
        const gender = faker.random.arrayElement(["male","female","other"]);
        const address = faker.address.streetAddress();
        const city = faker.address.city();
        
        const rows = document.createElement('tr');

        // insert the data in row inner html
        rows.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>${gender}</td>
        <td>${address}</td>
        <td>${city}</td>
        
        `
        // append tbody with row
        tbody.appendChild(rows)
    }

    const tbodyChildren = tbody.children.length;
    if(tbodyChildren > 50){
        // remove all  child
        while(tbody.firstElementChild){
            tbody.removeChild(tbody.firstElementChild)
        }
        // then gen. 10 rows
        generateFakeData() 
    }
    return "table rows created!"

}

const btn = document.getElementById("generateData");

btn.addEventListener('click',function(){
    generateFakeData();
})

