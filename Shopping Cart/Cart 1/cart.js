/**
An array to hold all of the items. 
*/
var cartArray = [];


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
function listItems() {
	// Might return JS, or HTML
}


/**
* Get items array
* @return {array} - Returns the array of cart items. 
*/
function getCartArray() {
	return cartArray;
}


/**
* Add an item to the cart array pass the id and name of the item.
* @param {int} id - Id number of item in database.
* @param {string} name - Name of item. 
* @param {number} price - Price of item. 
*/
function addItem(id, name, price) {
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i].id == id) {
			// Found an item with this id add 1 to the count
			cartArray[i].count += 1;
			saveCart();
			// Return the count
			return cartArray[i].count;
		}
	}
	cartArray.push(new CartItem(id, 1, name, price));
	saveCart();
	return 1;
}


/**
Pass the id of an item
removes one item, or should it remove all items? 
If deleting 1 return the new count
*/
function deleteItem(id) {
	console.log("deleteItem");
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i].id == id) {
			// here we might delete all or only delete 1
			// delete 1
			cartArray[i].count -= 1;
			if (cartArray[i].count < 1) {
				cartArray.splice(i, 1);
				saveCart();
				return 0;
			} else {
				saveCart();
				return cartArray[i].count;
			}
		}
	}
	return false; // return false no item was found and removed. 
}


function deleteAllItem(id) {
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i].id == id) {
			cartArray.splice(i, 1);
		}
	}
}

/**
Count all items in cart. 
*/
function countCart() {
	var count = 0;
	for (var i = 0; i < cartArray.length; i++) {
		count += cartArray[i].count;
	}
	return count;
}

/**
Total cost of everything in cart. 
*/
function cartTotal() {
	console.log("cart total");
	var total = 0;
	for (var i = 0; i < cartArray.length; i++) {
		var price = Number(cartArray[i].price);
		var count = Number(cartArray[i].count);
		var total_price = price * count;
		total += total_price;
	}
	return total.toFixed(2);
}

function cartCount() {
	console.log("cart count");
	var total = 0;
	for (var i = 0; i < cartArray.length; i++) {
		total += Number(cartArray[i].count);
	}
	return total;
}

function saveCart() {
	console.log( "save cart" );
	localStorage.setItem("cart", JSON.stringify(cartArray));
}


function getCart() {
	return JSON.parse(localStorage.getItem('cart'));
}


function loadCart() {
	console.log( "Load Cart" )
	var cart = localStorage.getItem('cart');
	if (cart != null) {
		cartArray = JSON.parse(cart);
	}
}

function clearCart() {
	cartArray = [];
}



