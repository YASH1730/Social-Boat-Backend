const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 8080
require('./database/db_config')

app.use(cors())
app.use(express.static("public"))

app.use('/api',require('./routes/routes'))



app.listen(PORT,()=>{
    console.log("Server is running at 8080")
})


