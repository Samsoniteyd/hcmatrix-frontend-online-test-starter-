import React from "react";
import type { Employee } from "../types";
import { usePermission } from "../context/auth";

type Props = {
  rows: Employee[];
  search: string;
  onSearchChange: (v: string) => void;
  status: "ACTIVE" | "INACTIVE" | "ALL";
  onStatusChange: (v: "ACTIVE" | "INACTIVE" | "ALL") => void;
};

/**
 * Intentionally imperfect table component for the exercise:
 * - permission logic mixed into rendering
 * - derived computations done on every render
 * - unstable handlers/props patterns likely cause re-renders
 * - no pagination/virtualization; will struggle with 1000+ rows
 */
export function EmployeeTable(props: Props) {
  const { rows, search, onSearchChange, status, onStatusChange } = props;

  const canViewSalary = usePermission("EMPLOYEE_VIEW_SALARY");

  const { activeCount, inactiveCount } = React.useMemo(() => {
    const active = rows.filter((e) => e.status === "ACTIVE").length;
    const inactive = rows.filter((e) => e.status === "INACTIVE").length;
    return { activeCount: active, inactiveCount: inactive };
  }, [rows]);

  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const handleStatusChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onStatusChange(e.target.value as "ACTIVE" | "INACTIVE" | "ALL");
    },
    [onStatusChange]
  );


  return (
    <div>
      <div className="row" style={{ marginBottom: 12 }}>
        <input
          value={search}
          placeholder="Search name, email, department..."
          // onChange={(e) => onSearchChange(e.target.value)}
          onChange={handleSearchChange}
          style={{ minWidth: 280 }}
        />

        <select value={status}
        //  onChange={(e) => onStatusChange(e.target.value as any)}
        onChange={handleStatusChange}
         >
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <span className="pill">Active: {activeCount}</span>
        <span className="pill">Inactive: {inactiveCount}</span>
        <span className="spacer" />
        <span className="muted">Rows: {rows.length}</span>
      </div>

      <div style={{ maxHeight: 520, overflow: "auto", border: "1px solid #eee", borderRadius: 10 }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              {canViewSalary ? <th>Salary</th> : null}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <EmployeeRow key={e.id} employee={e} canViewSalary={canViewSalary} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const EmployeeRow = React.memo<{
  employee: Employee;
  canViewSalary: boolean;
}>(({ employee, canViewSalary }) => {
  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.department}</td>
      {canViewSalary ? <td>{employee.salary.toLocaleString()}</td> : null}
      <td>{employee.status}</td>
    </tr>
  );
});

EmployeeRow.displayName = "EmployeeRow";
