import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../Redux/Store'
import { ArrivedProductFn } from '../../../Redux/Slices/Dashbaord/Product/ArrivedProducts'
import { FaRegStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { FadeIn } from '../../../Variable'
import { motion } from 'framer-motion'

const ArrivedProduct = () => {
    const AllArrivedState = useSelector((state : RootState) => state.ArrivedProduct)

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(ArrivedProductFn())
    },[])
  return (
    <div>
    <div className="">
      
        
         <div className="fpro-section">
          {AllArrivedState.data?.map((proItem) => (
               <motion.div 
               variants={FadeIn("right" , 0.2)} 
               initial = "hidden"
               whileInView={"show"}
               viewport={{once : false , amount : 0.9}}
               className="pro">
               <Link to={`/product/info/${proItem.Pr_Id}`}>
                 <img className="object-contain" src={proItem.Pr_Image.split(',')[0]} alt="" />
               </Link>
               <div className="des">
                 <span>{proItem.Pr_Name}</span>
                 <h5 className="w-200 whitespace-nowrap overflow-hidden text-ellipsis">{proItem.Pr_Desc}</h5>
                 <div className="star flex gap-0">
                   <i>
                     <FaRegStar className="pro-icon" />
                   </i>
                   <i>
                     <FaRegStar className="pro-icon" />
                   </i>
                   <i>
                     <FaRegStar className="pro-icon" />
                   </i>
                   <i>

                     <FaRegStar className="pro-icon" />
                   </i>
                   <i>
                     <FaRegStar className="pro-icon" />
                   </i>
                 </div>
                 <h4>{proItem.Pr_Price}$</h4>
               </div>
               <div className="cart">
                 <Link to={'/product'}>
                   <FiShoppingCart />
                 </Link>
               </div>
             </motion.div>
          ))}
         </div>
       
     </div>
  </div>
  )
}

export default ArrivedProduct
