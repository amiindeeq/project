import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginFn, reset as resetLoginState } from '../../Redux/Slices/Login'
import { setUser } from '../../Redux/Slices/userInfo'
import { AppDispatch, RootState } from '../../Redux/Store'

import { LockClosedIcon } from '@heroicons/react/24/solid'
import {
  Button,
  Card,
  CardBody,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react'
import { registerFn, resetRegisterState } from '@/Redux/Slices/Register'

export default function Loginpage() {
  const [type, setType] = React.useState('card')

  const toastId: string = 'login'
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const loginState = useSelector((state: RootState) => state.login)
  const registerState = useSelector((state: RootState) => state.register)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (loginState.IsSuccess) {
      console.log(loginState.data)
      const { Username, Firstname, Lastname, token, Role } = loginState.data.result
      console.log(loginState.data)
      dispatch(setUser({ Username, Firstname, Lastname, token, Role }))
      toast.success('Login Occurred Successfully', { id: toastId })
      navigate('/')
    }

    if (loginState.IsError) {
      toast.error(loginState.E_Message, { id: toastId })
    }
    dispatch(resetLoginState())
  }, [loginState.IsError, loginState.IsSuccess, dispatch, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!Email || !Password) {
      return toast.error('Please Provide Valid Data', { id: toastId })
    }

    const data:any = {
      Email,
      Password,
    }

    toast.loading('Loading Please Wait Why Are You Running', { id: toastId })
    dispatch(LoginFn(data))
  }

  // Registration
  const [Username, setUsername] = useState('')
  const [Phone, setPhone] = useState('')
  const [Emails, setEmails] = useState('')
  const [Passwords, setPasswords] = useState('')

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (!Username || !Phone || !Emails || !Passwords) {
      return toast.error('Please Provide Valid Data', { id: toastId })
    }

    const data:any = {
      Username,
      Phone,
      Emails,
      Passwords,
    }
    toast.loading('Registering New User...', { id: toastId })
    dispatch(registerFn(data))
  }

  useEffect(() => {
    if (registerState.IsSuccess) {
      toast.success('Registered Successfully', { id: toastId })
    }
    if (registerState.IsError) {
      console.log(registerState, 'YOUR STATE')
      toast.error(registerState.E_message, { id: toastId })
      setType('paypal')
    }
    dispatch(resetRegisterState())
  }, [registerState.IsSuccess, registerState.IsError, dispatch])

  return (
    <div className="w-full items-center justify-center flex flex-col py-10">
      <Card className="w-full max-w-[30rem]">
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0">
              <Tab value="card" onClick={() => setType('card')}>
                Register
              </Tab>
              <Tab value="paypal" onClick={() => setType('paypal')}>
                Login
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-visible"
              animate={{
                initial: {
                  x: type === 'card' ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === 'card' ? 400 : -400,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                <form className="mt-12 flex flex-col gap-4" onSubmit={submitHandler}>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your Name
                    </Typography>
                    <Input
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="your name"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your phone
                    </Typography>
                    <Input
                      value={Phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      placeholder="your phone"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your Email
                    </Typography>
                    <Input
                      value={Emails}
                      onChange={(e) => setEmails(e.target.value)}
                      type="email"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your password
                    </Typography>
                    <Input
                      value={Passwords}
                      onChange={(e) => setPasswords(e.target.value)}
                      type="password"
                      placeholder="password"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    color="blue"
                    size="lg"
                    className="rounded-[5px]"
                  >
                    Register
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Your details are secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your Email
                    </Typography>
                    <Input
                      type="email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your Password
                    </Typography>
                    <Input
                      type="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="your password"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>

                  <Button type="submit" size="lg" className="bg-blue-500 rounded-[5px]">
                    Login
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Your details are secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
