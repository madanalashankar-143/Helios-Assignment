const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    //console.log('Inside registration framework.')    
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((error, doc) => {
        if (!error) {
            res.send(doc);
        }else {
            if (error.code == 11000) {
                res.status(422).send(['Duplicate emailaddress found']);
            }else {
                return next(error);
            }
        }
        
    });
}

module.exports.authentication = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        } else if (user) { //registered User
            return res.status(200).json( { "token": user.generateJwt() } )
        } else { //Unknown User or Wrong Password;
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne( {_id: req._id}, (err, user) => {
        if (!user) {
            return res.status(404).json( {status: false, messgae: 'User Record not Found.'} );
        } else {
            return res.status(200).json( {status: true, user: _.pick(user,['fullName', 'email'])} );
        }
    } );
}