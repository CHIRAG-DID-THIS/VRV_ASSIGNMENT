import React from "react";

const Table = ({ columns, data, renderActions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key={column} className="border border-gray-300 px-4 py-2">
                {column}
              </th>
            ))}
            {renderActions && (
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column} className="border border-gray-300 px-4 py-2">
                  {item[column]}
                </td>
              ))}
              {renderActions && (
                <td className="border border-gray-300 px-4 py-2">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
