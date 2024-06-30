import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublishedProductFn } from '../../../Redux/Slices/Dashbaord/Product/PublishedProducts';
import { AppDispatch, RootState } from '../../../Redux/Store';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function ProductPage() {
  const PublishedProductState = useSelector((state: RootState) => state.PublishedProducts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(PublishedProductFn());
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {PublishedProductState.data.map((product) => (
          <Card key={product.Pr_Id} className="max-w-xs mx-4 my-4 sm:max-w-md md:max-w-lg lg:max-w-xl">
            <CardHeader shadow={false} floated={false} className="h-64">
              <Link to={`/product/info/${product.Pr_Id}`}>
                <img src={product.Pr_Image} className="h-full w-full object-cover" alt={product.Pr_Name} />
              </Link>
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  {product.Pr_Name}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  ${product.Pr_Price}
                </Typography>
              </div>
              <Typography variant="small" color="gray" className="font-normal opacity-75">
                {product.Pr_Desc}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to={`/product/info/${product.Pr_Id}`}>
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none rounded-[5px] active:scale-100"
                >
                  Add to Cart
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
