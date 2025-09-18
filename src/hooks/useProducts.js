import { useState, useEffect } from "react";
import axios from "axios";
import questions from "../data/questions";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        let items = res.data.products || [];

        const ans = questions
          .map((q) => {
            return localStorage.getItem(`q${q.id}`)?.toLowerCase() || "";
          })
          .filter(Boolean);
        console.log("Raw products:", res.data.products);

        if (ans.length > 0) {
          const filtered = items.filter((product) => {
            const text = `${product.title} ${
              product.body_html
            } ${product.tags.join(" ")}`.toLowerCase();
            return ans.some((a) => text.includes(a));
          });

          
          items = filtered.length > 0 ? filtered : items;
        }

        setProducts(items);
        console.log("products fetched:", items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
