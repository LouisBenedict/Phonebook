const User = require ('../models/API.model');

// Create and Save a new User
exports.create = (req, res) => {

    // Validation
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    } else if (!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    } else if (!req.body.password) {
        return res.status(400).send({
            message: "User password can not be empty"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name || "Untitled User",
        email: req.body.email || "no email stated",
        password: req.body.password || 'no password stated'
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
}

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request

    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    } else if (!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    } 

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Untitled User",
        email: req.body.email || "no email stated",
        password: req.body.password || 'no password stated'
    }, {new: true})
    .then(user => {

        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }
    ).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    }
    );
}

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
}