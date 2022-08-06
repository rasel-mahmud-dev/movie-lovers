module.exports = (res, status=200, message) =>{
    res.status(status)
    if(typeof message === "string"){
        res.send(message)
    } else {
        res.json(message)
    }
}