export type CompanyId = "hcmatrix" | "snapnet";

export type Permission = "EMPLOYEE_VIEW" | "EMPLOYEE_VIEW_SALARY" | "EMPLOYEE_EDIT";

export type Employee = {
  id: string;
  companyId: CompanyId;
  name: string;
  email: string;
  department: string;
  salary: number;
  status: "ACTIVE" | "INACTIVE";
};
