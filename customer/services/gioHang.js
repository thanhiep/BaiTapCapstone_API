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

    // tính tổng tiền
    this.totalPrice = function(cart,total){
        cart.forEach(function(item){
            total += item.price * item.quantity;
        })
        return total;
    }


}