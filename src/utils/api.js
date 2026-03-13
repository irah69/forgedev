// Mock API service for handling product requests
export const fetchProducts = async (filters = {}) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock products data
    return {
      success: true,
      data: [
        { id: 1, name: 'Premium Headphones', price: 149.99, category: 'Electronics', rating: 4.5 },
        { id: 2, name: 'Wireless Speaker', price: 89.99, category: 'Audio', rating: 4.3 },
        { id: 3, name: 'Smart Watch', price: 199.99, category: 'Wearables', rating: 4.7 }
      ]
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: error.message };
  }
};

// Mock API service for cart operations
export const updateCart = async (cartData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Cart updated successfully' };
  } catch (error) {
    console.error('Error updating cart:', error);
    return { success: false, error: error.message };
  }
};

// Mock API service for orders
export const createOrder = async (orderData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { 
      success: true, 
      orderId: 'ORD-' + Date.now(),
      message: 'Order created successfully'
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};
