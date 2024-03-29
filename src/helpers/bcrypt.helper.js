const bcrypt = require('bcrypt')

exports.EncodePassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

exports.DecodePassword = async (password, savedPassword) => {
    return await bcrypt.compare(password, savedPassword)
}