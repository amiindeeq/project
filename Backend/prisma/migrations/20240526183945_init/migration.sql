/*
  Warnings:

  - You are about to drop the `Advance_Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturedProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leave_Time` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sallary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Advance_Job" DROP CONSTRAINT "Advance_Job_Author_Id_fkey";

-- DropForeignKey
ALTER TABLE "Advance_Job" DROP CONSTRAINT "Advance_Job_Em_Id_fkey";

-- DropForeignKey
ALTER TABLE "FeaturedProducts" DROP CONSTRAINT "FeaturedProducts_Pr_Id_fkey";

-- DropForeignKey
ALTER TABLE "FeaturedProducts" DROP CONSTRAINT "FeaturedProducts_U_Id_fkey";

-- DropForeignKey
ALTER TABLE "Leave_Time" DROP CONSTRAINT "Leave_Time_Em_Id_fkey";

-- DropForeignKey
ALTER TABLE "Sallary" DROP CONSTRAINT "Sallary_Author_Id_fkey";

-- DropForeignKey
ALTER TABLE "Sallary" DROP CONSTRAINT "Sallary_Em_Id_fkey";

-- DropTable
DROP TABLE "Advance_Job";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "FeaturedProducts";

-- DropTable
DROP TABLE "Leave_Time";

-- DropTable
DROP TABLE "Sallary";

-- DropEnum
DROP TYPE "Job";
