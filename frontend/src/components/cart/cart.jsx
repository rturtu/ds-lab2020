import React from 'react';
import Reflux from 'reflux';
import CartStore from '../../stores/cart.js';
import {CartActions} from '../../actions/cart.js';
import {withRouter} from 'react-router-dom';

// Reflux.Component is just a wrapper for React.Component to add stores
// more easily
class Cart extends Reflux.Component{
    constructor(props){
        super(props);
        this.state={
            currentId: 1
        };
        // Setting the Store that you want to listen to
        this.store = CartStore;
    }

    addItem(item){
        let currentId = this.state.currentId;
        // Calling a function to update the store
        CartActions.addItem(''+currentId);
        currentId++;
        this.setState({
            currentId: currentId
        });
    }

    goto(newLocation){
        // This method will redirect you to the newLocation path
        // This requires the withRouter import at the top of the file otherwise
        // the history prop need to be passed from the BrowserRouter component
        // to the bottom in every component, which is a pain in the code
        const history = this.props.history;
        // The hisory is a list of paths which you visited, pushing something
        // into it will change the location in the url bar and rerender the
        // BrowserRouter top-level component (meaning that all the subcomponents
        // will rerender, but the page will not be browser refreshed)
        // https://reacttraining.com/react-router/web/api/history
        history.push(newLocation);
    }

    removeItem(item){
        CartActions.removeItem(item);
    }

    render(){
        return(
            <div>
                <button onClick={()=>{this.goto('/')}}>Home</button>
                <button onClick={()=>{this.goto('/shop')}}>Shop</button>
                <button onClick={()=>{this.addItem()}}>Add Item</button>
                {this.state.items.map( item => 
                    <p>{item} <button onClick={()=>{this.removeItem(item)}}>Delete item</button></p> 
                )}
            </div>
        )
    }
}

export default Cart;
