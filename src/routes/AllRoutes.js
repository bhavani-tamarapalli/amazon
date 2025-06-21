// // src/routes/AllRoutes.js

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { HomePage } from '../page/HomePage';
// import { Signin } from '../page/Signin';
// import { Fresh } from '../navbar/Fresh';
// import { MxPlayer } from '../navbar/MxPlayer';
// import { Sell } from '../navbar/Sell';
// import { BestSellers } from '../navbar/BestSellers';
// import { Mobiles } from '../navbar/Mobiles';
// import { Fashion } from '../navbar/Fashion';
// import { Electronics } from '../navbar/Electronics';
// import { Home_Kitchen } from '../navbar/Home_Kitchen';
// import { Computers } from '../navbar/Computers';
// import { ProductDetails } from '../page/Product_details';

// // You can add additional pages like Login, Register, ProductDetails etc.

// export const AllRoutes = () => {
//   return (
//     <Routes>

//       <Route path="/home" element={<HomePage />} />
//       <Route path="/signin" element={<Signin />} />
//       <Route path="/category/fresh" element={<Fresh />} />
//       <Route path="/category/mx-player" element={<MxPlayer />} />
//       <Route path="/category/sell" element={<Sell />} />
//       <Route path="/category/bestsellers" element={<BestSellers />} />
//       <Route path="/category/mobiles" element={<Mobiles />} />
//       <Route path="/category/fashion" element={<Fashion />} />
//       <Route path="/category/electronics" element={<Electronics />} />
//       <Route path="/category/home-&-kitchen" element={<Home_Kitchen />} />
//       <Route path="/category/computers" element={<Computers />} />
//       {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
//       {/* <Route path="/nav-item/:nav_item_id" element={<ProductDetails />} /> */}
//       <Route path="/product/:product_id" element={<ProductDetails />} />






//     </Routes>
//   );
// };

// src/routes/AllRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../page/HomePage';
import { Signin } from '../page/Signin';
import { Fresh } from '../navbar/Fresh';
import { MxPlayer } from '../navbar/MxPlayer';
import { Sell } from '../navbar/Sell';
import { BestSellers } from '../navbar/BestSellers';
import { Mobiles } from '../navbar/Mobiles';
import { Fashion } from '../navbar/Fashion';
import { Electronics } from '../navbar/Electronics';
import { Home_Kitchen } from '../navbar/Home_Kitchen';
import { Computers } from '../navbar/Computers';
import { ProductDetails } from '../page/Product_details';
import { CartPage } from '../page/cart/CartPage';



export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/cart" element={<CartPage />} /> 
      <Route path="/category/fresh" element={<Fresh />} />
      <Route path="/category/mx-player" element={<MxPlayer />} />
      <Route path="/category/sell" element={<Sell />} />
      <Route path="/category/bestsellers" element={<BestSellers />} />
      <Route path="/category/mobiles" element={<Mobiles />} />
      <Route path="/category/fashion" element={<Fashion />} />
      <Route path="/category/electronics" element={<Electronics />} />
      <Route path="/category/home-&-kitchen" element={<Home_Kitchen />} />
      <Route path="/category/computers" element={<Computers />} />
      <Route path="/product/:product_id" element={<ProductDetails />} />
    </Routes>
  );
};
