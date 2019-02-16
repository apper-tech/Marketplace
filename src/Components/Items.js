import React from "react";
import { Grid, Row, Col, code, Badge, ButtonToolbar, Button } from 'react-bootstrap';
import Item from './Item'

const Items = ({ items, userId, onBuyClicked, onSellClicked, onTakeOffMarketClicked }) => {
  if(!items || items.length === 0){
    return null;
  }
  return (
    <Grid>
      <Row className="show-grid">
        <Col className="item borders" xs={4}>
        <Item item={{...items[0], id:0, itemNumber: 1, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
          
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[1], id:1, itemNumber: 2, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[2], id:2, itemNumber: 3, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col className="item borders" xs={4}>
        <Item item={{...items[3], id:3, itemNumber: 4, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[4], id:4, itemNumber: 5, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[5], id:5, itemNumber: 6, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col className="item borders" xs={4}>
        <Item item={{...items[6], id:6, itemNumber: 7, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[7], id:7, itemNumber: 8, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[8], id:8, itemNumber: 9, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col className="item borders" xs={4}>
        <Item item={{...items[9], id:9, itemNumber: 10, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[10], id:10, itemNumber: 11, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
        <Col className="item borders" xs={4}>
        <Item item={{...items[11], id:11, itemNumber: 12, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked}/>
        </Col>
      </Row>
    </Grid>
  )
}

export default Items;