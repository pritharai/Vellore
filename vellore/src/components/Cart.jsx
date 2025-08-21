import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../services/cartService';
import { useAuth } from '../hooks/useAuth';
import { setCart } from '../redux/cartSlice';
import { addToWishlist } from '../services/wishlistService';
import { FaSave, FaTimes } from 'react-icons/fa';
import ConfirmationPopup from './ConfirmationPopup';

const Cart = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(null);
  const [isClearCartPopupOpen, setIsClearCartPopupOpen] = useState(false);
  const [addingId, setAddingId] = useState(null);
  const [selectMode, setSelectMode] = useState(false);

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (cart) {
      dispatch(setCart(cart));
    }
  }, [cart, dispatch]);

  const updateCartItemMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: (data) => {
      toast.success(data.message || 'Cart item updated successfully');
      queryClient.invalidateQueries(['cart']);
      setEditingItemId(null);
      setEditQuantity(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      toast.success(data.message || 'Item removed from cart successfully');
      queryClient.invalidateQueries(['cart']);
      setSelectedItems((prev) => prev.filter((id) => id !== data._id));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: (data) => {
      toast.success(data.message || 'Cart cleared successfully');
      queryClient.invalidateQueries(['cart']);
      dispatch(setCart({ user: cart?.user, items: [] }));
      setSelectedItems([]);
      setIsClearCartPopupOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
      setIsClearCartPopupOpen(false);
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: ({ variantId, size }) => addToWishlist({ variantId, size }),
    onMutate: ({ cartItemId }) => setAddingId(cartItemId),
    onSuccess: () => {
      toast.success("Added to wishlist!");
      queryClient.invalidateQueries(['wishlist']);
    },
    onError: (err) => {
      if (err.message.includes("logged in")) {
        toast.error("Please log in to add to wishlist");
        setTimeout(() => navigate("/auth"), 2000);
      } else {
        toast.error(err.message);
      }
    },
    onSettled: () => setAddingId(null),
  });

  const handleAddToWishlist = (variantId, size, cartItemId) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add to wishlist");
      setTimeout(() => navigate("/auth"), 2000);
      return;
    }
    if (!size) {
      toast.error("Please select a size first");
      return;
    }
    if (!variantId) {
      toast.error("Please select a color/variant first");
      return;
    }
    wishlistMutation.mutate({
      variantId,
      size,
      cartItemId,
    });
  };

  const handleQuantityChange = (itemId, currentQuantity, delta) => {
    if (editingItemId !== itemId) {
      setEditingItemId(itemId);
      setEditQuantity(Math.max(1, currentQuantity + delta));
    } else {
      setEditQuantity((prev) => Math.max(1, prev + delta));
    }
  };

  const saveQuantity = (itemId) => {
    if (!editQuantity) {
      toast.error('Please enter a valid quantity');
      return;
    }
    updateCartItemMutation.mutate({ itemId, quantity: editQuantity });
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditQuantity(null);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCartMutation.mutate(itemId);
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleBuySelected = () => {
    const productsToBuy = cart?.items?.filter((item) => selectedItems.includes(item._id)) || [];
    if (productsToBuy.length === 0) {
      toast.error('Please select at least one product to buy.');
      return;
    }
    navigate('/confirm-order', { state: { products: productsToBuy } });
  };

  const handleBuyNow = () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty.');
      return;
    }
    navigate('/confirm-order', { state: { products: cart.items } });
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  const cartTotal = cart?.items?.reduce((sum, item) => sum + item.variant.price * item.quantity, 0) || 0;
  const selectedTotal = cart?.items
    ?.filter((item) => selectedItems.includes(item._id))
    .reduce((sum, item) => sum + item.variant.price * item.quantity, 0) || 0;

  if (!isAuthenticated) {
    toast.error('Please log in to view your cart');
    setTimeout(() => navigate('/auth'), 2000);
    return null;
  }

  if (isLoading) return <div className="max-w-[1100px] md:mt-50 mx-auto p-6 mb-20 text-center py-12">Loading cart...</div>;
  if (error) return <div className="max-w-[1100px] md:mt-50 mx-auto p-6 mb-20 text-center py-12 text-red-500">Failed to load cart</div>;
  if (!cart?.items?.length) return (
    <div className="max-w-[1100px] md:mt-50 mx-auto p-6 mb-20">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      <div className="text-center">Your cart is empty</div>
    </div>
  );

  return (
    <div className="max-w-[1100px] md:mt-50 mx-auto p-6 mb-20">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cart.items.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row mb-6"
        >
          {/* Left (image + checkbox) */}
          <div className="p-4 flex items-center gap-4 md:w-1/3 h-[300px]">
            {selectMode && (
              <input
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => handleCheckboxChange(item._id)}
                className="w-5 h-5 accent-primary"
              />
            )}
            <img
              src={item.variant.image.url}
              alt={`${item.variant.product.name} - ${item.variant.color.name}`}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right (details + actions) */}
          <div className="md:w-2/3 p-6 flex flex-col gap-4">
            <h3 className="text-xl font-medium">{item.variant.product.name}</h3>
            <p className="text-sm text-gray-600">Color: {item.variant.color.name}</p>
            <p className="text-sm text-gray-600">Size: {item.size}</p>
            <p className="text-lg font-semibold text-primary">
              ₹{item.variant.price.toLocaleString('en-IN')}
            </p>

            {/* Quantity controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantity</span>
              <div className="inline-flex items-center gap-2">
                <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                    className="px-3 py-1 font-bold hover:cursor-pointer"
                    disabled={editingItemId === item._id ? editQuantity <= 1 : item.quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={editingItemId === item._id ? editQuantity : item.quantity}
                    className="w-10 text-center border-l border-r border-gray-300 outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                    className="px-3 py-1 font-bold hover:cursor-pointer"
                  >
                    +
                  </button>
                </div>
                {editingItemId === item._id && (
                  <>
                    <button
                      onClick={() => saveQuantity(item._id)}
                      className="text-primary hover:text-primary-hover"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary-light hover:text-white transition hover:cursor-pointer"
              >
                Remove
              </button>
              <button
                onClick={() => handleAddToWishlist(item.variant._id, item.size, item._id)}
                disabled={addingId === item._id}
                className={`px-4 py-2 rounded-md transition hover:cursor-pointer
                  ${addingId === item._id ? 'bg-primary text-white opacity-60 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-hover'}
                `}
              >
                {addingId === item._id ? 'Adding...' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart.items.length > 0 && (
        <div className="text-right mt-6">
          <div className="text-lg font-semibold mb-4">
            {selectMode ? (
              <>
                Total (Selected): ₹{selectedTotal.toLocaleString('en-IN')} <br />
                Total (All Items): ₹{cartTotal.toLocaleString('en-IN')}
              </>
            ) : (
              <>Total: ₹{cartTotal.toLocaleString('en-IN')}</>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsClearCartPopupOpen(true)}
              className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition hover:cursor-pointer"
            >
              Clear Cart
            </button>
            <button
              onClick={() => setSelectMode(!selectMode)}
              className="px-6 py-3 border border-primary bg-white text-primary rounded-md transition hover:cursor-pointer"
            >
              {selectMode ? 'Cancel Selection' : 'Select Items'}
            </button>
            {selectMode ? (
              <button
                onClick={handleBuySelected}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition hover:cursor-pointer"
              >
                Buy Selected Items
              </button>
            ) : (
              <button
                onClick={handleBuyNow}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition hover:cursor-pointer"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      )}

      <ConfirmationPopup
        isOpen={isClearCartPopupOpen}
        title="Clear Cart"
        message="Are you sure you want to clear all items from your cart?"
        onConfirm={handleClearCart}
        onCancel={() => setIsClearCartPopupOpen(false)}
      />
    </div>
  );
};

export default Cart;