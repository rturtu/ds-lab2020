import React from 'react';
import Reflux from 'reflux';
import {Link} from 'react-router-dom';
import ShopStore from '../../stores/shop.js';
import CartStore from '../../stores/cart.js';
import {CartActions} from '../../actions/cart.js';

class Shop extends Reflux.Component{
    constructor(props){
        super(props);
        this.state={
        };
        // To listen to multiple stores you can use stores and pass an array of stores
        this.stores = [ShopStore, CartStore];
    }

    addItemToCart(index){
        let product = this.state.products[index];
        CartActions.addItem(product.name);
    }

    render(){
        return(
            <div>
                {/* This is a jsx html comment */}
                {/* You can also use Link from react-router-dom (imported above) */}
                {/* to redirect you to a specific path without browser refresh, */}
                {/* but doing it programatically I believe it has more uses */}
                <Link to='/'>Home</Link> <br /> 
                <Link to='/cart'>Cart</Link>  <br />
                Shop
                    {/* Using .map in an array will return an array of jsx components */}
                    {/* its like a for for displaying arrays of elements */}
                    {this.state.products.map( (product, index) => 
                        <div key={product.id} style={{display: 'inline-block', width: '200px', border: '1px solid black'}}>
                        {/* Styles can also be passed in the element */}
                            <span>{product.name}</span>
                            <button onClick={()=>{this.addItemToCart(index)}}>Add to cart</button>
                        </div>
                    )}
            </div>
        )
    }
}

export default Shop;
