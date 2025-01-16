const express = require('express');

const app = express();
const adminRouter = express.Router();

const loggerWrapper = (options) =>{
     return function (req, res, next){
        if(options.log) {
            console.log(`${new Date(Date.now()).toLocaleDateString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
            next();
        }else {
            throw new Error('Failed to log')
        }
    };
};
adminRouter.use(loggerWrapper({log: true}));

adminRouter.get('/dashboard', (req, res) =>{
    res.send('Dashboard')
})

app.use('/admin', adminRouter);

const errorMiddleware = (err, req, res, next) =>{
    console.log(err.message);
    res.status(500).send('There was a server side error')
}

adminRouter.use(errorMiddleware)

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});