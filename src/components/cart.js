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
		this.cartNode.innerHTML = `<h1>Your Cart</h1><div><h2>Your Total: $${this.total()} </h2></div>`

		let value = `<div id="render-cart"><ul>` 
		for (let i=0; i < (this.cart.length); i++) {
			value += `<li>${this.cart[i].item} $${this.cart[i].price}<button data-action="delete-item" data-itemid="${this.cart[i].id}" class="delete-from-cart">X</button></li>`
		}
		value += `</ul></div>`
		this.cartNode.innerHTML += value 
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
			}
				this.renderCart()

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



