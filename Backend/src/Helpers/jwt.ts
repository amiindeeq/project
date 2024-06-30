import jwt from 'jsonwebtoken'
import { Request , Response , NextFunction } from 'express'

interface UserData {
    U_Id : number,
    // Firstname : string,
    // Lastname : string
    Username : string,
    IsAdmin : Boolean
}

export const generateToken = ( User : UserData) => {
    const Payload = User;
    return jwt.sign(Payload , 'SECRET_KEY_4321' , {
        expiresIn : '30d'
    })
}

export interface customUserRequest extends Request {
    User? : UserData
}

export const verifyToken = (
    req : customUserRequest,
    res : Response,
    next : NextFunction
) => {
    try {




        const Token = 
        req.headers.authorization?.startsWith('Bearer') &&
        req.headers.authorization?.split(' ')[1];

        // console.log(Token)
        
        if(!Token){
            return res.json({
                IsSuccess : false,
                message : 'UnAuthorized'.toUpperCase()
            })
        }
      
        const decode: UserData | any = jwt.verify(Token, 'SECRET_KEY_4321');

        req.User = { ...decode };
        next();
     
    } catch (error) {
        console.log(error)
        return res.json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later !!'.toUpperCase()
        })
    }
}