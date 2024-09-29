import jwt from 'jsonwebtoken'

class UserIdentityService {
    constructor(){
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    }

    async encodeToken(user) {
        return jwt.sign(
            { 
                id: user.UserID
            }, 
            this.JWT_SECRET, 
            {
                expiresIn: this.JWT_EXPIRES_IN,
                algorithm: 'HS256',
            }
        )
    }

    async decodeToken(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
}

export default new UserIdentityService()
