-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Super_Admin', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "O_Status" AS ENUM ('Delivered', 'Not_Delivered');

-- CreateEnum
CREATE TYPE "Job" AS ENUM ('Sales_man', 'Photographer', 'Store_Manager', 'Buyer', 'Tailor', 'Stylish_Man', 'Inventory_Manager', 'Cleaning');

-- CreateTable
CREATE TABLE "User" (
    "U_Id" SERIAL NOT NULL,
    "Firstname" TEXT NOT NULL,
    "Lastname" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Is_Admin" BOOLEAN NOT NULL DEFAULT false,
    "Role" "Roles" NOT NULL DEFAULT 'User',
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("U_Id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Ca_Id" SERIAL NOT NULL,
    "Ca_Name" TEXT NOT NULL,
    "Ca_Desc" TEXT NOT NULL,
    "Ca_Image" TEXT NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Publish" BOOLEAN NOT NULL DEFAULT false,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Ca_Id")
);

-- CreateTable
CREATE TABLE "Product" (
    "Pr_Id" SERIAL NOT NULL,
    "Pr_Name" TEXT NOT NULL,
    "Pr_Desc" TEXT NOT NULL,
    "Pr_Price" DOUBLE PRECISION NOT NULL,
    "Pr_Quantity" INTEGER NOT NULL,
    "Pr_Image" TEXT NOT NULL,
    "Ca_Id" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Published" BOOLEAN NOT NULL DEFAULT false,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Pr_Id")
);

-- CreateTable
CREATE TABLE "FeaturedProducts" (
    "FP_Id" SERIAL NOT NULL,
    "Pr_Id" INTEGER NOT NULL,
    "U_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeaturedProducts_pkey" PRIMARY KEY ("FP_Id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "Cr_Id" INTEGER NOT NULL,
    "U_Id" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("Cr_Id")
);

-- CreateTable
CREATE TABLE "Cart_Item" (
    "Ct_Id" SERIAL NOT NULL,
    "Cr_Id" INTEGER NOT NULL,
    "Pr_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Quant" INTEGER NOT NULL,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_Item_pkey" PRIMARY KEY ("Ct_Id")
);

-- CreateTable
CREATE TABLE "Order" (
    "Or_Id" SERIAL NOT NULL,
    "Or_Status" "O_Status" NOT NULL DEFAULT 'Not_Delivered',
    "Items" JSONB[],
    "Or_Total" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "Cr_Id" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("Or_Id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "Pa_Id" SERIAL NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "D_Amount" DOUBLE PRECISION NOT NULL,
    "S_Total" DOUBLE PRECISION NOT NULL,
    "Paid" DOUBLE PRECISION NOT NULL,
    "Balance" DOUBLE PRECISION NOT NULL,
    "U_Id" INTEGER NOT NULL,
    "Or_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("Pa_Id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "Em_Id" SERIAL NOT NULL,
    "Em_Name" TEXT NOT NULL,
    "Em_Phone" INTEGER NOT NULL,
    "Em_Address" TEXT NOT NULL,
    "Em_Jop_Type" "Job" NOT NULL DEFAULT 'Sales_man',
    "Em_Gender" TEXT NOT NULL,
    "Em_Sallary" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("Em_Id")
);

-- CreateTable
CREATE TABLE "Sallary" (
    "Sa_Id" SERIAL NOT NULL,
    "Em_Sallary" INTEGER NOT NULL,
    "Balance" INTEGER NOT NULL,
    "Total" INTEGER NOT NULL,
    "Em_Id" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sallary_pkey" PRIMARY KEY ("Sa_Id")
);

-- CreateTable
CREATE TABLE "Advance_Job" (
    "Aj_Id" SERIAL NOT NULL,
    "Job_Type" "Job" NOT NULL DEFAULT 'Sales_man',
    "Days" INTEGER NOT NULL DEFAULT 1,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,
    "Em_Id" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Advance_Job_pkey" PRIMARY KEY ("Aj_Id")
);

-- CreateTable
CREATE TABLE "Review" (
    "Rev_Id" SERIAL NOT NULL,
    "Rating" INTEGER NOT NULL,
    "Comment" TEXT,
    "Author_Id" INTEGER NOT NULL,
    "Pr_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("Rev_Id")
);

-- CreateTable
CREATE TABLE "Leave_Time" (
    "Lt_Id" SERIAL NOT NULL,
    "Em_Id" INTEGER NOT NULL,
    "L_Reason" TEXT NOT NULL,
    "St_Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "En_Time" TIMESTAMP(3) NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Isdeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leave_Time_pkey" PRIMARY KEY ("Lt_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_Ca_Name_key" ON "Category"("Ca_Name");

-- CreateIndex
CREATE UNIQUE INDEX "Review_Author_Id_key" ON "Review"("Author_Id");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "User"("U_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Ca_Id_fkey" FOREIGN KEY ("Ca_Id") REFERENCES "Category"("Ca_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "User"("U_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedProducts" ADD CONSTRAINT "FeaturedProducts_Pr_Id_fkey" FOREIGN KEY ("Pr_Id") REFERENCES "Product"("Pr_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedProducts" ADD CONSTRAINT "FeaturedProducts_U_Id_fkey" FOREIGN KEY ("U_Id") REFERENCES "User"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_U_Id_fkey" FOREIGN KEY ("U_Id") REFERENCES "User"("U_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_Cr_Id_fkey" FOREIGN KEY ("Cr_Id") REFERENCES "Cart"("Cr_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_Pr_Id_fkey" FOREIGN KEY ("Pr_Id") REFERENCES "Product"("Pr_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "User"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_U_Id_fkey" FOREIGN KEY ("U_Id") REFERENCES "User"("U_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Or_Id_fkey" FOREIGN KEY ("Or_Id") REFERENCES "Order"("Or_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sallary" ADD CONSTRAINT "Sallary_Em_Id_fkey" FOREIGN KEY ("Em_Id") REFERENCES "Employee"("Em_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sallary" ADD CONSTRAINT "Sallary_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "User"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advance_Job" ADD CONSTRAINT "Advance_Job_Em_Id_fkey" FOREIGN KEY ("Em_Id") REFERENCES "Employee"("Em_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advance_Job" ADD CONSTRAINT "Advance_Job_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "User"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "User"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_Pr_Id_fkey" FOREIGN KEY ("Pr_Id") REFERENCES "Product"("Pr_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave_Time" ADD CONSTRAINT "Leave_Time_Em_Id_fkey" FOREIGN KEY ("Em_Id") REFERENCES "Employee"("Em_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
