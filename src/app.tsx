// import "./app.css";
import '@/styles/site.css'
import ProductsLayout from "./layouts/products/ProductsLayout";
import LoginLayout from "./layouts/login/LoginLayout";
import Header from "./components/Header";
import ShippingOptionsLayout from "./layouts/store/shipping/ShippingOptionsLayout";
import RelayPoolsLayout from "./layouts/store/RelayPoolsLayout";
import MainArea from "./layouts/MainArea";
import Footer from './components/Footer.tsx'
import { CartDrawer } from './layouts/CartDrawer.tsx'

export function App() {
  return (
    <LoginLayout>
      <div className="flex flex-col">
        <Header />
        <main className="min-h-screen lex-1 px-4 inner-column wide pt-12 justify-between items-center">
          <MainArea />
          <CartDrawer />
        </main>

        <Footer />
      </div>
    </LoginLayout>
  );
}

const OldApp = () => {
  return (
    <>
      <div className="mx-auto px-4 py-4">
        <h1 className="text-2xl font-semibold text-orange-900">
          Merchant X
        </h1>
        <p className="text-sm text-orange-500">
          The Merchant Experience for Nostr Rockstars
        </p>
      </div>

      <RelayPoolsLayout />
      <ProductsLayout />
      <ShippingOptionsLayout />

      <footer className="mt-8">
        <div className="mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            Powered by Nostr - Kind 30402 Product Listing
          </p>
        </div>
      </footer>
    </>
  );
};
