import React from "react";

const Table = ({ data, columns }) => {
  // format date like yyyy, mm ,day
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="px-4 py-3 bg-slate-100 text-left border-b-2 text-sm" key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr className="hover:bg-slate-50" key={rowIndex}>
            {columns.map((column) => (
              <td className="px-4 py-2 border-b-[1px] text-sm" key={column.key}>
                {column.key === "start_date" || column.key === "end_date"
                  ? formatDate(row[column.key])
                  : column.key === "action" && column.render
                  ? column.render(row)
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
