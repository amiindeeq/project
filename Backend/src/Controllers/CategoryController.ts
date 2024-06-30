import { PrismaClient } from "@prisma/Client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { customUserRequest } from "../Helpers/jwt";
import { NewCategory } from "../Interfaces";
import cloudinary from "../cloudinary";
import upload from "../Helpers/utils/Multer";

// Displaying All Aviable Catgeories
export const getAllCategories = async (
  req: customUserRequest,
  res: Response
) => {
  const Item = await prisma.category.findMany({
    where: {
      Is_Deleted: false,
    },
    include : {
      Product : {}
    }
  });
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: "No One Category Is Found ",
    });
  }
  res.status(200).json({
    IsSuccess: true,
    message: " All Categories Are Displayed",
    result: Item,
  });
};

// Displaying One Category Using By Id
export const getOneCategory = async (req: customUserRequest, res: Response) => {
  const { Ca_Id } = req.params;
  // Displaying One Item
  const Item = await prisma.category.findFirst({
    where: {
      Ca_Id: +Ca_Id,
      Is_Deleted: false,
    },
  });
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: " This Category Is Not Found",
    });
  }
  res.status(200).json({
    IsSuccess: true,
    message: " Category Is Displayed Successfully",
    result: Item,
  });
};
// Displaying One Category In Trash  Using By Id
export const getOneCategoryTrash = async (req: customUserRequest, res: Response) => {
  const { Ca_Id } = req.params;
  // Displaying One Item
  const Item = await prisma.category.findFirst({
    where: {
      Ca_Id: +Ca_Id,
      Is_Deleted: true,
    },
  });
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: " This Category Is Not Found",
    });
  }
  res.status(200).json({
    IsSuccess: true,
    message: " Category Is Displayed Successfully",
    result: Item,
  });
};

// Creating New Category
export const creatingCategory = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    if (!req.User?.IsAdmin) {
      return res.status(400).json({
        IsSuccess: false,
        message: " This Is Not Your  Job Go Head !!",
      });
    }
    const { Ca_Name, Ca_Desc } = req.body as NewCategory;
    // if(!Ca_Name || !Ca_Desc  ){
    //     return res.status(400).json({
    //         IsSuccess : false,
    //         message : ' Please Provide Complete Information'
    //     })
    // }
    // Checking Category If Already Exists

    const CheckName = await prisma.category.findFirst({
      where: {
        Ca_Name: Ca_Name,
      },
    });
    if (CheckName) {
      return res.status(400).json({
        IsSuccess: false,
        message: " This Category Is Already Exist",
      });
    }

    const file = req.file;

    const uploadImage = await cloudinary.uploader.upload(file?.path!);

    // Create Category
    const Item = await prisma.category.create({
      data: {
        Ca_Name: Ca_Name,
        Ca_Desc: Ca_Desc,
        Ca_Image: uploadImage.secure_url,
        Author_Id: req.User?.U_Id!,
      },
    });
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: " Please Provide Valid Data",
      });
    }
    res.status(200).json({
      IsSuccess: true,
      message: " Category Created Successfully ",
      result: Item,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      IsSuccess: false,
      message: " Something Went Please Try Again Later ",
    });
  }
};

// Updating Category
export const updatingCategory = async (
  req: customUserRequest,
  res: Response
) => {
  // try {
  const  {Ca_Id}  = req.params;
  const { Ca_Name, Ca_Desc } = req.body;

  if (!Ca_Name || !Ca_Desc) {
    return res.status(400).json({
      IsSuccess: false,
      message: " Please Provide Complete Data ",
    });
  }
  // Checking Category Is Aviable Or Not
  const CheckItem = await prisma.category.findFirst({
    where: {
      Ca_Id: +Ca_Id
    },
  });
  if (!CheckItem) {
    return res.status(400).json({
      IsSuccess: false,
      message: " This Category Is Not Found ",
    });
  }

  //  Cloudinary Image
  const file = req.file;

  const uploadImage = await cloudinary.uploader.upload(file?.path!);
  // Upadte Category
  const updateCategory = await prisma.category.update({
    where: {
      Ca_Id: +Ca_Id,
    },
    data: {
      Ca_Name: Ca_Name,
      Ca_Desc: Ca_Desc,
      Ca_Image: uploadImage.secure_url,
      Author_Id: req.User?.U_Id,
    },
  });
  if (!updateCategory) {
    return res.status(400).json({
      IsSuccess: false,
      message: " Please Check The Data That You Sent",
    });
  }
  res.status(200).json({
    IsSuccess: true,
    message: " Category Updated Successfully",
    result: updateCategory,
  });

  // } catch (error) {
  //   res.status(400).json({
  //     IsSuccess : false,
  //     message : ' Something Went Wrong Please Try Again Later '
  //   })

  // }
};

