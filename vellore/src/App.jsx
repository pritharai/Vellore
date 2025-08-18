// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import ScrollToTop from './components/ScrollToTop';

// import Home from './pages/Home';
// import ProductDetail from './components/ProductDetails';
// import Cart from './components/Cart';
// import Wishlist from './components/Wishlist';
// import Testimonials from './components/Testimonials';
// import ProductBanner from './components/ProductsBanner';
// import Products from './components/Product';
// import AboutPage from './pages/AboutPage';
// import Contact from './components/Contact';
// import AuthPage from './pages/AuthPage';
// import ShippingPolicy from './pages/ShippingPolicy';
// import FAQs from "./pages/Faq";
// import MyAccount from './pages/MyAccount';
// import ConfirmOrder from './pages/confirmOrder';
// import ThankYou from './pages/Thankyou';
// import AdminDashboard from './components/AdminDashboard';
// import ResetPassword from './components/ResetPassword';
// import InstagramButton from './components/Insta';
// import AdminOrders from './components/orders';
// import VerifyPage from './components/Verify';
// import UserProfilePage from './components/Profile';
// import AddAddress from './components/Address';
// import Search from './components/Search';
// import PageNotFound from './pages/PageNotFound';
// import Notification from './components/Notification';
// import AuthProvider from './components/AuthProvider';

// const App = () => {
//   return (
//     <Router>
//       <ScrollToTop />
//       <AuthProvider>
//         <Notification />
//         <Routes>
//           {/* Auth page without Navbar/Footer */}
//           <Route path="/auth" element={<AuthPage />} />

//           {/* All other pages with Navbar/Footer layout */}
//           <Route
//             path="*"
//             element={
//               <>
//                 <Navbar />
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/product/:id" element={<ProductDetail />} />
//                   <Route path="/cart" element={<Cart />} />
//                   <Route path="/wishlist" element={<Wishlist />} />
//                   <Route path="/testimonials" element={<Testimonials />} />
//                   <Route path="/products-banner" element={<ProductBanner />} />
//                   <Route path="/products" element={<Products />} />
//                   <Route path="/about" element={<AboutPage />} />
//                   <Route path="/contact" element={<Contact />} />
//                   <Route path="/shipping" element={<ShippingPolicy />} />
//                   <Route path="/faqs" element={<FAQs />} />
//                   <Route path="/my-account" element={<MyAccount />} />
//                   <Route path="/search" element={<Search />} />
//                   <Route path="/admin-dashboard" element={<AdminDashboard />} />
//                   <Route path="/confirm-order" element={<ConfirmOrder />} />
//                   <Route path="/thank-you" element={<ThankYou />} />'
//                   <Route path="/orders" element={<AdminOrders />} />
//                   <Route path="/verify" element={<VerifyPage />} />
//                   <Route path="/profile" element={<UserProfilePage />} />
//                   <Route path="/reset-password/:token" element={<ResetPassword />} />
//                   <Route path="/address" element={<AddAddress />} />
//                   <Route path="/search" element={<Search />} />
//                   <Route path="*" element={<PageNotFound />} />
//                 </Routes>
//                 <InstagramButton /> {/* Added here so it shows on all pages */}
//                 <Footer />
//               </>
//             }
//           />
//         </Routes>
//       </AuthProvider>
//       {/* Glow animation */}
//       <style>
//         {`
//           @keyframes pulseGlow {
//             0% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255, 105, 180, 0.8)); }
//             50% { transform: scale(1.1); filter: drop-shadow(0 0 12px rgba(255, 105, 180, 1)); }
//             100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255, 105, 180, 0.8)); }
//           }
//         `}
//       </style>
//     </Router>
//   );
// };

// export default App;


// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProductDetail from "./components/ProductDetails";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Testimonials from "./components/Testimonials";
import ProductBanner from "./components/ProductsBanner";
import Products from "./components/Product";
import AboutPage from "./pages/AboutPage";
import Contact from "./components/Contact";
import AuthPage from "./pages/AuthPage";
import ShippingPolicy from "./pages/ShippingPolicy";
import FAQs from "./pages/Faq";
import MyAccount from "./pages/MyAccount";
import ConfirmOrder from "./pages/confirmOrder";
import ThankYou from "./pages/Thankyou";
import AdminDashboard from "./components/AdminDashboard";
import ResetPassword from "./components/ResetPassword";
import InstagramButton from "./components/Insta";
import AdminOrders from "./components/orders";
import VerifyPage from "./components/Verify";
import UserProfilePage from "./components/Profile";
import AddAddress from "./components/Address";
import Search from "./components/Search";
import PageNotFound from "./pages/PageNotFound";
import Notification from "./components/Notification";
import AuthProvider from "./components/AuthProvider";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Notification />
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/product/:id"
            element={
              <>
                <Navbar />
                <ProductDetail />
                <Footer />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <AboutPage />
                <Footer />
              </>
            }
          />

          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <Products />
                <Footer />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            path="/shipping"
            element={
              <>
                <Navbar />
                <ShippingPolicy />
                <Footer />
              </>
            }
          />


          {/* Protected Routes (Authenticated Users) */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>

                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/confirm-order" element={<ConfirmOrder />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/address" element={<AddAddress />} />
                    <Route path="/search" element={<Search />} />
                  </Routes>
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
          </Route>

          {/* Admin Routes (Authenticated + Admin Role) */}
          <Route element={<ProtectedRoute requireAdmin />}>
            <Route
              path="/admin"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/orders" element={<AdminOrders />} />
                  </Routes>
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
          </Route>
          <Route path="*" element={
            <>
              <Navbar />
              <PageNotFound />
              <Footer />
            </>
          } />
        </Routes>
      </AuthProvider>
      <style>
        {`
          @keyframes pulseGlow {
            0% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255, 105, 180, 0.8)); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 12px rgba(255, 105, 180, 1)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255, 105, 180, 0.8)); }
          }
        `}
      </style>
    </Router>
  );
};

export default App;