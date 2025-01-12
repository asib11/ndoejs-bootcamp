 const handler = (req, res) =>{
    console.log(req.secure) 
    res.send('hello')
}

module.exports = handler