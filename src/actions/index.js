(function() {
  // Union of Chrome, Firefox, IE, Opera, and Safari console methods
  var methods = ["assert", "cd", "clear", "count", "countReset",
    "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed",
    "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd",
    "select", "table", "time", "timeEnd", "timeStamp", "timeline",
    "timelineEnd", "trace", "warn"];
  var length = methods.length;
  var console = (window.console = window.console || {});
  var method;
  var noop = function() {};
  while (length--) {
    method = methods[length];
    // define undefined methods as noops to prevent errors
    if (!console[method])
      console[method] = noop;
  }
})();

import {
    LOGIN_SUCCESSFUL, 
    LOGIN_FAILED, 
    LOGOUT, 
    SIGNUP_SUCCEEDED, 
    SIGNUP_FAILED,
    CHANGE_CONTRACT_ADDRESS, 
    ITEMS_LOADED
} from "../constants/action-types";
import _ from 'lodash';
import Web3 from 'web3';
import abi from '../../build/contracts/Market.json';


let web3 = new Web3();
web3.setProvider(
    new Web3.providers.WebsocketProvider(
        'ws://localhost:7545'
    )
);

export const login = (address, password) => {
    return dispatch => {
        web3.eth.personal.unlockAccount(address, password, 600)
            .then((response) => {
                console.info('Login successful:', response)
                dispatch({ type: LOGIN_SUCCESSFUL, payload: address });
            }).catch(error => {
                console.log('Login Error:', error)
                dispatch({ type: LOGIN_FAILED, payload: null });
            })

    }
}

export const logout = () => {
    return dispatch => dispatch({ type: LOGOUT, payload: null });
}

export const signup = (password) => {
    return dispatch => {
        web3.eth.personal.newAccount(password)
            .then(response => {
                console.info('new account ', response);
                dispatch({ type: SIGNUP_SUCCEEDED, payload: response })
            }).catch(error => {
                console.error('error creating account ', error);
                dispatch({ type: SIGNUP_FAILED })
            })
    }
}

export const changeContractAddress = (newAddress) => {
    return dispatch => {
        if (web3.utils.isAddress(newAddress)) {
            console.log(abi);
            let contractInstance = new web3.eth.Contract(abi.abi, newAddress);
            dispatch({ type: CHANGE_CONTRACT_ADDRESS, payload: { contractAddress: newAddress, contractAddressValid: true, contractInstance: contractInstance } });
            loadItems(contractInstance, dispatch);
            subscribeToEvents(contractInstance, dispatch);
        } else {
            dispatch({ type: CHANGE_CONTRACT_ADDRESS, payload: { contractAddress: newAddress, contractAddressValid: false, contractInstance: null } });
        }
    }
}

export const clearContractAddress = _ => {
    return dispatch => {
        dispatch({ type: CHANGE_CONTRACT_ADDRESS, payload: { contractAddress: null, contractAddressValid: false, contractInstance: null } })
    }
}

export const buyItem = (contractInstance, itemId, price, userId) => {
    return dispatch => {
        contractInstance.methods.buyItem(itemId).send({value: price, from: userId})
        .then(response => {
           console.log(response);
            loadItems(contractInstance, dispatch);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const sellItem = (contractInstance, itemId, price, userId) => {
    return dispatch => {
        contractInstance.methods.putItemUpForSale(itemId, price).send({from: userId})
        .then(response => {
            console.log(response);
            loadItems(contractInstance, dispatch);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const takeOffMarket = (contractInstance, itemId, userId) => {
    return dispatch => {
        contractInstance.methods.takeOffMarket(itemId).send({from: userId})
        .then(response => {
            console.log(response);
            loadItems(contractInstance, dispatch);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

let loadItems = (contractInstance, dispatch) => {
    contractInstance.methods.getItems().call()
    
            .then(response => {
               let items =  _.zipWith(response[0], response[1], response[2], (owner, forSale, price) => {
                    return {owner, forSale, price};
                })
                dispatch({type: ITEMS_LOADED, payload: items})
            })
            .catch(error => console.log(error));
}

let subscribeToEvents = (contractInstance, dispatch) => {
    let itemOwnerChangedEvent = contractInstance.events.ItemOwnerChanged(
        {
          fromBlock: 0
        },
        function(error, event) {
          console.log('ItemOwnerChanged event : ', event);
          loadItems(contractInstance, dispatch);
        }
      );

      let itemPriceChangedEvent = contractInstance.events.ItemPriceChanged(
        {
          fromBlock: 0
        },
        function(error, event) {
          console.log('ItemPriceChanged event : ', event);
          loadItems(contractInstance, dispatch);
        }
      );

      let itemAvailabilityChangedEvent = contractInstance.events.ItemAvailabilityChanged(
        {
          fromBlock: 0
        },
        function(error, event) {
          console.log('ItemAvailabilityChanged event : ', event);
          loadItems(contractInstance, dispatch);
        }
      );
      
}