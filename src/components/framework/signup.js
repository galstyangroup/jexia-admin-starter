import trx from '../../translations/index';
import form from '../../lib/generateFrom';
import SignupImage from '../../assets/images/signup.jpg';

export default function() {

    const x = {
        name: trx.signup,
        action: "/api/signup",
        method: "post",
        fields: [{
            title: trx.first_name,
            name: "first_name",
            type: "text"
        }, {
            title: trx.family_name,
            name: "family_name",
            type: "text"
        }, {
            title: trx.email,
            name: "email",
            type: "text"
        }, {
            title: trx.password,
            name: "password",
            type: "password"
        }, {
            title: trx.password_confirm,
            name: "password_confirm",
            type: "password"
        },{
            name: "lang",
            type: "hidden",
            value: window.navigator.language
        },{
            name: "browser",
            type: "hidden",
            value: window.navigator.appVersion
        }, {
            value: trx.signup_now,
            name: "submit",
            type: "submit"
        }]
    }

    return `
        <div class="form-wrapper signin-form auth-form">
            ${form(x)}
            <div class="form-link-wrapper">
                <a class="form-link" href="/#/login">${trx.already_have_an_account_log_in_here}</a>
            </div>    
        </div>
        <img class="bg-image" src="${SignupImage}">
        
    `;
}