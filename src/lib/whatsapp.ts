export const generateWhatsAppLink = (phoneNumber: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const createOrderMessage = (orderId: string, productName: string, price: string, buyerName: string) => {
  return `*New Order from Ultimate Digitizing*%0A%0A` +
    `*Order ID:* ${orderId}%0A` +
    `*Product:* ${productName}%0A` +
    `*Amount:* $${price}%0A` +
    `*Customer:* ${buyerName}%0A%0A` +
    `Please confirm my order. Thank you!`;
};
