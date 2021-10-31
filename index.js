let express = require('express');
let app = express();
const PORT = process.env.PORT || 3000;
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