import React, { useState } from "react"; // Import useState
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozzarella",
    price: 10,
    photoName: "/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozzarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozzarella, mushrooms, and onion",
    price: 12,
    photoName: "/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozzarella, and pepperoni",
    price: 15,
    photoName: "/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozzarella, ham, arugula, and burrata cheese",
    price: 18,
    photoName: "/prosciutto.jpg",
    soldOut: false,
  },
];

function Header() {
  return (
    <h1 style={{ color: "orange", fontSize: "48px", textTransform: "uppercase" }}>
      Andy's Pizza Co.
    </h1>
  );
}

function Pizza({ id, image, name, ingredients, price, addToFavorites, isFavorite }) {
  return (
    <div>
      <img src={image} alt={name} style={{ width: '320px', height: '300px' }} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <p>${price}</p>
      <button class='btn' onClick={() => addToFavorites(id)}>
        {isFavorite ? "💖" : "♡"} Favorite
      </button>
    </div>
  );
}

function Menu() {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPizzas = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pizza.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(fav => fav !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <input class='btn'
        type="text"
        placeholder="Search for a pizza..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

      />
      {filteredPizzas.map((pizza) => (
        <Pizza
          key={pizza.name}
          image={pizza.photoName}
          name={pizza.name}
          ingredients={pizza.ingredients}
          price={pizza.price}
        />
      ))}
      <p>Authentic Italian cuisine, all from our stone oven</p>
      <div className="pizzas">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <Pizza
              key={pizza.name}
              id={pizza.name}
              image={pizza.photoName}
              name={pizza.name}
              ingredients={pizza.ingredients}
              price={pizza.price}
              addToFavorites={addToFavorites}
              isFavorite={favorites.includes(pizza.name)}
            />
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '100%' }}>
            <h2>No results found.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

function getShopStatus() {
  const currentHour = new Date().getHours();
  return currentHour >= 10 && currentHour < 22;
}

function Footer() {
  const isOpen = getShopStatus();
  return (
    <footer>
      <p style={{ fontSize: "13px" }} >{isOpen ? "We're currently open" : "Sorry, we are closed"}</p>
    </footer>
  );
}

function Tagline() {
  const isOpen = getShopStatus();
  return (
    <p style={{ fontSize: "19px", fontWeight: "bold" }}>
      {isOpen ? "Authentic Italian Pizza" : ""}
    </p>
  );
}

function Order() {
  return (
    <div>
      <button className="btn">Order</button>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <Tagline />
      <Header />
      <Menu />
      <Footer />
      <Order />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
