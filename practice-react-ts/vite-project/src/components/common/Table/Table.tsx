<<<<<<< Updated upstream
=======
import { Columns } from "../../../types/columnsTtype";
import {memo} from 'react'
import { Product } from "../../../types/product";
import './index.css'

interface TableProps {
  columns: Columns[];
  data: Product[];
  hover?: boolean;
  stripped?: boolean;
}

 function Table({
  columns,
  data,
  hover = true,
  stripped = true,
}: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: Product, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${hover && "hover"} ${stripped && "striped"}`}
          >
             {columns.map((col) => (
              <td key={col.header}>
                {col.render ? col.render(row) : (row as any)[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default memo(Table)
>>>>>>> Stashed changes
