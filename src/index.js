import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import Router from './components/router';
import docReady from './lib/docReady';
import app from './components/app';
import SignUp from './components/framework/signup';
import Login from './components/framework/login';




if (module.hot) {
    module.hot.accept();
}

const router = new Router({
    mode: 'hash',
    root: '/'
});

const appContainer = async(component) => {
    docReady(async() => {
        if (document.getElementsByClassName('application-wrapper')[0] === undefined) {
            const appElement = await app();
            document.body.insertAdjacentHTML('afterbegin', appElement );
            if(document.getElementsByClassName('content')[0] !== undefined){
                document.getElementsByClassName('content')[0].innerHTML = await component();
            }
        } else {
            document.getElementsByClassName('content')[0].innerHTML = await component();
        }
    });
}

router
    .add(/login/, () => {
        document.body.innerHTML = Login();
    })
    .add(/signup/, () => {
        document.body.innerHTML = SignUp();
    })
    .add(/home/, async() => {
        await appContainer(() => { return "<div> <h1>Welcome to Admin Framework</div></h1>" })
    })
    .add('', async() => {
        await appContainer(() => { return "<div> <h1>Welcome to Admin Framework</div></h1>" })
    });
