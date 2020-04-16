import trx from '../../translations';

const navObject = [{
    name: trx.home,
    href: "/#/home",
    iconClass: "fas fa-home"
}, {
    name: trx.users.name,
    href: "/#/users",
    iconClass: "fas fa-user"
}, {
    name: trx.customers.name,
    href: "/#/customers",
    iconClass: "fas fa-building"
}, {
    name: trx.plans.name,
    href: "/#/plans",
    iconClass: "fas fa-list-alt"
}, {
    name: trx.functions.name,
    href: "/#/functions",
    iconClass: "fas fa-gopuram"
}, {
    name: trx.roles.name,
    href: "/#/roles",
    iconClass: "fas fa-sitemap"
}]

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