export const addThousandPoint = (num) => {
  const result = Number(num)
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return result;
};

export const totalPrice = (cart_array) => {
  if (!cart_array) return 0;
  let result = null;

  cart_array.forEach((item) => {
    result += item.price * item.quantity;
  });
  return result;
};
