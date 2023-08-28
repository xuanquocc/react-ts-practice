
import { Columns } from '../../../types/columnsTtype';
import { Product } from '../../../types/product';

interface TableProps {
    columns: Columns[];
    data: Product[];
    hover: boolean;
    stripped: boolean;
}

export function Table ({columns, data , hover = true, stripped = true}: TableProps) {
  return (
      <table>
        <thead>
            <tr>
                {
                    columns.map((row) => (
                        <tr key={row.header}>{row.header}</tr>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            <tr>
                {
                    data.map((row) => (
                        <tr className={`${hover && "hover"} ${stripped && "striped"}`}>
                        {columns.map((col) => (
                          <td key={col.key}>{row[col.header]}</td>
                        ))}
                      </tr>
                    ))
                }
            </tr>
        </tbody>
      </table>
  );
}
