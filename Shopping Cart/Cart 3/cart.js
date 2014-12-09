/**

Here the entire cart system is wrapped in an anonymous object. The object returns? 

*/

var cart = {};			// make an object. 

/**
An array to hold all of the items. 
*/
cart.cartArray = [];	// Add all properties to the object 

/** 
* CartItem defines a shopping cart item. Pass the id, count, and name of the item. 
* @constructor
* @param {int} id - The id of this item in the products table. 
* @param {int} count - Number of items added to cart.
* @param {string} name - Name of item.
* @param {number} price - Price of item. 
*/
var CartItem = function(id, count, name, price) {
	this.id 	= id;
	this.count 	= count;
	this.name 	= name;
	this.price 	= price;
}


/** 
* List all of the items in the cart
* @return - ???
*/
cart.listItems = function() {
	// Might return JS, or HTML
}


/**
* Get items array
* @return {array} - Returns the array of cart items. 
*/
cart.getCartArray = function() {
	return this.cartArray;
}


/**
* Add an item to the cart array pass the id and name of the item.
* @param {int} id - Id number of item in database.
* @param {string} name - Name of item. 
* @param {number} price - Price of item. 
*/
cart.addItem = function(id, name, price) {
	for (var i = 0; i < this.cartArray.length; i++) {
		if (this.cartArray[i].id == id) {
			// Found an item with this id add 1 to the count
			this.cartArray[i].count += 1;
			this.saveCart();
			// Return the count
			return this.cartArray[i].count;
		}
	}
	this.cartArray.push(new CartItem(id, 1, name, price));
	this.saveCart();
	return 1;
}


/**
Pass the id of an item
removes one item, or should it remove all items? 
If deleting 1 return the new count
*/
cart.deleteItem = function(id) {
	// console.log("deleteItem");
	for (var i = 0; i < this.cartArray.length; i++) {
		if (this.cartArray[i].id == id) {
			// here we might delete all or only delete 1
			// delete 1
			this.cartArray[i].count -= 1;
			if (this.cartArray[i].count < 1) {
				this.cartArray.splice(i, 1);
				this.saveCart();
				return 0;
			} else {
				this.saveCart();
				return this.cartArray[i].count;
			}
		}
	}
	return false; // return false no item was found and removed. 
}


cart.deleteAllItem = function(id) {
	for (var i = 0; i < this.cartArray.length; i++) {
		if (this.cartArray[i].id == id) {
			this.cartArray.splice(i, 1);
		}
	}
}

/**
Count all items in cart. 
*/
cart.countCart = function() {
	var count = 0;
	for (var i = 0; i < this.cartArray.length; i++) {
		count += this.cartArray[i].count;
	}
	return count;
}

/**
Total cost of everything in cart. 
*/
cart.cartTotal = function() {
	// console.log("cart total");
	var total = 0;
	for (var i = 0; i < this.cartArray.length; i++) {
		var price = Number(this.cartArray[i].price);
		var count = Number(this.cartArray[i].count);
		var total_price = price * count;
		total += total_price;
	}
	return total.toFixed(2);
}

cart.cartCount = function() {
	console.log("cart count");
	var total = 0;
	for (var i = 0; i < this.cartArray.length; i++) {
		total += Number(this.cartArray[i].count);
	}
	return total;
}

cart.saveCart = function() {
	// console.log( "save cart" );
	localStorage.setItem("cart", JSON.stringify(cart.cartArray));
}


cart.getCart = function() {
	return JSON.parse(localStorage.getItem('cart'));
}


cart.loadCart = function() {
	// console.log( "Load Cart" )
	var cart = localStorage.getItem('cart');
	if (cart != null) {
		this.cartArray = JSON.parse(cart);
	}
}

cart.clearCart = function() {
	this.cartArray = [];
}



