import { getAllUsers, getUserById, grantPermission, revokePermission } from "../../models/users/users.js"

const usersPage = async (req, res) => {
    const users = await getAllUsers();
    res.render('users/list', {
        users: users,
        session: req.session
    });
};

const processGivePermission = async (req, res) => {
    const targetUserId = parseInt(req.params.id);

    const currentUser = req.session.user;

    if (currentUser.role_name != 'admin') {
        req.flash('warning', 'You do not have the permission to grant permissions');
        return res.redirect('/users');
    }

    const targetUser = await getUserById(targetUserId);
    if (!targetUser) {
        req.flash('error', 'User not found.');
        return res.redirect('/users');
    }

    if (targetUser.role_name == 'admin') {
        req.flash('warning', 'You cannot change admin\'s role')
        return res.redirect('/users');
    }

    const updated = await grantPermission(targetUserId);
    if (!updated) {
        req.flash('warning', `Fail to grant permission to user id ${targetUserId}`);
        return res.redirect('/users');
    }
    req.flash('success', `Successfully granted permission to user id ${targetUserId}`);
    res.redirect('/dashboard');
}

const processRevokePermission = async (req, res) => {
    const targetUserId = parseInt(req.params.id);

    const currentUser = req.session.user;

    if (currentUser.role_name != 'admin') {
        req.flash('warning', 'You do not have the permission to revoke permissions');
        return res.redirect('/users');
    }

    const targetUser = await getUserById(targetUserId);
    if (!targetUser) {
        req.flash('error', 'User not found.');
        return res.redirect('/users');
    }

    if (targetUser.role_name == 'admin') {
        req.flash('warning', 'You cannot change admin\'s role')
        return res.redirect('/users');
    }

    const updated = await revokePermission(targetUserId);
    if (!updated) {
        req.flash('warning', `Fail to revoke permission to user id ${targetUserId}`);
        return res.redirect('/users');
    }
    req.flash('success', `Successfully revoke permission to user id ${targetUserId}`);
    res.redirect('/dashboard');
}

export { usersPage, processGivePermission, processRevokePermission };