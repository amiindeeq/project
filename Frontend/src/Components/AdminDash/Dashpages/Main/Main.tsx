// src/components/Dashboard.tsx
import React from 'react';
import { Card, CardBody } from "@material-tailwind/react";
import BarChart from '@/Components/cards/BarChart';
import UserTable from '@/Components/cards/UserTable';
import LineChart from '@/Components/cards/LineChart';
import OrderTable from '@/Components/cards/OrderTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';

const Dashboard: React.FC = () => {
  const UserState = useSelector((state : RootState) => state.getAllUsers)
  const CategoryState = useSelector((state : RootState) => state.getAllCategory)
  const ProductState = useSelector((state : RootState) => state.getAllProducts)
  const OrderState = useSelector((state : RootState) => state.AllOrders)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-lg">
          <CardBody>
            <h5 className="text-gray-700 text-lg font-semibold">Users</h5>
            <p className="text-gray-500">{UserState.data.length}</p>
          </CardBody>
        </Card>
        <Card className="shadow-lg">
          <CardBody>
            <h5 className="text-gray-700 text-lg font-semibold">Categories</h5>
            <p className="text-gray-500">{CategoryState.data.length}</p>
          </CardBody>
        </Card>
        <Card className="shadow-lg">
          <CardBody>
            <h5 className="text-gray-700 text-lg font-semibold">Products</h5>
            <p className="text-gray-500">{ProductState.data.length}</p>
          </CardBody>
        </Card>
        <Card className="shadow-lg">
          <CardBody>
            <h5 className="text-gray-700 text-lg font-semibold">Orders</h5>
            <p className="text-gray-500">{OrderState.data.length}</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h5 className="text-gray-700 text-lg font-semibold mb-4">Line Chart</h5>
          {/* Insert Line Chart here */}
          <LineChart/>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h5 className="text-gray-700 text-lg font-semibold mb-4">Bar Chart</h5>
          {/* Insert Bar Chart here */}
          <BarChart/>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h5 className="text-gray-700 text-lg font-semibold mb-4">Users Table</h5>
          {/* Insert Users Table here */}
          <UserTable/>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h5 className="text-gray-700 text-lg font-semibold mb-4">Orders Table</h5>
          {/* Insert Orders Table here */}
          <OrderTable/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
