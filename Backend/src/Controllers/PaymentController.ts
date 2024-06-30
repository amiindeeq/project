import { PrismaClient } from '@prisma/Client'
import { customUserRequest } from '../Helpers/jwt';
import { Response } from 'express';
import { newPayment } from '../Interfaces';
const prisma = new PrismaClient();



// Displaying All Payemnts
export const getAllPayments = async ( req : customUserRequest , res : Response) => {
    try {
        if(!req.User?.IsAdmin){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This Is Not Your Job !!'
            })
        }
      
        const findPayment = await prisma.payment.findMany({
            include : {
                User : {
                    select : {
                        Firstname : true,
                        Lastname : true,
                    }
                },
                Order : {
                    select : {
                        Or_Total : true
                    }
                }
            },
            where : {
                U_Id : req.User.U_Id
            }
        })
        if(!findPayment){
            return res.status(400).json({
                IsSuccess : false,
                message : ' There Is Not Payment'
            })
        }
        // const result = {
        //     Amount : findPayment.Order.Or_Total,
        //     D_Amount : findPayment.D_Amount,
        //     S_Total : findPayment.S_Total
        // }

        res.status(400).json({
            IsSuccess : true,
            message : ' All Payments Are Displayed Successfully',
            result : {...findPayment}
        })
    } catch (error) {
        return res.status(400).json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later !!'
        })
    }
}

// Creating New Payment
export const creatingNewPayment = async ( req : customUserRequest , res : Response ) => {
    try {
        const { Amount , D_Amount , S_Total , Paid , Balance , U_Id , Or_Id } = req.body as newPayment

        // Finding Order Using Order id 
        const findOrder = await prisma.payment.findFirst({
            include : {
              Order : {
                select : {
                    Or_Total : true,
                    
                }
              },
              User : {
                select : {
                    Firstname : true,
                    Lastname : true,
                }
              }
            },
            where : {
               Or_Id : req.params,
               U_Id : req.User?.U_Id
            }
        })
        const newTotal = Amount + D_Amount ;
         if(findOrder){
            const newPay = await prisma.payment.create({
                data : {
                    Amount : findOrder.Order.Or_Total!,
                    D_Amount : D_Amount,
                    S_Total : newTotal,
                    Paid : Paid,
                    Balance : Balance,
                    U_Id : req.User?.U_Id!,
                    Or_Id : +req.params
                }
            })
            const result = {
                Firstname : findOrder.User.Firstname,
                Lastname : findOrder.User.Lastname,
                Amount : findOrder.Order.Or_Total!,
                D_Amount : D_Amount,
                S_Total : newTotal,
                Paid : Paid,
                Balance : Balance,
                Date : newPay.Created_At 
            }
            return res.status(400).json({
                IsSuccess : true,
                message : ' New Payment Created Successfully',
                result
            })
         }
         if(!findOrder){
            return res.status(400).json({
                IsSuccess : false,
                message : ' This Order Is Not Found Please Check Up The Id '
            })
         }
    } catch (error) {
        return res.status(400).json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later !!'
        })
    }
}

