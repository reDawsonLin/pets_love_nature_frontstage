export const addThousandPoint = (num) => {
  if (!Number(num)) return 0;

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

export const numberOnly = (event) => {
  const result = Number(event.key);
  if (result || result === 0) return;

  return event.preventDefault();
};
