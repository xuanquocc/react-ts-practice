  
  import {Product} from './product'

  export interface Columns {
  key: string;
  header: string;
  render?: (data: Product) => React.ReactNode;
}
