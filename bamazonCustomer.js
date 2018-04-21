var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
  
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
// start inquirer function
    displayWares();
  });

  function displayWares() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
      }
      console.log("-----------------------------------");
    });
  }

  function buyPrompt(purchaseID, quanitity) {
      inquirer
      .prompt([{
          name: "purchaseID",
          message: "Enter the ID of the product you would like to buy.",
          validate: function(value) {
              if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5"
              || value === "6" || value === "7" || value === "8" || value === "9" || value === "10") {
                  return true;
              }
              return false;
          }
        }, {
              name: "quantity",
              message: "How many would you like?",
              validate: function (value) {
                  if (isNaN(value) === false && parseInt(value) > 0) {
                      return true;
                  }              
                return false;
            }
          }
    ]).then(function(value) {
      switch (value.purchaseID) {
      case "1":
      updateData(1);
      break;

      case "2":
      updateData(2);
      break;
      }
  })
  };

  function updateData(chosenItem) {
      for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === purchaseID) {
              chosenItem = results[i];
          }
      }
      connection.query(
        "UPDATE stock_quantity FROM bamazon WHERE ?",
      
          {
              item_id = chosenItem
          }
      ,
      function(error) {
          if (error) throw err;
          console.log("Your order has been placed!");
      }
      );
    }
    else {
        console.log("Insufficient quantity.");
    }
