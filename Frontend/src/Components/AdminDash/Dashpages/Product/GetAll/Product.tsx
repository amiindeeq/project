// src/components/Category.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../Redux/Store";
import { getAllCategoryFn } from "../../../../../Redux/Slices/Dashbaord/Category/AllOfThem";
import { ComHeader } from "../../ComponentHeader/ComHeader";
import { Link } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import { getAllProductFn } from "@/Redux/Slices/Dashbaord/Product/AllOfThem";
import dayjs from "dayjs";

// src/types.ts
// interface Category {
//   Ca_Id: number;
//   Ca_Name: string;
//   Ca_Desc: string;
//   Ca_Image: string;
//   Ca_Published: boolean;
//   Ca_Deleted: boolean;
//   Ca_CreatedAt: string;
//   Ca_UpdatedAt: string;
// }

const Category: React.FC = () => {
  const AllProState = useSelector((state: RootState) => state.getAllProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProductFn());
  }, [dispatch]);

  useEffect(() => {
    if (AllProState.data) {
      setFilteredCategories(
        AllProState.data.filter((product) =>
          product.Pr_Name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, AllProState.data]);

  // const ann = AllProState.data.map((pro)=>pro.pri)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ComHeader
        btnText="New Product"
        title="Product"
        to="product/new"
        trash="trash"
      />
      <div className="my-4">
        <Input
          type="text"
          placeholder="Search by category name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 text-[#878282] rounded mb-4"
        />
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((catItem:any) => (
                  <tr key={catItem?.Pr_Id} className="hover:bg-gray-50 border-b">
                    <td className="px-6 py-4 whitespace-nowrap">{catItem?.Pr_Id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{catItem?.Pr_Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">{catItem.Pr_Desc}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={catItem?.Pr_Image} alt={catItem?.Pr_Name} className="h-12 w-12 object-contain" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{catItem?.Pr_Quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${catItem?.Pr_Price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{dayjs(catItem?.Ca_CreatedAt).format("YYYY/MM/DD")}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`info/${catItem?.Pr_Id}`}>
                        <button className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600">See More</button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
