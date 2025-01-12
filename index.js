const express = require('express');
const cookieParser = require('cookie-parser')
const handler = require('./handle')

const app = express();

app.use(express.json())
app.use(cookieParser())

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
    console.log(req.params) // :id
    console.log(req.query) // ?filter=name -> {filter: "name"}
    console.log(req.cookies)
    res.send('hello')
})


app.post('/user/:id', (req, res) =>{
    console.log(req.body) // body use only post method  and when we need data, use some parser like line 5
    res.send('hello')
})
app.get('/user2/:id',handler )

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});