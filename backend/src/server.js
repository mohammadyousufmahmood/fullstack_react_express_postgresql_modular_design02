const createApp = require('./app');
const { env } = require('./config/env');

// The start() function is responsible for starting and managing the server's lifecycle:
function start(){
    const app = createApp();

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

    checkDatabaseConnection();

    process.once('SIGINT' , ()=> shutdown(server, 'SIGINT'))
    process.once('SIGTERM', ()=> shutdown(server, 'SIGTERM'))

    return server;
}


function shutdown(server, signal){

    // TODO: add logger here

    // server.close() is used to stop the server from accepting new connections and to finish existing connections before shutting down.
    // when the server is closed, the callback function is executed, which ends the database connection pool and exits the process with an appropriate exit code.
    server.close((closeErr) => {
        // 
        pool.end().then(
            () => process.exit(closeErr ? 1 : 0),
            () => process.exit(1)
        );
    });


    setTimeout(() => {
        // If the server doesn't close within 10 seconds, forcefully exit the process with an exit code of 1.
        process.exit(1);
    }, 10_000).unref();
    
}


async function checkDatabaseConnection(){
    try{
        await pool.query('SELECT 1');
        console.log('Database connection successful');
    }
    catch(err){
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}


if(require.main === module) start();


module.exports = { start }





