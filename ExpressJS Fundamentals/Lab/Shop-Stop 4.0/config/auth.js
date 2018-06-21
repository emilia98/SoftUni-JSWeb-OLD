module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            // If is not authenticated
            res.redirect('/user/login');
        }
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.user) {
                if (req.user.roles.includes(role)) {
                    next();
                } else {
                    res.render('forbidden');
                }
            } else {
                // If is not authenticated or is not in the proper role
                res.redirect('/user/login');
            }
        }
    }, 
    isNotAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } 
        else {
            res.redirect('/');
        }
       
    },
}