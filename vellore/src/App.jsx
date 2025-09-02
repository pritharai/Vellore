import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import {store} from "./redux/index";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute  from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Notification from "./components/Notification";
import InstagramButton from "./components/Insta";
import AuthPage from "./pages/AuthPage";
import Verify from "./components/Verify";
import ResetPassword from "./components/ResetPassword";
import Home from "./pages/Home";
import ProductDetail from "./components/ProductDetails";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Products from "./components/Product";
import AboutPage from "./pages/AboutPage";
import Contact from "./components/Contact";
import ShippingPolicy from "./pages/ShippingPolicy";
import MyAccount from "./pages/MyAccount";
import ThankYou from "./pages/Thankyou";
import AdminDashboard from "./components/AdminDashboard";
import UserProfilePage from "./components/Profile";
import Search from "./components/Search";
import PageNotFound from "./pages/PageNotFound";
import Privacy from "./components/Privacy";
import Refund from "./components/Refund";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductManagement from "./components/ProductManagement";
import Terms from "./components/Terms";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <Notification />
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <InstagramButton />
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
                  <InstagramButton />
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
                  <InstagramButton />
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
                  <InstagramButton />
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
                  <InstagramButton />
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
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route

              path="/privacy"
              element={
                <>
                  <Navbar />
                  <Privacy />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/refund"
              element={
                <>
                  <Navbar />
                  <Refund />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
                path="/terms"
                element={
                  <>
                    <Navbar />
                    <Terms />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
                <Route
                path="/search"
                element={
                  <>
                    <Navbar />
                    <Search />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />


            {/* Protected Routes (Authenticated Users) */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/cart"
                element={
                  <>
                    <Navbar />
                    <Cart />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <>
                    <Navbar />
                    <Wishlist />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/confirm-order"
                element={
                  <>
                    <Navbar />
                    <OrderConfirmation />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/my-account"
                element={
                  <>
                    <Navbar />
                    <MyAccount />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/thank-you"
                element={
                  <>
                    <Navbar />
                    <ThankYou />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <UserProfilePage />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
            </Route>

            {/* Admin Routes (Authenticated + Admin Role) */}
            <Route element={<AdminRoute />}>
              <Route
                path="/admin/dashboard"
                element={
                  <>
                    <Navbar />
                    <AdminDashboard />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <>
                    <Navbar />
                    <ProductManagement />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
            </Route>


            {/* Catch-all Route */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <PageNotFound />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default App;