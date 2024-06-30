import { Link } from 'react-router-dom'
// import { Ripple, initTE } from 'tw-elements'
import { Player } from '@lottiefiles/react-lottie-player'

// initTE({ Ripple })

const Success = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 h-screen flex flex-col items-center justify-center md:mx-auto">
        <Player
          autoplay
          loop
          src="public/Image/animation.json"
          style={{ height: '200px', width: '200px' }}
        />
        <div className="text-center mt-6">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              to={'/'}
              className="px-12 rounded-[5px] bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
