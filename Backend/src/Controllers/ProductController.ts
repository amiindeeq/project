import { PrismaClient } from '@prisma/Client'
const prisma = new PrismaClient()
import { customUserRequest } from '../Helpers/jwt'
import { Response } from 'express'
import { NewProduct } from '../Interfaces'
import cloudinary from '../cloudinary'

// Displaying All Products
export const getAllProducts = async (req: customUserRequest, res: Response) => {
  const Item = await prisma.product.findMany({
    where: {
      Is_Deleted: false,
    },
  })
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Products Not Found ',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' All Products Are Displayed ',
    result: Item,
  })
}

// Displaying One Product Using By Id
export const getOneProduct = async (req: customUserRequest, res: Response) => {
  try {
    const { Pr_Id } = req.params

    // Display Item
    const Item = await prisma.product.findFirst({
      where: {
        Pr_Id: +Pr_Id,
        Is_Deleted: false,
      },
    })
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Product Is Not Found  ',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' One Product Successfully Displayed',
      result: Item,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      IsSuccess: false,
      message: ' Server Is Down Please Try Again Later !!',
    })
  }
}

// Creating New Product
export const creatingProduct = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    if (!req.User?.IsAdmin) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' You Are Not Able To Do This Job',
      })
    }

    const { Pr_Name, Pr_Desc, Pr_Price, Pr_Quantity, Ca_Id } =
      req.body as NewProduct

    if (!Pr_Name || !Pr_Desc || !Pr_Price || !Pr_Quantity || !Ca_Id) {
      return res.status(400).json({
        message: 'invalid your data please compelete',
        isSuccess: false,
      })
    }

    // Cloudinary Part

    const imageUrls: string[] = []

    for (const file of req.files as Express.Multer.File[]) {
      const imageUpload = await cloudinary.uploader.upload(file.path)
      imageUrls.push(imageUpload.secure_url)
    }

    // Create Product
    const newProduct = await prisma.product.create({
      data: {
        Pr_Name: Pr_Name,
        Pr_Desc: Pr_Desc,
        Pr_Price: +Pr_Price,
        Pr_Quantity: +Pr_Quantity,
        Pr_Image: imageUrls.join(','),
        Ca_Id: +Ca_Id,
        Author_Id: req.User.U_Id,
      },
    })
    if (!newProduct) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' Please Provide Valid Data',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Product Created Successfully',
      result: newProduct,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Agaun Later',
    })
  }
}

// Updating Category
export const updatingProduct = async (
  req: customUserRequest,
  res: Response
) => {
  const Pr_Id = req.params
  const Author_Id = req.User?.U_Id
  const { Pr_Name, Pr_Desc, Pr_Price, Pr_Quantity, Ca_Id } =
    req.body as NewProduct
  // if(!Pr_Id || !Pr_Name || !Pr_Desc || !Pr_Price || !Pr_Quantity || !Pr_Image || !Ca_Id){
  //     return res.status(400).json({
  //         IsSuccess : false,
  //         message : ' Please Provide Complete Data '
  //     })
  // }

  // Cloudinary Part
  const file = req.file

  const uploadImage = await cloudinary.uploader.upload(file?.path!)
  // Create Product
  const updateProduct = await prisma.product.update({
    where: {
      Pr_Id: +Pr_Id,
    },
    data: {
      Pr_Name: Pr_Name,
      Pr_Desc: Pr_Desc,
      Pr_Price: +Pr_Price,
      Pr_Quantity: +Pr_Quantity,
      Pr_Image: uploadImage.secure_url,
      Ca_Id: Ca_Id,
      Author_Id: req.User?.U_Id!,
    },
  })
  if (!updateProduct) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Provide Valid Data',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' Product Updated Successfully',
    result: { ...updateProduct },
  })
}

// Removing Product
export const removingProduct = async (
  req: customUserRequest,
  res: Response
) => {
  const { Pr_Id } = req.params
  // Finding Product
  const findProduct = await prisma.product.findFirst({
    where: {
      Pr_Id: +Pr_Id,
      Is_Deleted: false,
    },
  })
  if (!findProduct) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This Product Is Not Aviable',
    })
  }
  // Remove Product Now \
  const removeProduct = await prisma.product.update({
    where: {
      Pr_Id: +Pr_Id,
    },
    data: {
      Is_Deleted: true,
    },
  })
  if (!removeProduct) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This Product Already Deleted',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' Product Deleted Succesfully',
    result: { ...removeProduct },
  })
}

