export const getOrders = async () => {
  const response = await fetch(`api/orders`);
  const json = await response.json();

  return json;
};


export async function updateOrders(orderId, { status, payment }) {
  const Options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status:status, payment:payment }),
  };
  const response = await fetch(`api/orders/${orderId}`, Options);
  const json = await response.json();
  return json;
}
