export interface UserRegistrationData {
  Firstname: string;
  Lastname: string;
  Username: string;
  Phone: number;
  Email: string;
  Password: string;
}

export const E_Mssg = " Please Try Again Later Server Is Down!!";
export const Url = " http://localhost:5000/api";

export interface newCategory {
  Cat_Name: string;
  Cat_Desc: string;
  // Ca_Image : string
}

export interface newProduct {
  Pr_Name: string;
  Pr_Desc: string;
  Pr_Price: string;
  Pr_Quantity: string;
  Pr_Image: string;
  Ca_Id: number;
}

export interface props {
  onClick: () => void;
}

export interface Items {
  Product: {
    Pr_Id: number;
    Pr_Name: string;
    Pr_Price: number;
    Pr_Image: string;
  };
}

export interface OneOrder {
  Product: {
    Pr_Id: number;
    Pr_Name: string;
    Pr_Desc: string;
    Pr_Price: number;
    Pr_Quantity: string;
    Pr_Image: string;
    Ca_Id: number;
    Author_Id: number;
    Published: boolean;
    Is_Deleted: boolean;
    Created_At: string;
    Updated_At: string;
  };
}

export interface Product {
  Pr_Id: number;
  Pr_Name: string;
  Pr_Desc: string;
  Pr_Price: number;
  Pr_Quantity: 36;
  Pr_Image: string;
  Ca_Id: number;
  Author_Id: number;
  Published: boolean;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
}

export interface userOrder {
  Or_Id: number;
  Or_Status: string;
  Items: [
    {
      Product: {
        Pr_Id: number;
        Pr_Name: string;
        Pr_Desc:string;
        Pr_Price: number;
        Pr_Quantity: number;
        Pr_Image: string;
        Ca_Id: number;
        Author_Id: number;
        Published: Boolean;
        Is_Deleted: Boolean;
        Created_At:Date;
        Updated_At: Date;
      };
    }
  ];
  Or_Total: number;
  isPaid: boolean;
  Cr_Id: number;
  Author_Id: number;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
}
