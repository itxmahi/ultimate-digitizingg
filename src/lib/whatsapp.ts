export const generateWhatsAppLink = (
  productName: string, 
  originalPrice: string | number,
  discountPercentage: number | null,
  finalPrice: string | number,
  userEmail?: string,
  sellerPhone?: string
) => {
  const phone = sellerPhone || "+923000000000"; // Fallback phone
  const discountStr = discountPercentage ? `${discountPercentage}%` : "0%";
  const message = `I want to buy ${productName}. Original Price: ${originalPrice}, Flash Sale Discount: ${discountStr}. Total: ${finalPrice}. User: ${userEmail || "Guest"}.`;
  
  return `https://wa.me/${phone.replace(/\+/g, "")}?text=${encodeURIComponent(message)}`;
};
