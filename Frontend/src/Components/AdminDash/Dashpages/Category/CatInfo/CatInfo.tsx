import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../Redux/Store";
import { getOneCategoryFn } from "../../../../../Redux/Slices/Dashbaord/Category/getOneCategory";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineEditNote, MdOutlinePublishedWithChanges } from "react-icons/md";
import { PublishCategoryFn } from "../../../../../Redux/Slices/Dashbaord/Category/PublishOne";
import { removeCategoryFn } from "../../../../../Redux/Slices/Dashbaord/Category/RemoveCategory";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const CatInfo = () => {
  const OneCategoryState = useSelector((state: RootState) => state.OneCategory);
  const { Ca_Id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneCategoryFn(Ca_Id));
  }, [dispatch, Ca_Id]);

  const handlePublish = () => {
    dispatch(PublishCategoryFn(Ca_Id));
    dispatch(getOneCategoryFn(Ca_Id));
  };

  const handleDelete = () => {
    dispatch(removeCategoryFn(Ca_Id));
    navigate("/dashboard/category");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outlined" color="blue" onClick={() => navigate("/dashboard/category")}>
          Go Back
        </Button>
        <Typography variant="h3" color="blue-gray">
          Category Details
        </Typography>
      </div>
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardBody className="flex flex-col md:flex-row gap-6 p-6">
          <img
            className="w-full md:w-1/3 rounded-lg object-cover"
            src={OneCategoryState.data.Ca_Image}
            alt={OneCategoryState.data.Ca_Name}
          />
          <div className="w-full md:w-2/3">
            <Typography variant="h4" className="font-bold mb-4">
              {OneCategoryState.data.Ca_Name}
            </Typography>
            <Typography variant="paragraph" className="mb-4">
              {OneCategoryState.data.Ca_Desc}
            </Typography>
            <div className="mb-4">
              <Typography variant="h6" className="flex items-center">
                Published:{" "}
                <span
                  className={`ml-2 px-4 py-2 rounded  ${
                    OneCategoryState.data.Publish ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {OneCategoryState.data.Publish ? "Published" : "Unpublished"}
                </span>
              </Typography>
              <Typography variant="h6" className="flex items-center mt-2">
                Deleted:{" "}
                <span
                  className={`ml-2 px-4 py-2 rounded  ${
                    OneCategoryState.data.Is_Deleted ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {OneCategoryState.data.Is_Deleted ? "Deleted" : "Undeleted"}
                </span>
              </Typography>
            </div>
          </div>
        </CardBody>
        <CardFooter divider className="flex justify-between items-center p-6">
          <Link to={`/dashboard/category/update/${Ca_Id}`}>
            <Button color="blue" variant="filled" className="flex items-center">
              <MdOutlineEditNote className="mr-2" /> Edit
            </Button>
          </Link>
          <Button color="green" variant="filled" className="flex items-center" onClick={handlePublish}>
            <MdOutlinePublishedWithChanges className="mr-2" /> Publish
          </Button>
          <Button color="red" variant="filled" className="flex items-center" onClick={handleDelete}>
            <IoMdAddCircle className="mr-2" /> Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CatInfo;
