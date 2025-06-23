
// import './App.css';
// import { Footer } from './components/Footer/Footer';
// import { Header } from './components/Header/Header';
// import { HomePage } from './page/HomePage';
// import { AllRoutes } from './routes/AllRoutes';



// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <AllRoutes />
//       <Footer />
//     </div>
//   );
// }

// export default App;


// import './App.css';
// import { Footer } from './components/Footer/Footer';
// import { Header } from './components/Header/Header';
// import { AllRoutes } from './routes/AllRoutes';
// import { useLocation } from 'react-router-dom';

// function App() {
//   const location = useLocation();

//   const hideHeaderFooterPaths = ['/signin'];

//   const HideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

//   return (
//     <div className="App">
//       {!HideHeaderFooter && <Header />}
//       <AllRoutes />
//       {!HideHeaderFooter && <Footer />}
//     </div>
//   );
// }

// export default App;


// // src/App.js
// import './App.css';
// import { Footer } from './components/Footer/Footer';
// import { Header } from './components/Header/Header';
// import { AllRoutes } from './routes/AllRoutes';
// import { useLocation } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './page/cart/CartContext';


// function App() {
//   const location = useLocation();
//   const hideHeaderFooterPaths = ['/signin'];
//   const HideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

//   return (
//     <AuthProvider>
//       <CartProvider>
//         <div className="App">
//           {!HideHeaderFooter && <Header />}
//           <AllRoutes />
//           {!HideHeaderFooter && <Footer />}
//         </div>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;


import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { AllRoutes } from './routes/AllRoutes';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './page/cart/CartContext';


function App() {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/signin'];
  const HideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          {!HideHeaderFooter && <Header />}
          <AllRoutes />
          {!HideHeaderFooter && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
