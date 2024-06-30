import { PrismaClient } from '@prisma/Client'
const prisma = new PrismaClient()
import { Request, Response } from 'express'
import { customUserRequest, generateToken } from '../Helpers/jwt'
import bcrypt, { compareSync } from 'bcryptjs'
import { loginInterface, NewUser } from '../Interfaces'

// Get All Admins

export const getAllAdmin = async (req: customUserRequest, res: Response) => {
  const Items = await prisma.user.findMany({
    where: {
      Is_Admin: true,
      Role: 'Admin',
    },
  })
  if (Items) {
    return res.status(400).json({
      IsSuccess: false,
      message: 'Please Check The URL',
      Items,
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' All Admins Are Displayed',
  })
}
export const getAllSuperAdmin = async (
  req: customUserRequest,
  res: Response
) => {
  const Items = await prisma.user.findMany({
    where: {
      Is_Admin: true,
      Role: 'Super_Admin',
    },
  })
  if (!Items) {
    return res.status(400).json({
      IsSuccess: false,
      message: 'Please Check The URL',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' All Super Admins Are Displayed',
    Items,
  })
}
// Get All Users
export const getAllUsers = async (req: customUserRequest, res: Response) => {
  const Item = await prisma.user.findMany({
    where: {
      Is_Admin: false,
      Role: 'User',
    },
  })
  if (!Item) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Check The URL',
    })
  }
  return res.status(200).json({
    IsSuccess: true,
    message: 'All Users Are Displayed',
    Item,
  })
}

// Get All Peoples
export const AllUsers = async (req: customUserRequest, res: Response) => {
  try {
    const Item = await prisma.user.findMany()
    if (!Item) {
      return res.status(400).json({
        IsSuccess: false,
        message: ' No One Users Cannot Found',
      })
    }
    res.status(200).json({
      IsSuccess: true,
      message: ' Users Displayed Successfully',
      result: [...Item],
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      IsSuccess: false,
      message: 'Something Went Wrong Please Try Again Later ',
    })
  }
}

// Getting One User Using By Id
export const getOneUsers = async (req: customUserRequest, res: Response) => {
  const { User_Id } = req.params
  // Displaying User
  const User = await prisma.user.findFirst({
    where: {
      U_Id: +User_Id,
      Role: 'User',
    },
  })
  if (!User) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Something went wrong',
    })
  }
  return res.status(200).json({
    IsSuccess: true,
    message: ' User Is Displayed',
  })
}

// Creating New Users
export const creatingNweUser = async (
  req: customUserRequest,
  res: Response
) => {
  const {  Username, Phone, Emails, Passwords } =
    req.body as NewUser
  if ( !Username || !Emails || !Passwords||!Phone) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Provide Valid Data ',
    })
  }

  // Checking For Email
  const CheckEmail = await prisma.user.findFirst({
    where: {
      Email: Emails,
    },
  })
  // Checking For Phone
  const CheckPhone = await prisma.user.findFirst({
    where: {
      Phone: Phone,
    },
  })
  // Checking For Username
  const CheckUsername = await prisma.user.findFirst({
    where: {
      Username: Username,
    },
  })

  if (CheckEmail) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This Email Is Already Taken',
    })
  }

  if (CheckPhone) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This Phone Already Taken',
    })
  }

  if (CheckUsername) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This Username Is Already Taken ',
    })
  }
  const hash = bcrypt.hashSync(Passwords)
  // Creating New User
  const newUser = await prisma.user.create({
    data: {
      Username: Username,
      Phone: Phone,
      Email: Emails,
      Password: hash,
      Is_Admin: Emails === 'mdeeqxuseen@gmail.com',
      Role: Emails === 'mdeeqxuseen@gmail.com' ? 'Super_Admin' : 'User',
    },
  })

  if (!newUser) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Provide Valid Data ',
    })
  }
  res.status(200).json({
    IsSuccess: true,
    message: ' User Registered Successfully',
    result: { ...newUser },
  })
}

// Updating User
export const updatingUser = async (req: customUserRequest, res: Response) => {
  const UserId = req.params
  const { Firstname, Lastname, Username, Phone, Emails, Passwords } =
    req.body as NewUser
  if (!Firstname || !Lastname || !Username || !Phone || !Emails || !Passwords) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Provide Missing Data',
    })
  }
  if (!UserId) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Verify What You Want',
    })
  }

  // Update User
  const updateUser = await prisma.user.update({
    where: {
      U_Id: +UserId,
    },
    data: {
      // Firstname: Firstname,
      // Lastname: Lastname,
      Username: Username,
      Phone: Phone,
      Email: Emails,
      Password: Passwords,
    },
  })

  if (updateUser) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Provide Valid Data',
    })
  }

  res.status(200).json({
    IsSuccess: true,
    message: ' User Updated Successfully',
    updateUser,
  })
}

// Changing User Into Admin Using By Id
export const makingAdmin = async (req: customUserRequest, res: Response) => {
  if (!req.User?.IsAdmin) {
    return res.status(400).json({
      IsSuccess: false,
      message: 'Please Shaqadu Shaqadaadi Maaha Wareerka Jooji',
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      U_Id: +req.params.UserId!,
    },
  })
  if (!user) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' This User Is Not Found ',
    })
  }
  await prisma.user.update({
    where: {
      U_Id: +req.params.UserId,
    },
    data: {
      Is_Admin: !user.Is_Admin,
      Role: user.Is_Admin ? 'User' : 'Admin',
    },
  })
  res.status(200).json({
    IsSuccess: true,
    message: ' User Changed Into Admin Successfully ',
    user,
  })
}

// Interface Talks About Login
// His Name is Login Interface Imported With Interfaces

// User Login
export const Login = async (req: customUserRequest, res: Response) => {
  const { Email, Password } = req.body as loginInterface
  if (!Email || !Password) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Please Provide Valid Data ',
    })
  }
  // Checking Email
  const CheckEmail = await prisma.user.findUnique({
    where: {
      Email: Email,
    },
    select: {
      Email: true,
      // Firstname: true,
      // Lastname: true,
      Username: true,
      Is_Admin: true,
      U_Id: true,
      Role: true,
      Created_At: true,
      Password: true,
    },
  })
  if (!CheckEmail) {
    return res.status(400).json({
      IsSuccess: false,
      message: ' Invalid Credentials',
    })
  }
  const CheckPassword = compareSync(Password, CheckEmail.Password)
  if (!CheckPassword) {
    return res.status(401).json({
      IsSuccess: false,
      message: ' Invlaid Credentials ',
    })
  }

  const result = {
    Username: CheckEmail.Username,
    // Firstname: CheckEmail.Firstname,
    // Lastname: CheckEmail.Lastname,
    Joined_At: CheckEmail.Created_At,
    Role: CheckEmail.Role,
    token: generateToken({
      U_Id: CheckEmail.U_Id,
      // Firstname: CheckEmail.Firstname,
      // Lastname: CheckEmail.Lastname,
      Username: CheckEmail.Username,
      IsAdmin: CheckEmail.Is_Admin,
    }),
  }

  res.status(200).json({
    IsSuccess: true,
    message: ' Login Occurs Successfully',
    result,
  })
}
