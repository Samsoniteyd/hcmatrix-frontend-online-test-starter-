import type { CompanyId, Employee, Permission } from "./types";

export const COMPANIES: { id: CompanyId; name: string }[] = [
  { id: "hcmatrix", name: "HCMatrix Ltd" },
  { id: "snapnet", name: "Snapnet Ltd" }
];

export const USER_PERMISSIONS_BY_COMPANY: Record<CompanyId, Permission[]> = {
  // Example: user can view salary in HCMatrix but not in Snapnet.
  hcmatrix: ["EMPLOYEE_VIEW", "EMPLOYEE_VIEW_SALARY", "EMPLOYEE_EDIT"],
  snapnet: ["EMPLOYEE_VIEW"]
};

function makeEmployees(companyId: CompanyId, count: number): Employee[] {
  const depts = ["Engineering", "Sales", "HR", "Finance", "Support"];
  const statuses: Employee["status"][] = ["ACTIVE", "INACTIVE"];
  const list: Employee[] = [];
  for (let i = 1; i <= count; i++) {
    const dept = depts[i % depts.length]!;
    const status = statuses[i % statuses.length]!;
    list.push({
      id: `${companyId}-${i}`,
      companyId,
      name: `${companyId.toUpperCase()} Employee ${i}`,
      email: `employee${i}@${companyId}.example.com`,
      department: dept,
      salary: 120000 + (i % 37) * 5000,
      status
    });
  }
  return list;
}

export const EMPLOYEES_DB: Record<CompanyId, Employee[]> = {
  hcmatrix: makeEmployees("hcmatrix", 1200),
  snapnet: makeEmployees("snapnet", 800)
};
