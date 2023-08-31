
import Home from './page/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetailPage from './page/detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:productId" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
