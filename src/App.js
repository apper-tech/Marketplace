import React from "react";
import ReactDOM from "react-dom";
import { Button } from 'react-bootstrap';
import MainNav from './Components/Navbar';
import Items from './Components/Items';
import LoginModal from './Components/LoginModal';
import SignupModal from './Components/SignupModal';
import SellModal from './Components/SellItemModal';
import Header from './Components/Header';
import Landing from './Components/Landing';
import { connect} from 'react-redux';
import { addProperty, login, logout, signup, buyItem, sellItem, takeOffMarket } from "./actions"

class App extends React.Component {
  constructor() {
    super();
    this.state = {showLogin: false,
    showSignup: false,
  showSell: false};
  }

  componentDidUpdate(nextProps, nextState) {
    if(this.props.userId != nextProps.userId){
      this.setState({showLogin: false, showSignup: false, showSell: false});
    }
  }

  render() {
    return (
      <div>
         <MainNav onLoginClicked={() => this.setState({showLogin: true})}
         onSignupClicked={() => this.setState({showSignup: true})}
          userId={this.props.userId}
          onLogoutClicked={this.props.logout}/>
          <div className="container">
          {this.props.userId ? <Header/> : null}
          </div>
          {this.props.userId ? null :
          <Landing/>}
          {this.props.userId && this.props.contractAddressValid ? 
          <Items items={this.props.properties} userId={this.props.userId}
          onBuyClicked={(itemId, price) => this.props.buyItem(this.props.contractInstance, itemId, price, this.props.userId)}
          onSellClicked={itemId => this.setState({itemToSell: itemId, showSell: true})}
          onTakeOffMarketClicked={itemId => this.props.takeOffMarket(this.props.contractInstance, itemId, this.props.userId)}/> :
          null}
          <LoginModal showLogin={this.state.showLogin} 
              onClose={() => this.setState({showLogin: false})}
              onLoginClicked={(address, password) => this.props.login(address, password)}/> 
          <SignupModal showSignup={this.state.showSignup}
          onClose={() => this.setState({showSignup: false})}
          onsignupClicked={(password) => this.props.signup(password)}/>   
          <SellModal showSell={this.state.showSell}
          itemNumber={this.state.itemToSell}
          onClose={() => this.setState({showSell: false})}
          onSellClicked={(itemIndex, price) => {
            this.props.sellItem(this.props.contractInstance, this.state.itemToSell, price, this.props.userId);
            this.setState({showSell: false});
            }}/>
      </div>
    );
  }
}

let mapStateToProps = (state, props) => {
  return {
      properties: state.properties,
      userId: state.userId,
      contractAddressValid: state.contract ? state.contract.contractAddressValid : false,
      contractInstance: state.contract ? state.contract.contractInstance : null
  } 
}

export default connect(mapStateToProps, {addProperty, login, logout, signup, buyItem, sellItem, takeOffMarket})(App);

