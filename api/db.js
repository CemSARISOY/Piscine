const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL
const pool = new Pool({
    connectionString
});

pool.connect(err => {
    if(err){
        console.error('connection error', err.stack)
    } else {
        console.log("connected")
    }
})

module.exports = pool;