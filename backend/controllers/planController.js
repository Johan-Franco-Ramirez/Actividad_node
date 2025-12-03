export const getPlans = (req, res) => {
  const plans = [
    { id: 1, name: "Básico", price: 0 },
    { id: 2, name: "Premium", price: 15000 },
    { id: 3, name: "Ultra", price: 30000 },
  ];

  res.json(plans);
};
