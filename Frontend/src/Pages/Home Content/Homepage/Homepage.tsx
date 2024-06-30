import FrontProducts from "../Front Products/FrontProducts";
import LandingPage from "../Landing Page/LandingPage";
import OurProduct from "../Landing Page/OurProduct";
import "./Homepage.css";


const Homepage = () => {
  return (
    <div className="flex flex-col ">
      <div className="mt-8">
      <LandingPage />
        {/* <Catepage /> */}
      </div>
      <div>
      <h1 className='text-[25px] text-gray-700 mt-[0rem] font-bold text-center'> Featured Products </h1>
       <FrontProducts />
      </div>
      <div>
        <OurProduct/>
      </div>
    </div>
  );
};

export default Homepage;
