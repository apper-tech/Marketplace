import React from "react";
import { 
    code, Badge, ButtonToolbar, Button } from 'react-bootstrap';

const Item = ({ item, onBuyClicked, onSellClicked, onTakeOffMarketClicked }) => {
  if(!item){
    return null;
  }
  let forSaleBySomeElse = item.forSale && item.owner !== item.userId;
  let forSaleByLoggedInUser = item.forSale && item.owner === item.userId;
  let ownedByLoggedInUser = item.owner.toUpperCase() === item.userId.toUpperCase();
  return (
    <div>
          <code>Item {item.itemNumber}</code>
          {item.forSale ? <Badge className="badge" pullRight>For Sale ({item.price} Wei)</Badge> : null}
          <ButtonToolbar className="toolbar">
            {item.forSale && !ownedByLoggedInUser ?<Button bsStyle="danger" bsSize="xsmall" onClick={() => onBuyClicked(item.id, item.price)}>
              Buy
            </Button> : null}
            {!item.forSale && ownedByLoggedInUser ? <Button bsStyle="warning" bsSize="xsmall" onClick={() => onSellClicked(item.id)}>Sell</Button> : null}
            {item.forSale && ownedByLoggedInUser ? <Button bsStyle="success" bsSize="xsmall" onClick={() => onTakeOffMarketClicked(item.id)}>Take Item Off  Market</Button> : null}
          </ButtonToolbar>
          </div>
       
  )
}

export default Item;