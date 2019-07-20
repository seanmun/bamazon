var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

// Connection with the server 
connection.connect(function(err) {
  if (err) {console.error("error connecting: " + err.stack);}
  loadProducts();
});

// Load product table with product name, price and quantity available
function loadProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);

    // Callback prompt
    promptCustomerForItem(res);
  });
}

// Prompt the customer for a product ID
function promptCustomerForItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "End the ID of the product you want? or [Q]uit",
        validate: function(val) {return !isNaN(val) || val.toLowerCase() === "q";}
      }
    ])
    .then(function(val) {
      // Check if the user wants to quit the program
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      // If prod_id exists; next question (qty)
      if (product) {
        // Pass the product
        promptCustomerForQuantity(product);
      }
      else {
        // If id doesn't exist display error
        console.log("\nOut of inventory.");
        loadProducts();
      }
    });
}

// Quantity question
function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "Quantity? or [Q]uit",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // If quit
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      // Check available stock quantity
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        // Purchase
        makePurchase(product, quantity);
      }
    });
}

// Update database based on users selection
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// Inventory check, make sure ID exists
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

// Quit program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Goodbye!");
    process.exit(0);
  }
}
