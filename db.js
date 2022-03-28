//require('dotenv').config()

const {Pool} = require('pg')

const connectionString = process.env.DATABASE_URL || 
    'postgresql://postgres:root@localhost:5432/heroku'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

const getUsers = async () => {
    const client = await pool.connect()
    try{
        const result = await client.query(`SELECT * FROM users`)
        return result.rows
    } catch(e){
        return e
    } finally{
        client.release()
    }
}

const postUser = async (username, email, contrasena) => {
    const client = await pool.connect()
    const query = {
        text: 'INSERT INTO users (username, email, contrasena, fecha) values ($1, $2, $3, (current_date)) RETURNING *',
        values:[username, email, contrasena,]
    }
    try{
        const result = await client.query(query)
        return result.rows
    }  catch(e){
        return e
    } finally{
        client.release()
    }
}

const deleteUser = async (id) => {
    const client = await pool.connect()
    await client.connect();
    const query =  {
        text: 'DELETE FROM users WHERE id =$1',
        values:[id]
    }
    try{
        const result = await client.query(query)
        return result.rows
    }  catch(e){
        return e
    } finally{
        client.release()
    }
} 



module.exports = {
    getUsers,
    postUser,
    deleteUser
}