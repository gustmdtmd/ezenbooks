import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home';
import Header from './components/Shared/Header';
import MainTemplate from './components/Shared/MainTemplate';
import MultiTemplate from './components/Shared/MultiTemplate';
import BookDetail from './routes/BookDetail';
import CartPage from './components/cart/CartPage';
import SearchList from './routes/SearchList';
import Admin from './routes/Admin';
import Mypage from './components/login/Mypage';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Logout from './components/login/Logout';
import ReviewUpdate from './components/review/ReviewUpdate';
import UserPick from './pages/UserPick';
import Bestseller from './routes/Bestseller';
import Modify from './components/login/Modify';

// import NotFoundPage from './pages/NotFoundPage';

function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route exact path='/' element={<Home />} />
        <Route path='/:menu/:id' element={<MultiTemplate />} />
        <Route path='/:menu' element={<MainTemplate />} />
        <Route path='/book/:id' element={<BookDetail name='category' />} />
        <Route path='/bestseller' element={<Bestseller />} />
        <Route path='/userpick' element={<UserPick />} />
        <Route path='/admin/:category' element={<Admin />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/search' element={<SearchList name='category' />} />
        <Route
          path='/category/search'
          element={<SearchList name='category' />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/mypage/:id' element={<Mypage />} />
        {/* <Route path='*' element={<NotFoundPage />} /> */}
        <Route path='/review/:review_num' element={<ReviewUpdate />} />
        <Route path='/modify/:id' element={<Modify />} />
      </Routes>
    </div>
  );
}

export default App;
