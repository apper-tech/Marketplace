pragma solidity >=0.4.22 <0.6.0;

contract Market {
    address payable owner;
    mapping (address => uint) public balances;
    
    struct Item {
        address owner;
        bool forSale;
        uint price;
    }
    
    Item[12] public items;
    
    event ItemOwnerChanged(
        uint index
    );
    
    event ItemPriceChanged(
        uint index,
        uint price
    );
    
    event ItemAvailabilityChanged(
        uint index,
        uint price,
        bool forSale
    );
    
    constructor() public {
        owner = msg.sender;
        items[0].price = 4000;
        items[0].forSale = true;
        items[1].price = 4000;
        items[1].forSale = true;
        items[2].price = 4000;
        items[2].forSale = true;
        items[3].price = 4000;
        items[3].forSale = true;
        items[4].price = 4000;
        items[4].forSale = true;
        items[5].price = 4000;
        items[5].forSale = true;
        items[6].price = 4000;
        items[6].forSale = true;
        items[7].price = 4000;
        items[7].forSale = true;
        items[8].price = 4000;
        items[8].forSale = true;
        items[9].price = 4000;
        items[9].forSale = true;
        items[10].price = 4000;
        items[10].forSale = true;
        items[11].price = 4000;
        items[11].forSale = true;
        
    }
    
    function putItemUpForSale(uint index, uint price) public {
        Item storage item = items[index];
        
        require(msg.sender == item.owner && price > 0);
        
        item.forSale = true;
        item.price = price;
        emit ItemAvailabilityChanged(index, price, true);
    }
    
    function takeOffMarket(uint index) public {
        Item storage item = items[index];
        
        require(msg.sender == item.owner);
        
        item.forSale = false;
        emit ItemAvailabilityChanged(index, item.price, false);
    }
    
    function getItems() public view returns(address[] memory , bool[]memory , uint[] memory) {
        address[] memory addrs = new address[](12);
        bool[] memory available = new bool[](12);
        uint[] memory price = new uint[](12);
        
        for (uint i = 0; i < 12; i++) {
            Item storage item = items[i];
            addrs[i] = item.owner;
            price[i] = item.price;
            available[i] = item.forSale;
        }
        
        return (addrs, available, price);
    }
    
    function buyItem(uint index) public payable {
        Item storage item = items[index];
        
        require(msg.sender != item.owner && item.forSale && msg.value >= item.price);
        
        if(item.owner == 0x0000000000000000000000000000000000000000) {
            balances[owner] += msg.value;
        }else {
            balances[item.owner] += msg.value;
        }
        
        item.owner = msg.sender;
        item.forSale = false;
        
        emit ItemOwnerChanged(index);
    }
    
    function withdrawFunds() public {
        address payable payee = msg.sender;
          uint payment = balances[payee];
    
          require(payment > 0);
    
          balances[payee] = 0;
          require(payee.send(payment));
    }
    
    
    function destroy() payable public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}