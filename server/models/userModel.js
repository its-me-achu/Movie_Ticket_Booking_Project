const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
    isAdmin: {
        type: Boolean,
        required : true,
        default: false,
    }
},
{
    timestamps: true,
}
);
userSchema.pre("save", async function (next){
    if(this.isModified("password"));
        const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
     
    next();

})
const users = mongoose.model("users", userSchema);

module.exports = users;