import trx from '../../translations/index';
import form from '../../lib/generateFrom';
import LoginImage from '../../assets/images/login.jpg';
import Logo from '../../assets/images/logo.svg';

export default function() {
    const x = {
        name: trx.signup,
        action: "/api/login",
        method: "post",
        fields: [{
            title: trx.email,
            name: "email",
            type: "text"
        }, {
            title: trx.password,
            name: "password",
            type: "password"
        }, {
            value: trx.login,
            name: "submit",
            type: "submit"
        }]
    }

    return `
        <div class="form-wrapper login-form auth-form">
            <img class="logo" src="${Logo}">
            
            ${form(x)}
            <div class="form-link-wrapper">
                <a class="form-link" href="/#/signup">${trx.not_a_member_sign_up_here}</a>
            </div>    
        </div>
        <img class="bg-image" src="${LoginImage}">
    `;
}