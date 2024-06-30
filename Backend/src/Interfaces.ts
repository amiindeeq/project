export interface NewUser {
  Firstname: string;
  Lastname: string;
  Username: string;
  Phone: string;
  Emails: string;
  Passwords: string;
}

export interface loginInterface {
  Email: string;
  Password: string;
}

export interface NewCategory {
  Ca_Name: string;
  Ca_Desc: string;
  // Ca_Image: string;
  Author_Id: number;
}

export interface NewSubCategory {
  Su_Name: string;
  Su_Desc: string;
  // Su_Image: string;
  Ca_Id: number;
  Author_Id: number;
}

export interface NewProduct {
  Pr_Name: string;
  Pr_Desc: string;
  Pr_Price: number;
  Pr_Quantity: number;
  // Pr_Image: string;
  Ca_Id: number;
  Author_Id: number;
}

export interface NewOrder {
  Or_Price: number;
  Tax_Price: number;
  Or_Total: number;
  Address: string;
  Cr_Id: number;
  Author_Id: number;
}

export interface newEmployee {
  Em_Name: string;
  Em_Phone: number;
  Em_Address: string;
  Em_Gender: string;
  Em_Sallary: number;
  Author_Id: number;
}
export interface newSallary {
  Em_Sallary: number;
  Balance: number;
  Total: number;
  Em_Id: number;
}

export interface newLeaveTime {
  Em_Id: number;
  L_Reason: string;
  St_Time: string;
  En_Time: string;
}

export interface newReview {
  Rating: number;
  Comment: string;
  Pr_Id: number;
}

export interface newPayment {
  Amount: number;
  D_Amount: number;
  S_Total: number;
  Paid: number;
  Balance: number;
  U_Id: number;
  Or_Id: number;
}
