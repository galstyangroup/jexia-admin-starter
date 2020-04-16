import Logo from '../../assets/images/logo.png';
import trx from '../../translations';
import dropdown from '../../lib/dropdown';

export default function(x) {
    return `
    <header>
        <nav>
            <div class="brand">
                <img src="${Logo}" class="logo" >
            </div>
           
            <div class="sub-menu"></div>
            <div class="verify-emeil">
            ${x.user.confirmed === false ? `
                <a class="danger">${trx.verify_email}</a>
            ` : ""}
            </div>
                ${dropdown(
                    { 
                        id:"logout",
                        button: `<div class="user-menu">
                            <p>Hi ${x.user.first_name}</p>
                            <div class="user-icon"> 
                                ${x.user.first_name.charAt(0) + x.user.family_name.charAt(0)}
                                </div>
                            </div>`,
                        class: "user-menu-dropdown", 
                        items: [
                            { elem: "a href='/#/prfile'", id:"user-button", title: trx.profile.name, icon: "fas fa-user" },
                            { elem: "a href='api/logout'", id:"logout-button", title: trx.logout, icon: "fas fa-sign-out-alt"},
                        ]  
                    }
                )}            
        </nav>
    </header>`;
}