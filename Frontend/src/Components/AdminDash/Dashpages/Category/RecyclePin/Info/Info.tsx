import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../Redux/Store';
import { getOneCategoryFn } from '../../../../../../Redux/Slices/Dashbaord/Category/getOneCategory';
import { useNavigate, useParams } from 'react-router-dom';
import { restoreCategoryFn } from '../../../../../../Redux/Slices/Dashbaord/Category/RestoreCategory';
import { ComHeader } from '../../../ComponentHeader/ComHeader';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { getOneTrashCategoryFn } from '../../../../../../Redux/Slices/Dashbaord/Category/OneTrashCategory';
import { getAllCategoryFn } from '../../../../../../Redux/Slices/Dashbaord/Category/AllOfThem';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Typography } from '@material-tailwind/react';

const Info = () => {
  const OneCategoryState = useSelector((state: RootState) => state.OneCategory);
  const { Ca_Id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneTrashCategoryFn(Ca_Id));
  }, [dispatch, Ca_Id]);

  const handleRestore = () => {
    dispatch(restoreCategoryFn(Ca_Id));
    dispatch(getAllCategoryFn());
    navigate('/dashboard/category');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ComHeader btnText="Go Back" title="Category" to="category" trash="trash" />
      <div className="flex justify-center items-center mt-8">
        <Card className="w-full max-w-4xl">
          <div className="flex">
            {/* <CardMedia className="w-1/2"> */}
              <img
                className="w-full h-auto object-contain"
                src={OneCategoryState.data.Ca_Image}
                alt={OneCategoryState.data.Ca_Name}
              />
            {/* </CardMedia> */}
            <CardContent className="w-1/2 pl-8">
              <Typography variant="h4" className="font-bold mb-4">
                {OneCategoryState.data.Ca_Name}
              </Typography>
              <Typography className="mb-4">
                {OneCategoryState.data.Ca_Desc}
              </Typography>
              <Typography  className="mb-4">
                Deleted:
                {OneCategoryState.data.Is_Deleted ? (
                  <Badge className="ml-2 bg-red-500 text-white">Deleted</Badge>
                ) : (
                  <Badge className="ml-2 bg-green-500 text-white">Un_Deleted</Badge>
                )}
              </Typography>
              {/* <CardActions> */}
                <Button
                  className="flex items-center px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                  onClick={handleRestore}
                >
                  <MdOutlineSettingsBackupRestore className="mr-2" />
                  Restore
                </Button>
              {/* </CardActions> */}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Info;
