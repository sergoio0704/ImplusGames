const accountRepository = require('../repositiories/accountRepository')
const authenticator = require('./authenticator')

async function getAccount(req, res) {
    try {
        const accountId = req.account.id
        const account = await accountRepository.getAccountById(accountId);
        if (!account) {
            return res.status(501).json({
                msg: 'internal_error'
            })
        }
        
        const accountRole = await accountRepository.getAccountRoleById(accountId)
        account.role = accountRole.name

        res.status(200).json(account)
    } catch(e) {
        res.status(501)
        res.json({msg: 'internal_error'})
    }
}

module.exports = function (app) {
    app.get('/api/v1/account', authenticator.apiAuthenticateJWT, getAccount)
    // app.post('/api/v1/profileData/save', [upload.single('avatar'), authenticator.apiAuthenticateJWT], saveProfileData);
    // app.get('/api/v1/avatar', authenticator.apiAuthenticateJWT, getAvatar);
};