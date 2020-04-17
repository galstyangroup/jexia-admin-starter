...
const app = express();

const ums = new jexia.UMSModule();
const ds = jexia.dataOperations();

jexia.jexiaClient().init(credentials, ums);
jexia.jexiaClient().init(credentials, ds);


app.post('/api/signup', async (req, res, next) => {
    const user = await ums.signUp({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        lang: req.body.lang,
        curr_org: null,
        browser: req.body.browser
    }).catch(err => {
        res.status(400).json(err.message)
    });
    res.json(user)
});

app.post('/api/login', async (req, res, next) => {
    const user = ums.signIn({
        email: req.body.email,
        password: req.body.password
    });
    res.json(user)
});

app.get('/api/current_user', async (req, res) => {
    const user = await ums.getUser().catch(err => {
        res.redirect(401, '/#/login')
    });

    ds.select('users')
    .where(field => field("id").isEqualTo(user.id))  
    .subscribe((x) => {
        res.json(x[0]);
    })
});

...