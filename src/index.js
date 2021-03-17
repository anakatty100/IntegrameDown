if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Read enviroment variables and 
//makes all the .env files available

const app = require('./app');

//Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port:", app.get("port"));
    console.log('Enviroment:', process.env.NODE_ENV)
});