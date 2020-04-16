//Generate table

//for later use
// const tableElement = document.getElementById("1");
// for (var i = 0; i < tableElement.rows.length; i++) {
//     if (i > 10) {
//         tableElement.rows[i].style.display = "none";
//     }
// }

const generateTable = (x) => {

        const tableHeaders = (h) => {
            return `<th>${h.name}</th>`;
        };

        const tableRows = (y) => {
            return function(z) {
                let filtered = [];
                const arrayofAllwedField = Object.values(y);
                for (let i = 0; i < arrayofAllwedField.length; i++) {
                    filtered.push(z[arrayofAllwedField[i].data]);
                };
                return `<tr>${Object.values(filtered).map( tableColumns() ).join("")}</tr>`;
            };
        };

        const tableColumns = (z) => {
            return function tableColumnsF(y) {
                return `<td>${y}</td>`;
            };
        };

        return `
        <div id="table-wrapper-${x.id}" class="table-wrapper">
        <div class="title"> 
            <h2>${x.name}</h2>
            <p>${x.description}</p>
        </div>
       ${x.search === true ? 
            `<div class="search"> 
                <input type="text" id="search-${x.id}" onkeyup="search('${x.id}','search-${x.id}')" placeholder="Search.."></input>
            </div>`
            : "" 
       }
        <table id="${x.id}" class="table table-hover ${x.paginate === true ? "paginate": "" }">
            <thead>
                ${x.fields.map(tableHeaders).join("")}
            </thead>
                <tbody>
                ${x.dataset.map(tableRows(x.fields)).join("")}
                </tbody>
            </table>
        </div></div>`;
};

export default generateTable;