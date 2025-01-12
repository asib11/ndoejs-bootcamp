const express = require('express');

const app = express();

const adminRoute = express.Router();
adminRoute.get('/dashboard', (req, res) =>{
    console.log(req.baseUrl) // /admin
    console.log(req.originalUrl) // /admin/dashboard
    console.log(req.url) // /dashboard
    res.send('this is dashboard')
})

app.use('/admin', adminRoute)

app.get('/user/:id', (req, res) =>{
    console.log(req.baseUrl);
    console.log(req.originalUrl); // /user/2?filter=name
    console.log(req.url); // /user/2?filter=name
    res.send('hello')
})

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});