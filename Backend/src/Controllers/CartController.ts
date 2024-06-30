import { PrismaClient } from '@prisma/Client'
const prisma = new PrismaClient();
import { customUserRequest } from "../Helpers/jwt";
import { Response } from "express";

// Creating Cart 
export const newCart  = async ( req : customUserRequest , res : Response) => {
    try {
        // finding Cart if Already Created 
        const findCart = await prisma.cart.findFirst({
            where : {
                Cr_Id : req.User?.U_Id
            }
        })
        if(findCart){
            return res.status(200).json({
                IsSuccess : true,
                message : ' This Cart Already Created Successfully'
            })
        }
      if(!findCart){
       
        const cart = await prisma.cart.create({
            data : {
                Cr_Id : req.User?.U_Id!,
                U_Id : req.User?.U_Id!
            }
        })
        res.status(200).json({
            IsSuccess : true,
            message : ' Cart Created Successfully',
            result : {...cart}
        })
        return;
      }


    } catch (error) {
        console.log(error);
        res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong Try Again !!'
        })
    }
}

// Displaying All Carts 
export const getAllCarts = async ( req : customUserRequest , res : Response) => {
    try { 
        const carts = await prisma.cart.findFirst({
            include :{
                User : {
                    select : {
                        Username : true,
                        Email : true
                    }
                },
                Cart_Item : {
                    select : {
                        Cr_Id : true,
                        Pr_Id : true,
                        Product : {
                            select : {
                                Pr_Name : true,
                                Pr_Desc : true,
                                Pr_Price : true,
                                
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json({
            IsSuccess : true,
            message : ' All Carts Are Displayed',
            result : {...carts}
        })
    } catch (error) {
        return res.status(400).json({
            IsSuccess : false,
            message : ' Error Occured '
        })
    }
}

// Get All Cart Items 
export const getAllCartItems = async ( req : customUserRequest , res : Response ) => {
    try {
        const item = await prisma.cart_Item.findMany({
            where : {
                Cr_Id : req.User?.U_Id
            },
            include : {
                Product : true
            }
        })

        if(!item){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This User Cannot Make Cart'
            })
        }
        res.status(200).json({
            IsSuccess : true,
            message : ' All Cart Items Are Displayed Successfully',
            result : item
        })
    } catch (error) {
        console .log(error)
        return res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong  Please Try Again Later '
        })
    }
}

// Finding Cart Using By User Id 
export const getCartByUserId = async ( req : customUserRequest , res : Response ) => {
    try {
        const findCart = await prisma.cart.findFirst({
            where : {
                U_Id : req.User?.U_Id
            },
            include : {
                Cart_Item : {
                    select : {
                        Product : {
                            select : {
                                Pr_Id : true,
                                Pr_Name : true,
                                Pr_Price : true,
                                Pr_Image : true
                            }
                        }
                    }
                }
            }
        });

        if(!findCart){
            return res.status(404).json({
                IsSuccess : false,
                message : ' This Account Is Not Found'
            })
        }

        res.status(200).json({
            IsSuccess : false,
            message : ' Cart Items Displayed Successfully',
            result : {...findCart}
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            IsSuccess : false,
            message : 'SOMETHING__WENT__WRONG__PLEASE__TRY__AGAIN__LATER'
        })
    }
}

// Find Cart Items Using By User Id 
export const OneUserCarts = async ( req : customUserRequest , res : Response ) => {
    try {
        const Cr_Id = req.User?.U_Id
        const findCarts = await prisma.cart.findUnique({
            where : {
                Cr_Id : req.User?.U_Id
            },
            include : {
                Cart_Item : {
                    select : {
                        Quant:true,
                        Product : true
                    }
                }
            }
        })
        if(!findCarts){
            return res.status(400).json({
                IsSuccess : false,
                message : ' There Is No Cart Items'
            })
        }


        
        res.status(200).json({
            IsSuccess : true,
            message : ' User Cart Displayed Successfully',
            result : findCarts
            
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            IsSuccess : false,
            message : ' Server Is Down Try Again Later '
        })
    }
}

// Add Items To The Cart 
export const addToCart = async ( req : customUserRequest , res : Response) => {
    try {
        
        const   {Pr_Id}   = req.params
       
        const Cr_Id = req.User?.U_Id
        let userCart = await prisma.cart.findFirst({
            where : {
                Cr_Id : req.User?.U_Id!,
                U_Id : req.User?.U_Id
            }
        })
        if(!userCart){
           userCart = await prisma.cart.create({
            data : {
                Cr_Id : req.User?.U_Id!,
                U_Id : req.User?.U_Id!
            }
           })
        }

        const {quant} = req.body

        const cartQuant = await prisma.cart_Item.findFirst({
            where:{
                Cr_Id: +Cr_Id!
            }
        })

        if(!quant){
            return res.status(404).json({
                message:"Not Found quant!",
                isSuccess:false
            })
        }
 

    

    const addToCart = await prisma.cart_Item.create({
        data :{
            Cr_Id : Cr_Id! ,
            Quant : +quant,
            Pr_Id : +Pr_Id!
        }
    })



    res.status(200).json({
        IsSuccess : true,
        result : addToCart
    })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            IsSuccess : false,
            message : ' Failed To Create To Add New Item Your Cart Please Try Again !!'
        })
    }
}

// Remove One Product From Cart Item 
// export const removeProductCart = async ( req : customUserRequest , res : Response) => {
//     try {
//         const {Pr_Id} = req.body
//         const Cr_Id = req.User?.U_Id

//       const findItem = prisma.cart_Item.findFirst({
//         where : {
//             Cr_Id : Cr_Id,
//             Pr_Id : Pr_Id
//         }
//       })
//       if(!findItem){
//         return res.status(400).json({
//             IsSuccess : false,
//             message : ' This Product Does Not Found In The Cart'
//         })
//       }

//       await prisma.cart_Item.delete({
//         where : {
//             Ct_Id : findItem.Ct_Id!
//         }
//       })
        
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             IsSuccess : false,
//             message : ' Something Went Wrong Please Try Again Later' 
//         })
//     }
// }

// Delete Cart Item 
export const deleteCartItem = async ( req : customUserRequest , res : Response ) => {
    try {
       const  {Ct_Id} = req.params
       const Item = prisma.cart_Item.delete({
        where : {
            Ct_Id : +Ct_Id
        }
       })
       res.status(200).json({
        IsSuccess : true,
        message : 'Cart Item Removed Succesfully',
        result : Item
       })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later'
        })
    }
}