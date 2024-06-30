import express from 'express'
import UserRoute from './Routes/UserRoute'
import CategoryRoute from './Routes/CategoryRoute'
import productRoute from './Routes/productRoute'
import CartRoute from './Routes/CartRoute'
import OrderRoute from './Routes/OrderRoute'
import ReviewRoute from './Routes/ReviewRoute'
import Stripe from './Routes/Stripe'
import cors from 'cors';

const App = express();
const PORT = 5000;

App.use(
   cors({
    //  origin: 'http://localhost:5173',
   })
 );

App.use(express.json())
App.use('/api/user' , UserRoute)
App.use('/api/category' , CategoryRoute)
App.use('/api/product' , productRoute)
App.use('/api/cart', CartRoute)
App.use('/api/order' , OrderRoute)
App.use('/api/review' , ReviewRoute)
App.use('/api/create-checkout-session',Stripe)







App.listen(PORT , () => {
   console.log('Server is running now ' + PORT)
})