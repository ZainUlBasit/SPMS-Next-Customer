"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "@/utils/Slices/ItemSlice";
import { clearCart } from "@/utils/Slices/ItemCartSlice";
import PageLoader from "@/components/Loader/PageLoader";
import { CreateTransactionApi } from "@/Https";
import { ErrorToast, SuccessToast } from "@/utils/ShowToast";

export default function ItemInfo() {
  const dispatch = useDispatch();
  const ItemState = useSelector((state) => state.ItemState);
  const AuthState = useSelector((state) => state.AuthState);
  const ItemCartState = useSelector((state) => state.ItemCartState);

  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    // Initialize quantities
    const initialQuantities = {};
    ItemCartState.item.forEach((id) => {
      initialQuantities[id] = 1; // Default quantity to 1
    });
    setQuantities(initialQuantities);
  }, [ItemCartState.item]);

  useEffect(() => {
    // Calculate the total price based on quantities
    const calculateTotalPrice = () => {
      if (ItemState.data.length > 0 && ItemCartState.item.length > 0) {
        const total = ItemCartState.item.reduce((sum, id) => {
          const item = ItemState.data.find((dt) => dt._id === id);
          const quantity = quantities[id] || 1; // Default quantity to 1 if not set
          return item ? sum + item.sale * quantity : sum;
        }, 0);
        setTotalPrice(total);
      }
    };

    calculateTotalPrice();
  }, [ItemState.data, ItemCartState.item, quantities]);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value > 0 ? value : 1, // Ensure quantity is at least 1
    }));
  };

  const handleCheckout = async () => {
    // Prepare the items array for the API payload
    const items = ItemCartState.item.map((id) => {
      const item = ItemState.data.find((dt) => dt._id === id);
      const quantity = quantities[id] || 1; // Default quantity to 1 if not set
      return {
        itemId: item._id,
        qty: quantity,
        price: item.sale,
        purchase: item.purchase,
        amount: item.sale * quantity,
      };
    });

    try {
      const response = await CreateTransactionApi({
        customerId: AuthState.data[0].customerId,
        date: new Date(),
        items,
        discount: 0, // Replace with actual discount value if applicable
        invoice_no: 12346, // Replace with actual invoice number if applicable
        verify: false,
      });

      // Handle response
      if (response.data.success) {
        // Clear cart and handle success
        SuccessToast("Checkout successful!");
        dispatch(clearCart());
      } else {
        ErrorToast("Checkout failed!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-[15vh]">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {ItemCartState.item.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="w-full max-w-[600px]">
          {ItemCartState.item.map((id) => {
            const currentItem = ItemState.data.find((dt) => dt._id === id);
            const quantity = quantities[id] || 1;
            const itemTotal = currentItem.sale * quantity;
            return (
              <div
                key={id}
                className="flex justify-between items-center mb-2 p-2 border rounded"
              >
                <div className="flex-grow font-bold font-sans">
                  {currentItem.name} -
                  <span className="mr-2 font-normal">
                    {" "}
                    Rs. {currentItem.sale}/-
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(id, parseInt(e.target.value))
                    }
                    className="w-16 text-center border rounded"
                  />
                  {/* <span className="ml-2">Qty</span> */}
                </div>
                <div className="ml-4">Amount: {itemTotal}/-</div>
              </div>
            );
          })}
          <div className="flex justify-between items-center mt-4 p-2 border-t font-bold">
            <div>Total</div>
            <div>{totalPrice}/-</div>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 px-4 py-2 bg-[#394B92] text-white font-bold rounded hover:bg-[#29346D] transition duration-300"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
