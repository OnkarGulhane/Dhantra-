export const formatCurrency = (amount, currency = "INR") => {
    if (amount === null || amount === undefined) return "₹0.00";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
    }).format(amount);
};
