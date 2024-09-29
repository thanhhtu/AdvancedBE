// import authService from './auth.service.js';

// class AuthController {
//     async register(req, res, next){
//         try{
//             const {Email, Password, Gender, Age, Role} = req.body;

//             const check = await authService.register({Email, Password, Gender, Age, Role});
            
//             if(check){
//                 return res.status(201).json({
//                     success: true,
//                     message: 'Created user'
//                 });
//             }

//             return res.status(409).json({
//                 success: false,
//                 message: 'Email already exist'
//             });
            
//         }catch(error){
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
    
//     // async getMe(req, res, next) {
//     //     try {
//     //         return res.json({
//     //             success: true,
//     //             message: req.user,
//     //         });
//     //     } catch (error) {
//     //         return res.status(500).json({
//     //             success: false,
//     //             message: "Internal Server Error"
//     //         });
//     //     }
//     // }

//     // async login(req, res, next){
//     //     try{
//     //         const {email, password} = req.body;
//     //         const token = await authService.login({email, password});
            
//     //         if(token){
//     //             console.log('token: ', token)
//     //             return res.status(200).json({
//     //                 success: true,
//     //                 message: token
//     //             });
//     //         }
            
//     //         return res.status(401).json({
//     //             success: false,
//     //             message: 'Invalid email or password'
//     //         });
//     //     }catch(error){
//     //         return res.status(500).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

//     // async forgotPassword(req, res, next){
//     //     try {
//     //         const {email} = req.body;

//     //         const check = await authService.forgotPassword(email);
//     //         console.log(check);
//     //         if(check){
//     //             return res.status(200).json({
//     //                 success: true,
//     //                 message: 'Reset password email sent successfully'
//     //             });
//     //         }

//     //         return res.status(400).json({
//     //             success: false,
//     //             message: "Email not found"
//     //         });
//     //     } catch (error) {
//     //         return res.status(400).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

//     // async resetPassword(req, res, next){
//     //     try {
//     //         const {email, passwordResetToken, newPassword} = req.body;

//     //         const check = await authService.resetPassword(email, passwordResetToken, newPassword);
//     //         console.log(check)
//     //         if(check){
//     //             return res.status(200).json({
//     //                 success: true,
//     //                 message: 'Reset password successfully'
//     //             });
//     //         }

//     //         return res.status(400).json({
//     //             success: false,
//     //             message: "Invalid token or token has expired"
//     //         });
//     //     } catch (error) {
//     //         return res.status(400).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }
// }

// export default new AuthController();