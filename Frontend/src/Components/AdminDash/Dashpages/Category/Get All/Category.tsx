// src/components/Category.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../Redux/Store";
import { getAllCategoryFn } from "../../../../../Redux/Slices/Dashbaord/Category/AllOfThem";
import { ComHeader } from "../../ComponentHeader/ComHeader";
import { Link } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/Components/ui/table";

// src/types.ts
interface Category {
  Ca_Id: number;
  Ca_Name: string;
  Ca_Desc: string;
  Ca_Image: string;
  Ca_Published: boolean;
  Ca_Deleted: boolean;
  Ca_CreatedAt: string;
  Ca_UpdatedAt: string;
}

const Category: React.FC = () => {
  const AllCategoryState = useSelector((state: RootState) => state.getAllCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllCategoryFn());
  }, [dispatch]);

  useEffect(() => {
    if (AllCategoryState.data) {
      setFilteredCategories(
        AllCategoryState?.data?.filter((category: Category) =>
          category?.Ca_Name?.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      );
    }
  }, [searchTerm, AllCategoryState.data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ComHeader
        btnText="New Category"
        title="Category"
        to="category/new"
        trash="trash"
      />
      <div className="my-4">
        <Input
          type="text"
          placeholder="Search by category name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deleted</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((catItem) => (
                  <tr key={catItem.Ca_Id} className="hover:bg-gray-50 border-b">
                    <td className="px-6 py-4 whitespace-nowrap">{catItem.Ca_Id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{catItem.Ca_Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">{catItem.Ca_Desc}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={catItem.Ca_Image} alt={catItem.Ca_Name} className="h-12 w-12 object-contain" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{catItem.Ca_Published ? "Yes" : "No"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{catItem.Ca_Deleted ? "Yes" : "No"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(catItem.Ca_CreatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(catItem.Ca_UpdatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`info/${catItem.Ca_Id}`}>
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
