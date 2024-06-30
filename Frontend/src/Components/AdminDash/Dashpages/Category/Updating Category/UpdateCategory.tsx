import React, { FormEvent, useEffect, useState } from "react";
import "./UpdateCategory.css";
import { ComHeader } from "../../ComponentHeader/ComHeader";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategoryFn,
  resetCategoryState,
} from "../../../../../Redux/Slices/Dashbaord/Category/CreatingNew";
import FileUpload from "../../../../../File Upload/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../Redux/Store";
import { updatingCategory } from "../../../../../Redux/Slices/Dashbaord/Category/UpdatingCategory";

export const UpdateCategory = () => {
  const toastId = "creatingcategory";
  const [Ca_Name, setCa_Name] = useState("");
  const [Ca_Desc, setCa_Desc] = useState("");
  const [Ca_Image , setCa_Image] = useState<File | null>(null);

  const { Ca_Id } = useParams();

  console.log(Ca_Id);

  const updateCategoryState = useSelector(
    (state: RootState) => state.updateCategory
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      Ca_Name,
      Ca_Desc,
      Ca_Image,
    };
    dispatch(updatingCategory(data));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (updateCategoryState.IsLoading) {
      toast.loading("Updating...", { id: toastId });
    }
    if (updateCategoryState.IsSuccess) {
      toast.success("Category Updated Successfully", { id: toastId });
      navigate("/dashboard/category");
    }
    if (updateCategoryState.IsError) {
      toast.error(updateCategoryState.Error_Message, { id: toastId });
    }
    dispatch(resetCategoryState());
  }, [
    updateCategoryState.IsLoading,
    updateCategoryState.IsSuccess,
    updateCategoryState.IsError,
  ]);

  return (
    <div className="w-[100%] mx-auto ">
      <ComHeader
        btnText="Result"
        title="Updating Category"
        to="category"
        trash="trash"
      />
      {/* <form onSubmit={handleSubmit}> */}

      {/* Information Part  */}
      <div className="info-p">
        <div className="flex  items-center ">
          <div className="name-input  grid">
            <label> Name </label>
            <input
              type="text"
              value={Ca_Name}
              onChange={(e) => setCa_Name(e.target.value)}
              placeholder="Please Enter Category Name "
            />
          </div>
          <div className="desc-i grid">
            <label> Description </label>
            <input
              value={Ca_Desc}
              onChange={(e) => setCa_Desc(e.target.value)}
              type="text"
              placeholder=" Please Enter Category Description "
            />
          </div>
        </div>
      </div>

      {/* Choose File Part  */}
      <div className="mt-6 ">
      <input type="file" onChange={(e) => {
        if(e.target.files && e.target.files.length > 0 ){
          setCa_Image(e.target.files[0])
        }
      }} />
      </div>

      {/* Button's Part */}
      <div className="glass-btn">
        <button onClick={handleSubmit}>
          {" "}
          {updateCategoryState.IsLoading ? "Loading..." : "Update"}{" "}
        </button>
        <span></span>
      </div>
      <div></div>
      {/* </form> */}
    </div>
  );
};
