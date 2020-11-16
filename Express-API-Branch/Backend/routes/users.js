const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

//Renders Signup Page on /users/signup
router.get('/signup', (req,res) => {
    res.render('signup');

});

router.get('/', (req,res) => {
    res.render('signup');

});

router.get('/Dashboard', (req, res) => {
    res.render('userDashBoard');
});

router.use(express.urlencoded({
    extended: true
  }))

router.post('/signup', (req, res) => {

    //VALIDATE PASSWORD

    if (!passWordValidator(req.body.password))
    {
     res.send('invalid password')
     return false;
    }

    //CREATE USER MODEL
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        account: req.body.account
    });

    //SAVES TO DB
    user.save()
    .then(data => {
        res.json(data);
        console.log("User Created: " + req.body.username)
    })
    .catch(err => {
        console.log("User unable to be created")
        res.json({message: err})
    })


});

router.route('/updateTransactionRuleOverAmount/:id/:amount').get((req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, {"$set" :{"account.transactionRules.overAmount" : req.params.amount}}, {new: true})
    .then(User=> res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateTransactionRuleWithinState/:id/:state').get((req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, {"$push" :{"account.transactionRules.withinState" : req.params.state}}, {new: true})
    .then(User=> res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateTransactionRuleatVendor/:id/:vendor').get((req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, {"$push" :{"account.transactionRules.atVendor" : req.params.vendor}}, {new: true})
    .then(User=> res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getTransactionRuleatVendor/:id').get((req, res) => {
    User.findById({_id: req.params.id})
    .then(User=> res.json(User.account.transactionRules.atVendor))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getTransactionRules/:id').get((req, res) => {
    User.findById({_id: req.params.id})
    .then(User=> res.json(User.account.transactionRules))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getTransactionRulesWithinState/:id').get((req, res) => {
    User.findById({_id: req.params.id})
    .then(User=> res.json(User.account.transactionRules.withinState))
    .catch(err => res.status(400).json('Error: ' + err));
});

//LOGIN VERIFICATION
router.post('/login', (req, res) => {

    User.findOne({username: req.body.username}, function(err,obj) {
        console.log(req.body.username);
        if (obj === null)
            res.send({"Failure":"Cannot find username"});
        else
            if (obj.password === req.body.password)
                res.send({"Success" : 'Correct Information'});
            else
                res.send({"Failure" : "Incorrect Password"});
         });
});


//8 CHARACTERS, SPECIAL CHARACTER, NUMBER, LESS THAN 15 CHARACTERS
function passWordValidator(pw)
{
   let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
   return re.exec(pw);
}

module.exports = router;
