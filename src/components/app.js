const axios = require('axios');
import Header from './header';
import VerticalNav from './nav';
import error from '../components/error';

const app = async() => {
    const current_user = await axios.get('/api/current_user').catch(e => {
        window.location.href = "/#/login";
        error(e)
    })
    if (!current_user.data) {
        window.location.href = "/#/login";
    } else {
        document.body.insertAdjacentHTML("afterbegin", `${Header({ user: current_user.data })}
        <div class="application-wrapper"> 
            ${VerticalNav}
            <section class="content"></section>
        </div>`);
    }
}

export default app;