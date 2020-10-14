import Reflux from 'reflux';
import {CartActions} from '../actions/cart.js';

class CartStore extends Reflux.Store {

    constructor(){
        super();
        // Set the initial state of the store
        this.state = {
            items: []
        }

        // Mapping the actions (more like declarations of methods) to
        // the implementation in the store
        this.listenTo(CartActions.addItem, this.addItem);
        this.listenTo(CartActions.removeItem, this.removeItem);
    }

    addItem(item){
        let items = this.state.items;
        items.push(item);
        this.setState({
            items: items
        });
    }

    removeItem(item){
        let items = this.state.items;
        items.splice(items.indexOf(item),1);
        this.setState({
            items: items
        });
    }
}

export default CartStore;
