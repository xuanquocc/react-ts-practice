  
  import {Product} from './product'

  export interface Column {
  key: string;
  header: string;
  render: (data: Product) => React.ReactNode;
}
