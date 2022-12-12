const express = require('express');
const sequelize = require('./mongodb')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
const userRoutes = require('./routes')

app.use('/users' ,userRoutes);



sequelize.sync().then((result) => { 
    app.listen(3000);
}).catch((err) => {
    console.log(err)
});
