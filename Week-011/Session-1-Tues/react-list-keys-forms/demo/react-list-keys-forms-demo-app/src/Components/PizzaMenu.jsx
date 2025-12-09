export default function PizzaMenu() {
  let pizzas = [
    { id: 1, name: "Pepperoni Paradise", spicy: true },
    { id: 1, name: "Veggie Supreme", spicy: false },
    { id: 1, name: "Hawaiian Controversy", spicy: false },
    { id: 1, name: "Meat Lovers Madness", spicy: true },
  ];

  return (
    <ul>
      {pizzas.map((pizza) => (
        <li key={pizza.id}>
          {pizza.name}
          {pizza.spicy ? "🌶️" : ""}
        </li>
      ))}
    </ul>
  );
}
