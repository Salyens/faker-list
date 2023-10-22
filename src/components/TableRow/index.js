import React from "react";

const TableRow = ({ data, counter }) => {
  const fakerUser = { counter, ...data };

  return (
    <tr>
      {Object.values(fakerUser).map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  );
};

export default TableRow;
