import { useState, useEffect } from "react";
import TextComponents from "../components/TextComponents";
import resultsGraphic from "../assets/results graphic.jpg";
import useProducts from "../hooks/useProducts";
import { Heart, ChevronRight } from "lucide-react";
import FadeInSection from "../components/FadeInSection";

function Results() {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggleWishlist = (productId) => {
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [productId, ...wishlist];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sortedProducts = [...products].sort((a, b) => {
    const aInWishlist = wishlist.includes(a.id);
    const bInWishlist = wishlist.includes(b.id);
    if (aInWishlist && !bInWishlist) return -1;
    if (!aInWishlist && bInWishlist) return 1;
    return 0;
  });

  const itemsPerPage = 2;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <FadeInSection>
      <div>
        <div className="relative">
          <TextComponents
            graphic={resultsGraphic}
            title={"Build your everyday self care routine."}
            paragraph={
              "Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day."
            }
            callToAction={"Retake the quiz"}
          />

          <div className="flex justify-center absolute left-1/2 -bottom-110 transform -translate-x-1/2">
            <div className="mt-12 flex gap-6 px-8 items-start">
              <div className="flex-1">
                <div className="flex gap-6">
                  <div className="w-[300px] h-[420px] p-6 rounded-lg shadow-md flex-shrink-0 bg-[#E6F8FF] overflow-hidden">
                    <h3 className="text-xl font-bold mb-4">Daily routine</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-15">
                      {currentProducts[0]?.body_html?.replace(
                        /<[^>]*>?/gm,
                        ""
                      ) || "No description available"}
                    </p>
                  </div>

                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="w-[300px] h-[420px] bg-white rounded-lg shadow-md overflow-hidden relative flex-shrink-0"
                    >
                      <button
                        onClick={() => handleToggleWishlist(product.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                      >
                        <Heart
                          size={22}
                          fill={wishlist.includes(product.id) ? "red" : "none"}
                        />
                      </button>

                      <img
                        src={product.images[0]?.src}
                        alt={product.title}
                        className="w-full h-[220px] object-cover"
                      />
                      <div className="p-4 flex flex-col justify-between h-[calc(100%-220px)]">
                        <h4 className="text-lg font-semibold truncate">
                          {product.title}
                        </h4>
                        <p className="text-gray-600 font-medium">
                          ${product.variants[0]?.price || "0.00"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className=" flex justify-center">
                  <button
                    onClick={handleNext}
                    className="absolute -right-10 top-1/2 -translate-y-1/2 bg-[#EEF7FB] p-2 rounded-full disabled:opacity-50 hover:bg-gray-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="flex gap-1 relative mt-10 mb-10">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full  ${
                          i === currentIndex ? "bg-[#5BC1ED]" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export default Results;
