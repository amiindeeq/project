import React, { useEffect } from "react";
import "./RecyclePin.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../Redux/Store";
import dayjs from "dayjs";
import { ComHeader } from "../../ComponentHeader/ComHeader";
import {BsThreeDotsVertical} from 'react-icons/bs'
import { Link, useParams } from "react-router-dom";
import { categoryRecycleFn } from "../../../../../Redux/Slices/Dashbaord/Category/RecyclePin";
import { restoreCategoryFn } from "../../../../../Redux/Slices/Dashbaord/Category/RestoreCategory";
import { CgMoreO } from "react-icons/cg";
const RecyclePin = () => {
  const RecycleState = useSelector(
    (state: RootState) => state.trashCategory
  );
const {Ca_Id} = useParams();
  const restoreCategoryState = useSelector((state : RootState) => state.restoreCategory)

  const handleRestore = () => {
    dispatch(restoreCategoryFn(Ca_Id))
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(categoryRecycleFn());
  }, []);

  const keys = [
    "ID",
    "Name",
    "Description",
    "Image",
    "Published",
    "Deleted",
    "Created_At",
    "Updated At",
    "  "
  ];


  return (
    <div className="cat-container">
      <ComHeader btnText="Result " title="Category Trash" to="category"  trash="trash"/>
      <div className="cat-flex ">
          {RecycleState.data.map((catItem) => (
            <div className="cat-section">
            <div className="cat-container">
              <div className="cat">
                <img src={catItem.Ca_Image} className="h-[200px] object-contain  " alt="" />
                <div className="des">
                  <h5 className="">{catItem.Ca_Name} </h5>
                 
                 
                </div>
                <div className="cat-btn mt-12" >
               <Link to={`info/${catItem.Ca_Id}`}>
               
                <button 
                
                className="btn-sm flex gap-5 items-center justify-center py-1 px-3 ">
                  <CgMoreO />See more
                </button>
                </Link>
                </div>
              </div>


            </div>
        </div>
          ))}
        </div>
    </div>
  );
};

export default RecyclePin;
