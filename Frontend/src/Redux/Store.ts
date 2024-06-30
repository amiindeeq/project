import { configureStore } from '@reduxjs/toolkit'
import { LoginSlice } from './Slices/Login'
import userInfoSlice from './Slices/userInfo'
import registerSlice from './Slices/Register'
import { getAllCategorySlice } from './Slices/Dashbaord/Category/AllOfThem'
import { createCategorySlice } from './Slices/Dashbaord/Category/CreatingNew'
import { updatingCategorySlice } from './Slices/Dashbaord/Category/UpdatingCategory'
import { AllProductSlice } from './Slices/Dashbaord/Product/AllOfThem'
import { createProductSlice } from './Slices/Dashbaord/Product/newProduct'
import { recyclePinSlice } from './Slices/Dashbaord/Category/RecyclePin'
import { PublishedProductSlice } from './Slices/Dashbaord/Product/PublishedProducts'
import { getAllCategoryPublishedSlice } from './Slices/Dashbaord/Category/PublishedCategory'
import { OneProductSlice } from './Slices/Dashbaord/Product/getOneProduct'
import { OneCategorySlice } from './Slices/Dashbaord/Category/getOneCategory'
import { getAllReviewSlice } from './Slices/Review Part/GetAll'
import { AddToCartSlice } from './Slices/Cart Folder/AddToCart'
import { getAllUserSlice, getAllUsersFn } from './Slices/Dashbaord/User/AllUser'
import { UserCartSlice } from './Slices/Cart Folder/UserCarts'
import { publishingCategorySlice } from './Slices/Dashbaord/Category/PublishOne'
import { removeCategorySlice } from './Slices/Dashbaord/Category/RemoveCategory'
import { restoreCategorySlice } from './Slices/Dashbaord/Category/RestoreCategory'
import { OneTrashCategorySlice } from './Slices/Dashbaord/Category/OneTrashCategory'
import { newOrderSlice } from './Slices/orderSlice/NewOrde'
import { userOrderSlice } from './Slices/orderSlice/UserOrders'
import { RemoveProductSlice } from './Slices/Dashbaord/Product/RemoveProduct'
import { getAllOrderSlice } from './Slices/orderSlice/AllOrder'
import { newReviewSlice } from './Slices/Review Part/NewReview'
import { getOneOrderSlice } from './Slices/orderSlice/OneOrder'
import { AllUserOrderSlice } from './Slices/orderSlice/AllUserOrder'
import { ArrivedProductSlice } from './Slices/Dashbaord/Product/ArrivedProducts'

export const store = configureStore({
  reducer: {
    login: LoginSlice.reducer,
    userInfo: userInfoSlice.reducer,
    register: registerSlice.reducer,

    //  Dashboard Reducers
    // Category Slices
    getAllCategory: getAllCategorySlice.reducer,
    OneCategory: OneCategorySlice.reducer,
    createCategory: createCategorySlice.reducer,
    updateCategory: updatingCategorySlice.reducer,
    trashCategory: recyclePinSlice.reducer,
    publishedCatgeory: getAllCategoryPublishedSlice.reducer,
    PublishOneCategory: publishingCategorySlice.reducer,
    removeCategory: removeCategorySlice.reducer,
    restoreCategory: restoreCategorySlice.reducer,
    OneTrashCategory: OneTrashCategorySlice.reducer,
    // Product
    getAllProducts: AllProductSlice.reducer,
    getOneProduct: OneProductSlice.reducer,
    createProduct: createProductSlice.reducer,
    PublishedProducts: PublishedProductSlice.reducer,
    RemoveProduct: RemoveProductSlice.reducer,
    ArrivedProduct: ArrivedProductSlice.reducer,
    //    Review Endpoints
    getAllReview: getAllReviewSlice.reducer,
    NewReview: newReviewSlice.reducer,
    // Cart Endpoints
    AddToCart: AddToCartSlice.reducer,
    UserCarts: UserCartSlice.reducer,
    // Users Endpointd
    getAllUsers: getAllUserSlice.reducer,
    // Order Endpoints
    AllOrders: getAllOrderSlice.reducer,
    newOrder: newOrderSlice.reducer,
    userOrders: userOrderSlice.reducer,
    oneOrder: getOneOrderSlice.reducer,
    AllUserOrder: AllUserOrderSlice.reducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState> // useSelector
export type AppDispatch = typeof store.dispatch // useDispatch