// Restore Product
export const restoringProduct = async (
  req: customUserRequest,
  res: Response
) => {
  const { Pr_Id } = req.params
  // Finding Product Is deleted Or Not
  const findProduct = await prisma.product.findFirst({
    where: {
      Pr_Id: +Pr_Id,
      Is_Deleted: true,
    },
  })
  if (!findProduct) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Product Is Not Deleted Please Check Him',
    })
  }
  // Restore Product
  const restoreProduct = await prisma.product.update({
    where: {
      Pr_Id: +Pr_Id,
    },
    data: {
      Is_Deleted: false,
    },
  })
  if (!restoreProduct) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Something Went Wrong',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' Product Restored Succesfully ',
    result: { ...restoreProduct },
  })
}

//Recycle Pin
export const trashItems = async (req: customUserRequest, res: Response) => {
  try {
    const Item = await prisma.product.findMany({
      where: {
        Is_Deleted: true,
      },
    })
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' Recyle Pin Is Empty',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Trash Items Are Displayed',
      result: { ...Item },
    })
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something went wrong  Please Try Again Later !!',
    })
  }
}

// Published Item
export const publishingProducts = async (
  req: customUserRequest,
  res: Response
) => {
  if (!req.User?.IsAdmin) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Wareerka Jooji Wll Ku Koobnaw shaqadaada',
    })
  }
  const { Pr_Id } = req.params
  // FInding Item
  const findProduct = await prisma.product.findFirst({
    where: {
      Pr_Id: +Pr_Id,
      Is_Deleted: false,
    },
  })
  if (!findProduct) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This Product Is Not Found',
    })
  }
  // Publishing Products
  const Item = await prisma.product.update({
    where: {
      Pr_Id: +Pr_Id,
    },
    data: {
      Published: !findProduct.Published,
    },
  })
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This Product Already Published',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' Product Published Successfully',
    result: Item,
  })
}

// Displaying Published items
export const publishedProducts = async (
  req: customUserRequest,
  res: Response
) => {
  // if (!req.User?.IsAdmin) {
  //   return res.status(400).json({
  //     IsSuccess: false,
  //     message: " Shaqadaada Maaha Baah !!",
  //   });
  // }
  const Item = await prisma.product.findMany({
    where: {
      Published: true,
    },
  })
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Products Until Not Published',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' Published Products Displayed Successfully',
    result: Item,
  })
}

// Deleting Products
export const deletingProducts = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    if (!req.User?.IsAdmin) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Is Not Your Job',
      })
    }
    const { Pr_Id } = req.params
    // Finding Item
    const findItem = await prisma.product.delete({
      where: {
        Pr_Id: +Pr_Id,
      },
    })
    if (!findItem) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Product Is Not Found',
      })
    }
    const result = {
      Pr_Id: findItem.Pr_Id,
      Pr_Name: findItem.Pr_Name,
      Created_At: findItem.Created_At,
      IsDeleted: findItem.Is_Deleted,
    }
    res.status(200).json({
      isSuccess: true,
      message: ' Product Deleted Successfully',
      result,
    })
  } catch (error) {
    return res.status(500).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later',
    })
  }
}

// Deleting All Product In One Time
export const AllDelete = async (req: customUserRequest, res: Response) => {
  try {
    const item = await prisma.product.deleteMany({})

    if (!item) {
      return res.status(400).json({
        IsSuccess: false,
        message: 'Products Not Found ',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Many Products Are Deleted',
      item,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      IsSuccess: false,
      message: ' Fieled To Delete Many Products ',
    })
  }
}

// Adding Arrival Or Removing In One Click
export const ArrivingOneProduct = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    const { Pr_Id } = req.params
    const findItem = await prisma.product.findFirst({
      where: {
        Pr_Id: +Pr_Id,
      },
    })
    if (!Pr_Id) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Product Is Not Found',
      })
    }
    // Publish Category
    const Item = await prisma.product.update({
      where: {
        Pr_Id: +Pr_Id,
      },
      data: {
        Arrival: !findItem?.Arrival,
        Published: !findItem?.Published,
      },
    })
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' This Product Already Arrived',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Product Arriving Successfully',
      result: Item,
    })
  } catch (error) {
    res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later ',
    })
  }
}

// Arrived Products
export const ArrivedProducts = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    const Item = await prisma.product.findMany({
      where: {
        Is_Deleted: false,
        Arrival: true,
      },
    })

    if (!Item) {
      return res.status(200).json({
        IsSuccess: false,
        message: ' There Is No Arrival Product',
      })
    }

    res.status(200).json({
      IsSuccess: true,
      message: ' Arrived Products Successfully Displayed',
      result: Item,
    })
  } catch (error) {
    res.status(400).json({
      IsSuccess: false,
      message: ' Something Went Wrong Please Try Again Later',
    })
  }
}
