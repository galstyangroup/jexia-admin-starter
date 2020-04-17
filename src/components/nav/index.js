import trx from '../../translations';

const navObject = [{
    name: trx.home,
    href: "/#/home",
    iconClass: "fas fa-home"
},
]

const linkTempalte = (x) => {
    return `<a href="${x.href}"> <i class="${x.iconClass}"></i> ${x.name} </a>`
}

const nav = () => {
    return `
    <div class="vertical-nav">
        ${navObject.map(linkTempalte).join("")}
    </div> `;
}

export default nav()