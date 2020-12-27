import { useState, useEffect } from "react";
import { getProductsService } from "../services/httpServices";
import Hero from "../Components/LandingPage/Hero";
import CardProduct from "../Components/LandingPage/CardProduct";
import Loader from "../Components/Load/Loader";

function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const products = await getProductsService();
      if (!products) {
        setLoading(false);
        return;
      }
      setProducts(products);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <Hero />
      {loading && (
        <div className="mt-50 w-100 item-center">
          <Loader />
        </div>
      )}
      {products.length > 0 && (
        <div className="mt-50 mb-51 grid-container">
          {products.map((product, index) => {
            return <CardProduct product={product} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
