const mongoose = require('mongoose'),
      bcrypt  = require('bcrypt');
      
const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        require: true
    },

    clients: [{}]
});

Schema.pre('save', function(next) {
    const user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (error,salt) => {
            if(error) {
                return next(error);
            }
            bcrypt.hash(user.password, salt, (error, hash) => {
                if(error) {
                    return next(error);
                }
                user.password=hash;
                next();
            });
        });
    } else {
        return next();
    }
});