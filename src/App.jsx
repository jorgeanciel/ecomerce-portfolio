import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import ProductInfo from './pages/ProductInfoPage';
import { getAllProductsThunk } from './store/slices/products.slice';
import Header from './components/Shared/Header/Header';
import Cart from './pages/CartPage';
import Purchases from './pages/PurchasesPage';
import ProtectedRoutes from './components/Shared/ProtectedRoutes';
import Footer from './components/Shared/Footer/Footer';
import SignUp from './pages/SignUpPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsThunk());

  }, []);


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchases" element={<Purchases />} />
        </Route>

        <Route path="/product/:id" element={<ProductInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;