export const orderStatusTrans =  (status) => {
  let result;

  switch (status) {
    case 1:
      result = "訂單已成立，處理中";
      break;
    case 2:
      result = "已出貨，運送中";
      break;
    case 3:
      result = "已送達";
      break;
    case 4:
      result = "已取貨，待評價";
      break;
    case 5:
      result = "已評價";
      break;
    case -1:
      result = "退貨中";
      break;
    case -2:
      result = "已退貨";
      break;
    case -3:
      result = "付款失敗";
      break;
    default:
      result = "未處理";
  }

  return result;
};
