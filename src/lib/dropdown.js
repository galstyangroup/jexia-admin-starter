//ths function generates a dropdown form a model
/*
model:

{ id:"id", class: "additional class", items: [{ elm: "a", id:"id" title: "childItemName"}]  }
*/

const childTemplate = (x) => {
    return `<${x.elem !== undefined ? x.elem  : "a" } id="${x.id}"><i class="${x.icon}"></i> ${x.title}</a>`
}

export default function dropdown(x) {
    return `<div class="dropdown ${ x.class !== undefined ? x.class : "" }">
    ${x.button}
    <div class="dropdown-content">
        ${x.items.map(childTemplate).join("")}
    </div>
</div>`
}