// Removing Category
export const removingCategory = async (
  req: customUserRequest,
  res: Response
) => {
  const { Ca_Id } = req.params;
  // Find Category
  const CheckCategory = await prisma.category.findFirst({
    where: {
      Ca_Id: +Ca_Id,
      Is_Deleted: false,
    },
  });
  if (!CheckCategory) {
    return res.status(400).json({
      IsSuccess: false,
      message: " This Category Is Not Aviable",
    });
  }
  // Remove Category
  const removeCategory = await prisma.category.update({
    where: {
      Ca_Id: +Ca_Id,
    },
    data: {
      Is_Deleted: true,
    },
  });
  if (!removeCategory) {
    return res.status(400).json({
      IsSuccess: false,
      message: " This Category Already Deleted",
    });
  }
  const result = {
    Ca_Id: removeCategory.Ca_Id,
    Ca_Name: removeCategory.Ca_Name,
    Created_At: removeCategory.Created_At,
    Is_Deleted: removeCategory.Is_Deleted,
  };
  res.status(200).json({
    IsSuccess: true,
    message: " Category Deleted Successfully",
    result,
  });
};

// Restoring Category
export const restoringCategory = async (
  req: customUserRequest,
  res: Response
) => {
  const { Ca_Id } = req.params;
  // Finding Category Is Deleted Or Not
  const checkCategory = await prisma.category.findFirst({
    where: {
      Ca_Id: +Ca_Id,
      Is_Deleted: true,
    },
  });
  if (!checkCategory) {
    return res.status(400).json({
      IsSuccess: false,
      message: " This Category Is Not Deleted ",
    });
  }
  // Restore Category
  const restoreCategory = await prisma.category.update({
    where: {
      Ca_Id: +Ca_Id,
    },
    data: {
      Is_Deleted: false,
    },
  });
  if (!restoreCategory) {
    return res.status(400).json({
      IsSuccess: false,
      message: " Please Check What You Want",
    });
  }
  const result = {
    Ca_Id: restoreCategory.Ca_Id,
    Ca_Name: restoreCategory.Ca_Name,
    Created_At: restoreCategory.Created_At,
    Is_Deleted: restoreCategory.Is_Deleted,
  };
  res.status(200).json({
    IsSuccess: true,
    message: " Category Restored Successfully ",
    result,
  });
};

// Recycle Pin
export const RecyclePin = async (req: customUserRequest, res: Response) => {
  const Item = await prisma.category.findMany({
    where: {
      Is_Deleted: true,
    },
  });
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: " Recycle Pin Is Empty",
    });
  }
  // Response Data

  res.status(200).json({
    IsSuccess: true,
    message: " Deleted Categories Are Displayed",
    result: Item,
  });
};

// Publishing Category
export const publishingCategory = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    const { Ca_Id } = req.params;
    const findItem = await prisma.category.findFirst({
      where: {
        Ca_Id: +Ca_Id,
      },
    });
    if (!Ca_Id) {
      return res.status(400).json({
        IsSuccess: false,
        message: " This Category Is Not Found",
      });
    }
    // Publish Category
    const Item = await prisma.category.update({
      where: {
        Ca_Id: +Ca_Id,
      },
      data: {
        Publish: !findItem?.Publish,
      },
    });
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: " This Category Already Published",
      });
    }
    res.status(200).json({
      IsSuccess: true,
      message: " Category Published Successfully",
      result: Item,
    });
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: " Something Went Wrong Please Try Again Later!!",
    });
  }
};

// Displaying Published Items
export const publishedCategory = async (
  req: customUserRequest,
  res: Response
) => {
  const Item = await prisma.category.findMany({
    where: {
      Publish: true,
    },
  });
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: "No One Category Is Found ",
    });
  }
  res.status(200).json({
    IsSuccess: true,
    message: " Published Categories Are Displayed",
    result: Item,
  });
};
// Deleting UnWanted Category
export const deletingCategory = async (
  req: customUserRequest,
  res: Response
) => {
  try {
    if (!req.User?.IsAdmin) {
      return res.status(400).json({
        IsSuccess: false,
        message: " You Are Not Able To Do This Job",
      });
    }
    const { Ca_Id } = req.params;
    // Finding Category
    const findItem = await prisma.category.findFirst({
      where: {
        Ca_Id: +Ca_Id,
      },
    });
    if (!findItem) {
      return res.status(400).json({
        IsSuccess: false,
        message: " This Category Is Not Found",
      });
    }
    // Deleting Category
    const deleteCategory = await prisma.category.delete({
      where: {
        Ca_Id: +Ca_Id,
      },
    });
    if (!deleteCategory) {
      return res.status(400).json({
        IsSuccess: false,
        message: " This Category Already Deleted Succesfully",
      });
    }
    res.status(200).json({
      IsSuccess: false,
      message: " Category Deleted Successfully",
      result: deleteCategory,
    });
  } catch (error) {
    return res.status(400).json({
      IsSuccess: false,
      message: " Something Went Wrong Please Try Again Later !!",
    });
  }
};
