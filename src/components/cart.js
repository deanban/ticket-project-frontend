class Cart {
	
	constructor(){
		this.cart = []
		this.cartCounter = 0
		this.bindingAndEventListener()
	}

	bindingAndEventListener(){
		this.eventsNode = document.getElementById('events-container')
		this.addToCartButton = document.getElementById('add-cart')
		this.cartNode = document.getElementById('cart-container')
		// this.checkoutButton = document.getElementById('checkout')

		this.addToCart()
		this.cartElement = document.getElementById('render-cart')
		// this.removeFromCart()
		// this.cartNode.addEventListener("click", event => {
		// 	let data = event.target.dataset
		// 	// debugger
		// 	if(data.action === "delete-item") {
		// 		this.removeFromCart(this.cart, parseInt(data.itemid))
		// 		this.renderCart()
		// 	}

		// })
		this.removeFromCart()
		this.checkout()
	}

	addToCart(){

		this.eventsNode.addEventListener('click', (event) =>{
			if (event.target.id === "add-cart") {
				let cartItem = JSON.parse(event.target.parentElement.dataset.props).name
				let itemPrice = JSON.parse(event.target.parentElement.dataset.props).price
				this.cartCounter++
				this.cart.push(this.cartItem(cartItem, itemPrice))

				this.renderCart()
			}
		})

	}




	total() {
		let newarray = []
		for (let i = 0; i < this.cart.length; i++) {
			newarray.push(this.cart[i].price)
		}
		return newarray.reduce(this.add, 0)
	}

	add (a, b) {
		return a + b
	}


	renderCart(){
		this.cartNode.style.backgroundColor = "#CCFFFF"
		this.cartNode.style.border = "solid"
		this.cartNode.innerHTML = `<span><h1 class="cart-header">Your Cart</h1></span><div><span><h2 class="cart-header">Your Total: $${this.total()} </h2></span></div>`

		let value = `<div id="render-cart"><ul>` 
		for (let i=0; i < (this.cart.length); i++) {
			value += `<li><h4>${this.cart[i].item} $${this.cart[i].price}<button data-action="delete-item" data-itemid="${this.cart[i].id}" class="delete-from-cart">Remove From Cart</button><h4></li>`
		}
		value += `</ul><div style="text-align:center;"><button id="checkout">Checkout</button></div></div>`
		this.cartNode.innerHTML += value 

	}

		checkout() {
		this.cartNode.addEventListener('click', (event) => {
			if (event.target.id === "checkout") {
				this.cartNode.innerHTML = `<div style="text-align:center"><h3>Your Total: $${this.total()}</h3> <form>First name:<input type='text' name='FirstName'><br>Last name: <input type='text' name='LastName'><br>Credit Card #: <input type='text' name='Credit Card No.'><br>Email: <input type='text' name='Email'></form><br></div><div style="text-align:center;"><button id="submit">Submit</button></div>`
				this.cart.length = 0
			}

			if (event.target.id === "submit") {
				this.cartNode.innerHTML = `<div style="text-align:center"><h3>Your Purchase Was Successful!</h3><br><h4>Check Your Email For Confirmation!</h4></div><div style="text-align:center;"><button id="continue-shopping">Continue Shopping</button></div>`
			}

			if (event.target.id === "continue-shopping") {
				this.renderCart()
			}
		})
	}

	removeFromCart(arr){
		// event.target.parentElement.remove()
		// let index = arr.indexOf()
		//  = arr.splice((targetId - 1), 1)
		this.cartNode.addEventListener("click", event => {
			let data = event.target.dataset
			// debugger
			if(data.action === "delete-item") {
				// this.removeFromCart(this.cart, parseInt(data.itemid))
				this.cart = this.cart.filter(function(item){
				return item.id !== parseInt(data.itemid)
				})
				this.renderCart()
			}
				

		})
		// debugger
		// console.log(this.cart)
		
	}

	cartItem(cartItem, itemPrice){
		return{
			id: this.cartCounter,
			item: cartItem,
			price: itemPrice
		}
	}
}



