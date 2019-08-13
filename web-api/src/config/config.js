module.exports = {
    development:{
        hostname: '127.0.0.1',
        port: 3001,
        database:{
            host: 'localhost',
            port: 3306,
            name: 'spoiler',
            dialect: 'mysql',
            user: 'root',
            password: 'rafa1234'
        }
    },
    production:{
        hostname: '127.0.0.1',
        port: 3001,
        database: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        }
    }
}