import { body, validationResult } from 'express-validator';
import { 
    emailExists
} from '../../models/forms/register.js';
import {
    getAllUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} from '../../models/users/users.js';

/**
 * Comprehensive validation rules for user registration
 */
const registrationValidation = [
    body('name')
        .trim()
        .isLength({ min: 7 })
        .withMessage('Name must be at least 7 characters long'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('confirmEmail')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid confirmation email')
        .normalizeEmail()
        .custom((value, { req }) => {
            if (value !== req.body.email) {
                throw new Error('Email addresses do not match');
            }
            return true;
        }),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one number and one symbol (!@#$%^&*)'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];

/**
 * Validation rules for account updates
 */
const updateAccountValidation = [
    body('name')
        .trim()
        .isLength({ min: 7 })
        .withMessage('Name must be at least 7 characters long'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
];

const registerPage = (req, res) => {
    res.render('forms/register');
};

const processRegister = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error: ', errors);
        return res.redirect('/register');
    }

    const { name, email, password } = req.body;

    if (await emailExists(email)) {
        req.flash('warning', `Email: ${email} already exists`)
        return res.redirect('/register');
    }

    const savedUser = await saveUser(name, email, password);

    if (!savedUser) {
        req.flash('warning', 'Failed to saved user');
        return res.redirect('/register');
    }

    req.flash('success', `User form saved`);
    return res.redirect('/login');
}

/**
 * Display the edit account form
 * Users can edit their own account, admins can edit any account
 */
const showEditAccountForm = async (req, res) => {
    const targetUserId = parseInt(req.params.id);
    const currentUser = req.session.user;

    // TODO: Retrieve the target user from the database using getUserById
    const targetUser = await getUserById(targetUserId);
    // TODO: Check if the target user exists
    // If not, set flash message and redirect to /users
    // Flash message example:
    // req.session.flash = {
    //     type: 'error',
    //     message: 'User not found.'
    // };
    if (!targetUser) {
        req.flash('error', 'User not found.');
        return res.redirect('/users');
    }

    // TODO: Determine if current user can edit this account
    // Users can edit their own (currentUser.id === targetUserId)
    // Admins can edit anyone (currentUser.role_name === 'admin')
    const hasPermission = currentUser.id === targetUserId || currentUser.role_name === 'admin' || currentUser.role_name === 'co-admin';
    // TODO: If current user cannot edit, set flash message and redirect
    // Flash message example:
    // req.session.flash = {
    //     type: 'error',
    //     message: 'You do not have permission to edit this account.'
    // };
    if (!hasPermission) {
        req.flash('error', 'You do not have permission to edit this account');
        return res.redirect('/users');
    }

    // TODO: Render the edit form, passing the target user data
    // addRegistrationSpecificStyles(res);
    res.render('forms/edit', {
        title: 'Edit Account',
        user: targetUser
    });
};

/**
 * Process account edit form submission
 */
const processEditAccount = async (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
        req.flash('error', 'Please correct the errors in the form.');
        return res.redirect(`/users/${req.params.id}/edit`);
    }

    const targetUserId = parseInt(req.params.id);
    const currentUser = req.session.user;
    const { name, email } = req.body;

    // TODO: Retrieve the target user to verify they exist
    // If not found, set flash message and redirect to /users
    const targetUser = await getUserById(targetUserId);
    if (!targetUser) {
        req.flash('error', 'User not found.');
        return res.redirect('/users');
    }
    // TODO: Check edit permissions (same as showEditAccountForm)
    // If cannot edit, set flash message and redirect
    const isTheUser = currentUser.id === targetUserId
    const isAdmin = currentUser.role_name === 'admin';
    const isCoAdmin =currentUser.role_name === 'co-admin'
    if (!(isTheUser || isAdmin || isCoAdmin)) {
        req.flash('error', 'You do not have permission to edit this account.');
        return res.redirect('/dashboard');
    }
    // TODO: Check if the new email already exists for a DIFFERENT user
    // Hint: You need to verify the email isn't taken by someone else,
    // but it's okay if it matches the target user's current email
    // If email is taken, set flash message and redirect back to edit form
    if (await emailExists(email)) {
        req.flash('warning', 'Email already exists.')
        res.redirect(`/users/${req.params.id}/edit`);
    }
    // TODO: Update the user in the database using updateUser
    // If update fails, set flash message and redirect back to edit form
    const updatedUser = await updateUser(targetUserId, name, email);
    if (!updatedUser) {
        req.flash('warning', `Failed to update user ${targetUserId}`);
        return res.redirect(`/users/${req.params.id}/edit`);
    }
    // TODO: If the current user edited their own account, update their session
    // Hint: Update req.session.user with the new name and email
    if (isTheUser) {
        req.session.user.name = name;
        req.session.user.email = email;
    }
    // Success! Set flash message and redirect
    req.flash('success', 'Account updated successfully.');
    res.redirect('/dashboard');
};

/**
 * Delete a user account (admin only)
 */
const processDeleteAccount = async (req, res) => {
    const targetUserId = parseInt(req.params.id);
    const currentUser = req.session.user;

    // TODO: Verify current user is an admin
    // Only admins should be able to delete accounts
    // If not admin, set flash message and redirect
    const isAdmin = currentUser.role_name === 'admin';
    if (!isAdmin) {
        req.flash('error', 'You do not have permission to delete the account.');
        return res.redirect('/users');
    }
    // TODO: Prevent admins from deleting their own account
    // If targetUserId === currentUser.id, set flash message and redirect
    // Flash message example:
    // req.session.flash = {
    //     type: 'error',
    //     message: 'You cannot delete your own account.'
    // };
    if (targetUserId === currentUser.id) {
        req.flash('error', 'You cannot delete your own account.');
        return res.redirect('/users');
    }
    // TODO: Delete the user using deleteUser function
    // If delete fails, set flash message and redirect
    const deletedUser = await deleteUser(targetUserId);
    if (!deletedUser) {
        req.flash('warning', `Failed to delete user ${targetUserId}`);
        return res.redirect('/users');
    }

    // Success! Set flash message and redirect
    req.flash('success', 'Account deleted successfully.');
    res.redirect('/users');
};

export { registerPage, processRegister, showEditAccountForm, processEditAccount, processDeleteAccount };