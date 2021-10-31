let express = require('express');
let app = express();
let PORT = 10000 || process.env.PORT
let cors = require('cors')

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.use(cors())

app.use('/', require('./routes/detik'))
app.use('/', require('./routes/google-trend'))
app.use('/', require('./routes/home'))
app.use('/', require('./routes/index'))
app.use('/', require('./routes/kompas'))
app.use('/', require('./routes/kumparan'))

app.listen(PORT, () => console.log(`Server running at ${PORT}`));