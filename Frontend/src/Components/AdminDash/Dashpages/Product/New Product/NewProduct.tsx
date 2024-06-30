import { useEffect, useState } from 'react';
import './NewProduct.css';
import { IoMdAddCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../Redux/Store';
import { newProductFn, resetProductState } from '../../../../../Redux/Slices/Dashbaord/Product/newProduct';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllCategoryFn } from '../../../../../Redux/Slices/Dashbaord/Category/AllOfThem';
import { Input, Form, Spin, Select, Button as AntdButton, Upload as AntdUpload } from 'antd';
import { Button, Button as MTButton } from '@material-tailwind/react';

const { Option } = Select;

const NewProduct = () => {
  const toastId = 'newProduct';
  const [Pr_Name, setPr_Name] = useState('');
  const [Pr_Desc, setPr_Desc] = useState('');
  const [Pr_Price, setPr_Price] = useState('');
  const [Pr_Quantity, setPr_Quantity] = useState('');
  const [Pr_Image, setPr_Image] = useState([]);
  const [Ca_Id, setCa_Id] = useState('');

  const NewProductState = useSelector((state: RootState) => state.createProduct);
  const AllCategoryState = useSelector((state: RootState) => state.getAllCategory);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategoryFn());
  }, [dispatch]);

  useEffect(() => {
    if (NewProductState.IsLoading) {
      toast.loading('Please Wait...', { id: toastId });
    }
    if (NewProductState.IsSuccess) {
      toast.success('Product Created Successfully', { id: toastId });
      navigate('/dashboard/product');
    }
    if (NewProductState.IsError) {
      toast.error(NewProductState.E_message, { id: toastId });
    }
    dispatch(resetProductState());
  }, [NewProductState, dispatch, navigate]);

  const handleSubmit = () => {
    const data = {
      Pr_Name,
      Pr_Desc,
      Pr_Price,
      Pr_Quantity,
      Pr_Image,
      Ca_Id,
    };
    dispatch(newProductFn(data));
  };

  const handleImageUpload = ({ fileList }:any) => {
    setPr_Image(fileList.map(file => file.originFileObj));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Product Registration</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" required>
            <Input value={Pr_Name} onChange={(e) => setPr_Name(e.target.value)} placeholder="Product Name" />
          </Form.Item>
          <Form.Item label="Description" required>
            <Input value={Pr_Desc} onChange={(e) => setPr_Desc(e.target.value)} placeholder="Product Description" />
          </Form.Item>
          <Form.Item label="Price" required>
            <Input value={Pr_Price} onChange={(e) => setPr_Price(e.target.value)} placeholder="Product Price" type="number" />
          </Form.Item>
          <Form.Item label="Quantity" required>
            <Input value={Pr_Quantity} onChange={(e) => setPr_Quantity(e.target.value)} placeholder="Product Quantity" type="number" />
          </Form.Item>
          <Form.Item label="Image" required>
            <AntdUpload 
              listType="picture"
              multiple
              beforeUpload={() => false} 
              onChange={handleImageUpload}
            >
              <MTButton className="flex items-center bg-blue-500 gap-2" icon={<IoMdAddCircle />}>
                Upload Images
              </MTButton>
            </AntdUpload >
          </Form.Item>
          <Form.Item label="Category" required>
            <Select value={Ca_Id} onChange={(value) => setCa_Id(value)} placeholder="Select Category">
              {AllCategoryState.data.map((cate) => (
                <Option key={cate.Ca_Id} value={cate.Ca_Id}>
                  {cate.Ca_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button color='blue' type='submit' className="w-full mt-4">
            {NewProductState.IsLoading ? <Spin /> : 'Save'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewProduct;
