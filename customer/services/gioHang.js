function Cart(){
    // add item to cart
    this.addItem = function(cart,cartItem){
        if (cart.length === 0) {
            cart.push(cartItem);
        } else {
            let exist = false;
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];
                if (item.id === cartItem.id) {
                    exist = true;
                    item.quantity++;
                    break;
                }
            }
            if(exist == false){
                cart.push(cartItem);
            }
        }

        return cart;
    };


}