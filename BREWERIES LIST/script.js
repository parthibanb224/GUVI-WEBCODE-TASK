// Create Table

let body = document.getElementById("body");
let tableHead = document.createElement("div");
tableHead.setAttribute('class', 'container');
tableHead.innerHTML = `<table id="table" class="table table-striped border-dark table-hover table-bordered text-center">
<thead>
    <tr>
      <th class="p-4 bg-danger text-white" scope="col">NAME</th>
      <th class="p-4 bg-danger text-white" scope="col">TYPE</th>
      <th class="p-4 bg-danger text-white" scope="col">CITY</th>
      <th class="p-4 bg-danger text-white" scope="col">STATE</th>
      <th class="p-4 bg-danger text-white" scope="col">COUNTRY</th>
      <th class="p-4 bg-danger text-white" scope="col">ADDRESS</th>
      <th class="p-4 bg-danger text-white" scope="col">PHONE NUMBER</th>
      <th class="p-4 bg-danger text-white" scope="col">WEBSITE</th>
    </tr>
  </thead>
  <tbody id="tbody">

  </tbody>
</table>`
body.append(tableHead);


// Create Pagination Navbar

let pageNav = document.getElementById("navbar");
pageNav.innerHTML = `<nav aria-label="Page navigation example" class="d-flex justify-content-center fixed-bottom">
<ul id="pagination" class="pagination pagination-md mb-5">
  
</ul>
</nav>`;

let pageDiv = document.getElementById("pagination");

// Create previous button 

let prevTab = document.createElement("li");
prevTab.setAttribute('id', 'prev');
prevTab.setAttribute('class', 'page-item');
prevTab.innerHTML = `<button class="btn btn-md btn btn-info rounded-pill" onclick="prev()">Previous</button>`;
pageDiv.append(prevTab);

// Create 1-20 button

for (let i = 1; i <= 10; i++) {
    let page = document.createElement("li");
    page.setAttribute('class', 'page-item');
    page.innerHTML = `<button class="btn btn-md btn btn-secondary rounded-circle" onclick="dataContent(${i})">${i}</button>`;
    pageDiv.append(page);
}

// Create Next button

let nextTab = document.createElement("li");
nextTab.setAttribute('id', 'next');
nextTab.setAttribute('class', 'page-item');
nextTab.innerHTML = `<button class="btn btn-md btn btn-info rounded-pill" onclick="nexts()">Next</button>`;
pageDiv.append(nextTab);


// Render Data for Previous & Next Button

function prev() {
    currendPage = localStorage.getItem('page');
    if (currendPage > 1) {
        dataContent(currendPage - 1);
    } else {
        document.getElementById("prev").disabled = true;
    }
}
function nexts() {
    currendPage = localStorage.getItem('page');
    if (currendPage == 10) {
        document.getElementById("next").disabled = true;
    } else {
        dataContent(++currendPage);
    }
}

// Render Datas

async function dataContent(pageNO) {
    let response = await fetch("https://api.openbrewerydb.org/v1/breweries");
    let data = await response.json();
    console.log(data);

    localStorage.setItem('page', pageNO);

    let j = (pageNO - 1) * 5;
    let tableDiv = document.getElementById("table");
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        let content = document.createElement("tr");
        content.innerHTML = `
      <th class="p-2" scope="row">${data[j].name}</th>
        <td class="p-2">${data[j].brewery_type}</td>
        <td class="p-2">${data[j].city}</td>
        <td class="p-2">${data[j].state_province}</td>
        <td class="p-2">${data[j].country}</td>
        <td class="p-2">${data[j].address_1}</td>
        <td class="p-2">${data[j].phone}</td>
        <td class="p-2"><a href="${data[j].website_url}" target="_blank">${data[j].website_url}</a></td>`
        tbody.append(content);
        j++;
    }
    tableDiv.append(tbody);
}




async function details() {
    let response = await fetch("https://api.openbrewerydb.org/v1/breweries");
    let datas = await response.json();
    console.log(datas);
    let cities = [];
    for (let i = 0; i < datas.length; i++) {
        cities.push(datas[i].city);
    }
    console.log(cities);

    let tableDiv = document.getElementById("table");

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    datas.forEach(e => {
        console.log(e.country);
        if ((e.city) === (document.getElementById("SearchValue").value)) {
            let content = document.createElement("tr");
            content.innerHTML = `
          <th class="p-2" scope="row">${e.name}</th>
            <td class="p-2">${e.brewery_type}</td>
            <td class="p-2">${e.city}</td>
            <td class="p-2">${e.state_province}</td>
            <td class="p-2">${e.country}</td>
            <td class="p-2">${e.address_1}</td>
            <td class="p-2">${e.phone}</td>
            <td class="p-2"><a href="${e.website_url}" target="_blank">${e.website_url}</a></td>`
            tbody.append(content);
            tableDiv.append(tbody);
        }
    });

}