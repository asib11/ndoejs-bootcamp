const express = require('express');

const app = express();

// app.use(express.static(`${__dirname}/public/`,{
//     extensions: ['html']
// }));

// app.get('/', (req, res) => {
//     res.send('THIS is home page');
// });

// app.post('/', (req, res) => {
//     res.send('This is login page');
// });

app.set('view engine', 'ejs');

app.route('/about/mission')
    .get((req, res) => {
        res.render('pages/about');
    })
    .post((req, res) => {
        res.send('This is about mission page post');
    })
    .put((req, res) => {
        res.send('This is about mission page put');
    })

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});