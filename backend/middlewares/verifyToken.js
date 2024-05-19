const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({msg: 'Нет авторизации'})

    if(req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) return res.status(403).json({msg: 'Не верный токен'})
            else{
                req.user = data
                next()
            }
        })

    }
}

const verifyTokenAdmin = async(req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({msg: 'Нет авторизации'})

    if(req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) return res.status(403).json({msg: 'Не верный токен'})
            else{
                if(!data.isAdmin){
                    return res.status(403).json({msg: 'Вы не администратор'})
                }
                req.user = data
                next()
            }
        })

    }
}

module.exports = {
    verifyToken,
    verifyTokenAdmin
}

