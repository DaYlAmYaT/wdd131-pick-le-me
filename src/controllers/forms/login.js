import { body, validationResult } from 'express-validator';
import { verifyPassword } from '../../models/forms/login.js';
import { getUserByEmail } from '../../models/users/users.js';

/**
 * Validation rules for login form
 */
const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password is required')
];

const loginPage = (req, res) => {
    res.render('forms/login');
}

const processLogin = async (req, res) => {
    // TODO: Check for validation errors using validationResult(req)
    const errors = validationResult(req);
    // TODO: If errors exist, redirect back to login form
    if (!errors.isEmpty()) {
        req.flash('error', errors);
        return res.redirect('/login');
    }
    // TODO: Extract email and password from req.body
    const { email, password } = req.body;
    // TODO: Find user by email using getUserByEmail()
    const user = await getUserByEmail(email);
    // TODO: If user not found, log "User not found" and redirect back
    if (!user) {
        req.flash('warning', 'User not found...');
        return res.redirect('/login');
    }
    // TODO: Verify password using verifyPassword()
    const verified = await verifyPassword(password, user.password);
    // TODO: If password incorrect, log "Invalid password" and redirect back
    if (!verified) {
        req.flash('warning', 'Invalid password');
        return res.redirect('/login');
    }
    // SECURITY: Remove the password from the user object first!
    user.password = null;
    delete user.password;
    // TODO: Store user information in session: req.session.user = user object (without password)
    req.session.user = user;
    // TODO: Redirect to protected dashboard (/dashboard)
    req.flash('success', 'Logged in successfully! Welcome!')
    return res.redirect('/paddles');
};

const processLogout = (req, res) => {
    if (!req.session) {
        // If no session exists, there's nothing to destroy,
        // so we just redirect the user back to the home page
        return res.redirect('/paddles');
    }

    // Call destroy() to remove this session from the store (Postgres in our case)
    req.session.destroy((err) => {
        if (err) {
            // If something goes wrong while removing the session from the DB:
            console.error('Error destroying session:', err);

            /**
            * Clear the session cookie from the browser anyway, so the client
            * doesn't keep sending an invalid session ID.
            */
            res.clearCookie('connect.sid');

            /** 
            * Normally we would respond with a 500 error since logout didn't fully succeed with code
            * similar to: return res.status(500).send('Error logging out');
            * 
            * Since this is a practice site we will redirect to the home page anyways.
            */
            return res.redirect('/paddles');
        }

        // If session destruction succeeded, clear the session cookie from the browser
        res.clearCookie('connect.sid');
                                                                                      
        // Redirect the user to the home page
        res.redirect('/paddles');
    });
}

const dashboardPage = (req, res) => {
    const user = req.session.user;
    const sessionData = req.session;

    // TODO: Security check! Ensure user and sessionData does not contain the password field
    if (user && user.password) 
        delete user.password;
    if (sessionData.user && sessionData.user.password) 
        delete sessionData.user.password;

    // TODO: Add login-specific styles
    // res.addStyle('<link rel="stylesheet" href="/css/login.css">', 5);
    // TODO: Render the dashboard view (forms/login/dashboard)
    // TODO: Pass title, user, and sessionData to template
    res.render('users/dashboard', {
        title: 'Dashboard',
        user: user,
        sessionData: sessionData
    });
};

export { loginPage, processLogin, processLogout, dashboardPage, loginValidation };