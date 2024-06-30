import { PrismaClient } from '@prisma/Client'
import { customUserRequest } from '../Helpers/jwt';
import { Response } from 'express';
import { newReview } from '../Interfaces';
const prisma = new PrismaClient();



// Get All Reviews 
export const getAllReviews = async ( req : customUserRequest , res : Response ) => {
    try {
        const Item = await prisma.review.findMany({
            where : {
              IsDeleted : false
            },
            include : {
                Product : {
                    select : {
                        Pr_Id : true,
                        Pr_Name : true,
                        Pr_Desc : true
                    }
                },
                User : {
                    select : {
                        U_Id : true,
                        // Firstname : true,
                        // Lastname : true,
                        Username : true
                    }
                }
            }
        })

        

        if(!Item){
            return res.status(400).json({
                IsSuccess : false,
                message : ' There Is No Reviews'
            })
        }
        res.status(200).json({
            IsSuccess : true,
            message : ' All Reviews Are Displayed',
            result : Item
        })
    } catch (error) {
        return res.status(400).json({
            IsSuccess : false,
            message : ' Soemthing Went Wrong Please Try Again Later !!'
        })
    }
}

// Creating New Review 
export const creatingNewReview = async ( req : customUserRequest , res : Response ) => {
    // try { 

        const { Rating , Comment , Pr_Id} = req.body as newReview

        const checkReview = await prisma.review.findFirst({
            where : {
                Pr_Id : Pr_Id,
                Author_Id : req.User?.U_Id
            }
        })

        if(checkReview){
            const Item = await prisma.review.update({
                where : {
                    Rev_Id : checkReview.Rev_Id
                },
                data : {
                    Rating : Rating,
                    Comment : Comment,
                    Pr_Id : Pr_Id
                }
            })
            return res.status(200).json({
                IsSuccess : true,
                message : ' Review Added Succesfully',
                result : {...Item}
            })
        }
        if(!checkReview){
            const Item = await prisma.review.create({
                data : {
                    Rating : Rating,
                    Comment : Comment,
                    Author_Id : req.User?.U_Id!,
                    Pr_Id : 1
                }
            })
            return res.status(200).json({
                IsSuccess : true,
                message : ' Review Added Successfully',
                result : {...Item}
            })
        }
        
    // } catch (error) {
    //     return res.status(400).json({
    //         IsSuccess : false,
    //         message : ' Something Went Wrong Please Try Again Later !!'
    //     })
    // }
}

// Displaying All Review Of Product Using By Product Id  
export const getOneReviewPro = async ( req : customUserRequest , res : Response ) => {
    try {
          const { Pr_Id } = req .params

          const Check = await prisma.review.findFirst({

            include : {
                Product : {
                    select : {
                        Pr_Name : true,
                        Pr_Desc : true
                    }
                },
                User :  {
                    select : {
                        U_Id : true,
                        Username : true,
                        Email : true
                    },
                  
                }
            },
            where : {
                Pr_Id  : + Pr_Id,
                
            },
            
          })

        const Item = await prisma.review.findMany({
        where : {
            Pr_Id : + Pr_Id,
            
        }
           
        })
        if(!Item){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This Product Have No Reviews '
            })
        }
        const result = {
            Pr_Id : Check?.Pr_Id,
            Pr_Name : Check?.Product.Pr_Name,
            Pr_Desc : Check?.Product.Pr_Desc,
            Item : {...Item}
        }
        res.status(200).json({
            IsSuccess : false,
            message : ' One Product Succesfully Displayed ',
            result 
        })
    } catch (error) {
        return res.status(400).json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later !!'
        })
    }
}

// Removing Review Using By Id 
export const removingReview = async ( req : customUserRequest , res : Response ) => {
    try {
        
        const {Rev_Id} = req.params

        const findReview = await prisma.review.update({
            where : {
                Rev_Id : + Rev_Id
            },
            data : {
                IsDeleted: true
            }
        })
        if(!findReview){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This Review Is Not Found'
            })
        }
        res.status(200).json({
            IsSuccess : true,
            message : ' Review Removed Successfully'
        })
    } catch (error) {
        return res.status(400).json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later !!'
        })
    }
}

// Restoring Reveiew Using By Id 
export const restoringReview = async ( req : customUserRequest , res : Response ) => {
    try {
        if(!req.User?.IsAdmin){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This Is Not Your Job '
            })
        }
        
        const { Rev_Id } = req.params

        const Item = await prisma.review.update({
            where : {
                Rev_Id :  + Rev_Id 
            }, 
            data : { 
                IsDeleted : false
            }
        })
        if(!Item){
            return res.status(400).json({
                IsSuccess : false,
                messsge : ' This Review Is Not Deleted Please Check Up The Id '
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later !!'
        })
    }
}

// Deleting Review Using By Id 
export const deletingReveiw = async ( req : customUserRequest , res : Response ) => {
    try {
        if(!req.User?.IsAdmin){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This Is Not Your Job '
            })
        }

        const {Rev_Id} = req.params

        const Item = await prisma.review.delete({
            where : {
                Rev_Id : + Rev_Id
            }
        })
        if(!Item){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This Review Is Not Found'
            })
        }
        res.status(200).json({
            IsSuccess : false,
            message : ' This Review Deleted Successfully ',
            result : {...Item}
        })
        
    } catch (error) {
        return res.status(400).json({
            IsSuccess :false,
            message : ' Something Went Wrong Please Try Again Later !!'
        })
    }
}