import { PrismaClient } from '@prisma/Client'
const prisma = new PrismaClient()
import { Response, Request } from 'express'
import { customUserRequest } from '../Helpers/jwt'
import { NewOrder } from '../Interfaces'

// Displaying All Order
export const getAllOrders = async (req: customUserRequest, res: Response) => {
  try {
    const Items = await prisma.order.findMany({
      where: {
        Is_Deleted: false,
      },
      include: {
        User: {
          select: {
            Email: true,
            U_Id: true,
            Username: true,
          },
        },
      },
    })

    const newData = Items.map((order: any) => {
      const setItems = JSON.parse(order.Items)
      return {
        ...order,
        Items: setItems,
      }
    })

    res.json({
      IsSuccess: true,
      message: 'Orders Are Displayed Successfully',
      result: [...newData],
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later ',
    })
  }
}

export const AllUserOrders = async (req: customUserRequest, res: Response) => {
  try {
    const Items = await prisma.order.findMany({
      where: {
        Cr_Id: req.User?.U_Id,
        Is_Deleted: false,
      },
      include: {
        User: true,
      },
    })

    const newData = Items.map((order: any) => {
      const setItems = JSON.parse(order.Items)
      return {
        ...order,
        Items: setItems,
      }
    })

    res.json({
      IsSuccess: true,
      message: ' All User Order Are Displayed ',
      result: newData,
    })
  } catch (error) {
    res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later ',
    })
  }
}

export const getallOrderUser = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    const Item = await prisma.order.findMany({
      where: {
        Is_Deleted: false,
        Author_Id: req.User?.U_Id,
        isPaid: false,
      },
      include: {
        User: true,
      },
    })

    if (Item.length === 0) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' There Is No Users Order',
      })
    }

    const newData = Item.map((order: any) => {
      const setItems = JSON.parse(order.Items)
      return {
        ...order,
        Items: setItems,
      }
    })

    res.status(200).json({
      IsSuccess: true,
      message: 'User Orders Successfully Displayed',
      result: newData,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later ',
    })
  }
}
// Get One Order Using By Id
export const getOneOrder = async (req: customUserRequest, res: Response) => {
  try {
    const { Or_Id } = req.params;
    const Item = await prisma.order.findFirst({
      where: {
        Or_Id: +Or_Id,
      },include:{
        User:true
      }
    });

    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: 'This Order Is Not Found',
      });
    }

    // Parse the JSON string in the Items array
    if (Item.Items && Item.Items.length > 0) {
      Item.Items = Item.Items.map((item:any) => JSON.parse(item));
    }

    res.status(200).json({
      IsSuccess: true,
      message: 'One Order Successfully Displayed',
      Item,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({
      IsSuccess: false,
      message: 'Something Went Wrong. Please Try Again Later!!',
    });
  }
};




// Create New Order
export const newOrder = async (req: customUserRequest, res: Response) => {
  try {
    const Cr_Id = req.User?.U_Id
    // const { Or_Price, Or_Total, Tax_Price, Address } = req.body as NewOrder;
    const Author_Id = req.User?.U_Id

    const findCart = await prisma.cart.findFirst({
      where: {
        Cr_Id: Cr_Id,
      },
      include: {
        Cart_Item: {
          select: {
            Product: true,
            Quant: true,
          },
        },
      },
    })
    if (!findCart) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Cart Is Not Found ',
      })
    }
    const Total = findCart.Cart_Item.reduce((prev, current) => {
      const price = parseInt(current.Product.Pr_Price.toString())
      const quantity = parseInt(current.Quant.toString())
      return prev + price * quantity
    }, 0)

    const newOrder = await prisma.order.create({
      data: {
        Items: JSON.stringify(findCart.Cart_Item!),
        Or_Total: +Total,
        Cr_Id: Cr_Id!,
        Author_Id: Author_Id!,
      },
    })

    await prisma.cart.delete({
      where: {
        Cr_Id: +findCart.Cr_Id!,
      },
    })

    res.status(200).json({
      IsSuccess: true,
      message: ' Order Registered Successfully ',
      result: { ...newOrder },
    })
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later !!',
    })
  }
}
// Updating Exits Orders
export const updatingOrder = async (req: customUserRequest, res: Response) => {
  try {
    const { Or_Id } = req.params
    const Author_Id = req.User?.U_Id
    const { Or_Price, Tax_Price, Or_Total, Address } = req.body as NewOrder
    if (!Or_Price || !Tax_Price || !Or_Total || !Address) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' Please Provide Complete Data',
      })
    }
    // Finding Order Using by Order Id
    const findOrder = await prisma.order.findFirst({
      where: {
        Or_Id: +Or_Id,
      },
    })
    if (!findOrder) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Order Is Not Found',
      })
    }
    // Update Order
    const Item = prisma.order.update({
      where: {
        Or_Id: +Or_Id,
      },
      data: {
        Or_Total: Or_Total,
        Author_Id: req.User?.U_Id,
      },
    })
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Order Is Not Found',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Order Updated Successfully',
      result: { ...Item },
    })
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later !!!',
    })
  }
}

// Removing Order
export const removingOrder = async (req: customUserRequest, res: Response) => {
  try {
    const { Or_Id } = req.params
    // Finding Item
    const findOrder = await prisma.order.findFirst({
      where: {
        Or_Id: +Or_Id,
      },
    })
    if (!findOrder) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Order Is Not Found',
      })
    }
    // Remove Order Using By Id
    const removeOrder = await prisma.order.update({
      where: {
        Or_Id: +Or_Id,
      },
      data: {
        Is_Deleted: true,
      },
    })
    if (!removeOrder) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' Please Check The Data That You Sent',
      })
    }
  } catch (error) {}
}

// Restoring Order
export const restoringOrder = async (req: customUserRequest, res: Response) => {
  try {
    const { Or_Id } = req.params
    // Find Order If Is Deleted Or Not
    const findOrder = await prisma.order.findFirst({
      where: {
        Or_Id: +Or_Id,
        Is_Deleted: true,
      },
    })
    if (!findOrder) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Order Is Not Deleted Please Check What You Want!!',
      })
    }
    // Restore Order Using By His Id
    const restoreOrder = await prisma.order.update({
      where: {
        Or_Id: +Or_Id,
      },
      data: {
        Is_Deleted: false,
      },
    })
    if (!restoreOrder) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' Please Provide Valid Data ',
      })
    }
    const result = {
      Or_Id: restoreOrder.Or_Id,
      Or_Status: restoreOrder.Or_Status,
      Items: restoreOrder.Items,
      Is_Deleted: restoreOrder.Is_Deleted,
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Order Restored Successfully',
      result,
    })
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later!!',
    })
  }
}
//  Trashing Order
export const trashingOrders = async (req: customUserRequest, res: Response) => {
  try {
    const Item = await prisma.order.findMany({
      where: {
        Is_Deleted: true,
      },
    })
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' Recycle Pin Is Empty',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Deleted Orders Are Displayed',
      result: { ...Item },
    })
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later!!',
    })
  }
}
// Deleting All Orders
export const deletingAllOrder = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    const item = await prisma.order.deleteMany({})

    res.status(400).json({
      IsSuccess: true,
      message: ' All Orders Are Deleted Successfully',
      result: item,
    })
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later',
    })
  }
}
