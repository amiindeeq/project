import React from 'react'
import './SmallBanner.css'

const SmallBanner = () => {
  return (
    <div className='news-letter'>
        <div className="newtext">
            <h4> Sign Up For News Latter</h4>
            <p> Get E-mail Updates Sign Up Our Latest Shop And <span>Special Offers . </span> </p>
        </div>
        <div className='newsForm'>
           <input type="text" placeholder='Your Email Address' />
           <button> Sign Up</button>
        </div>
    </div>
  )
}

export default SmallBanner