module.exports = {
    apps: [{
        name: 'jexia-admin-server',
        script: 'server.js',

        // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
        instances: 1,
        exec_mode: 'cluster', 
        autorestart: true,
        watch: true,
        error_file: '/logs/s_err.log',
        out_file: '/logs/server.log',
        log_file: '/logs/combined_se.log',
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};