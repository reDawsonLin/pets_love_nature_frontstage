export const addThousandPoint = (num) => {
  const result = Number(num)
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return result;
};
