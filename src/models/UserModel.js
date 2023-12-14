const mongoose=require('mongoose')

const DataSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true, versionKey: false
}
)

const UserModel = mongoose.model('users', DataSchema)

module.exports = UserModel;