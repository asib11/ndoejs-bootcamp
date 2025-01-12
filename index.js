const express = require('express');

const app = express();

const adminRoute = express.Router();
adminRoute.get('/dashboard', (req, res) =>{
    console.log(req.baseUrl)
    res.send('this is dashboard')
})

app.use('/admin', adminRoute)

app.get('/user/:id', (req, res) =>{
    console.log(req.baseUrl);
    res.send('hello')
})

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});