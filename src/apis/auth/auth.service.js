// import usersModel from '../../models/users.model.js'
// import userIdentityService from '../../service/authentication.service.js'
// import hashService from '../../service/hash.service.js'
// import mailService from '../../service/mail.service.js'
// import bcrypt from 'bcryptjs'

// class AuthService{
//     async register(registerInfo){
//         try {
//             const user = await usersModel.getUserByEmail(registerInfo.Email);
//             if(user != null){
//                 return false;
//             }

//             const hashObj = await hashService.hashPassword(registerInfo.Pwd);
//             registerInfo.Pwd = hashObj.hashedPassword;
//             await usersModel.createUser(registerInfo);
//             return true;
//         }catch(error){
//             throw new Error('Internal Service Error');
//         }
//     }

//     // async login(loginInfo){
//     //     try {
//     //         const user = await usersModel.getUserByEmail(loginInfo.email);
//     //         if(user == null){
//     //             return false;
//     //         }
//     //         const check = await hashService.checkPassword(loginInfo.password, user.Pwd);
//     //         if(!check){
//     //             return false;
//     //         }

//     //         const token = await userIdentityService.encodeToken(user);
//     //         return token;
//     //     }catch(error){
//     //         // throw error;
//     //         throw new Error('Internal Service Error');
//     //     }
//     // }

//     // async forgotPassword(email) {
//     //     try {
//     //         const user = await usersModel.getUserByEmail(email);

//     //         if(user == null){
//     //             return false //user not exist
//     //         }

//     //         // const secretKey = crypto.randomBytes(32).toString('hex');
//     //         // const passwordResetToken = crypto.createHash('sha256').update(secretKey).digest('hex');
//     //         const passwordResetToken = await bcrypt.genSalt(10);
//     //         const passwordResetExpiration = new Date(Date.now() + 10 * 60 * 1000); //10 minutes from the time sending req
//     //         const updateStatus = await usersModel.setPasswordToken(passwordResetToken, passwordResetExpiration, email);

//     //         if (updateStatus) {
//     //             mailService.sendEmail({
//     //                 emailFrom: 'thanhthanhvava2004@gmail.com',
//     //                 emailTo: email,
//     //                 emailSubject: 'Reset password',
//     //                 emailText:
//     //                     'Here is your reset password token: ' +
//     //                     passwordResetToken,
//     //             });
//     //             return true;
//     //         }

//     //         throw new Error('Can not reset password');
//     //     }catch(error){
//     //         throw error;
//     //     }
//     // }

//     // async resetPassword(email, passwordResetToken, newPassword) {
//     //     try {
//     //         const user = await usersModel.checkTokenPassword(email, passwordResetToken);

//     //         if(user == null){
//     //             return false; //invalid token or token has expired
//     //         }

//     //         const hashObj = await hashService.hashPassword(newPassword);
//     //         const updateStatus = await usersModel.resetPassword(hashObj.hashedPassword, new Date(), email);

//     //         if(updateStatus){
//     //             return true;
//     //         }

//     //         throw new Error('Reset password fail');
//     //     }catch(error){
//     //         throw error;
//     //     }
//     // }
// }

// export default new AuthService()
