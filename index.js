const express = require('express');

const app = express();
app.set('view engine', 'ejs');

app.get('/test', (req, res) =>{
    res.send('hello')
})

app.get('/about', (req, res) =>{
    // console.log(res.headersSent);
    // res.render('pages/about', {
    //     name: 'bangladesh'
    // }); // second parameter object is local
    // console.log(res.headersSent);
    // res.send('about'); // end response with data
    // res.end(); // end response with data
    // res.json({
    //     name: 'Asib'
    // });
    // res.status() // id you use status method must use re.end() after this
    // res.end()
    // res.sendStatus(200) // it is send status code and end together

    // res.format({
    //     'text/plain': () =>{
    //         res.send('hi....');
    //     },
    //     'text/html': () =>{
    //         res.render('pages/about')
    //     },
    //     'application/json': () =>{
    //         res.json({
    //             message: "Asib",
    //         })
    //     },
    //     default: () =>{
    //         res.status(406).send('not acceptable')
    //     }
    // })

    // res.cookie('name', 'Asib')
    // res.end()

    // res.location('/test') // developer can see where is the location for redirect
    // res.end()

    res.redirect('/test')
    res.end()

    // res.set('platform', 'asib'); // set header
    // res.get('platform') // get header
})


app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});