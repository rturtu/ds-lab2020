import Reflux from 'reflux';
import {ShopActions} from '../actions/shop.js';
import {getProducts} from '../api/requests.js';

class ShopStore extends Reflux.Store {

    constructor(){
        super();
        // Set the initial state of the store
        this.state = {
            products: []
        }
        // Make the api call
        // This will be a promise, that means that the execution will continue
        // and after the promise (api call) will be processed by the server the
        // funtion in then() will be called
        getProducts().then(response => {
            // If the response is OK, then we can fetch the data
            if(response.status === 200){
                response.text().then(response => {
                    // Get the body of request as a json
                    let res = JSON.parse(response);
                    let products = []
                    for(let i = 0; i < res.length ; i++){
                        products.push({
                            name: res[i].title,
                            id: res[i].id
                        })
                    }
                    this.setState({
                        products: products
                    })
                })
            }
        })

    }

}

export default ShopStore;

