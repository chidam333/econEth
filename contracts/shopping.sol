// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";

// contract SastraShop {
// 	uint256 totalProducts;
//     constructor() {
//         console.log("Sastra shop has been setup");
//     }
// 	function register() public{
// 		totalProducts+=1;
// 		console.log(msg.sender,"has listed has product");
// 	}
// 	function getTotalProducts() public view returns(uint256){
// 		console.log(totalProducts," - total products");
// 		return totalProducts;
// 	}
// }
contract SastraShop {
    struct Product{
        // generally structure variables should not be public...
        uint  productID;
        address payable seller; // the one who is receiving amounts should be 
        // Keyword payable in the function is needed to make the function able to receive ether. Sending ether is possible from any function, as long as the address sending is payable.
        address buyer; // here this is non payable bcoz 
        uint rate;
        string name;
        string desc;
        bool deleivered;
    }

    
    Product[] public products;
    event registered(address seller, uint rate, string name, uint productID);
    event bought(uint productID, address buyer);
    event deleivery(uint productID);
    uint counter =1;
    function register(  uint _rate, string memory _name, string memory _desc) public{
        // the one who is calling this function is a sender so no need to have sender as an argument
        require(_rate>0,"enter valid price");
        Product memory tempProduct;
        tempProduct.productID = counter;
        tempProduct.seller = payable(msg.sender);
        tempProduct.rate = _rate*10**18;
        tempProduct.desc = _desc;
        tempProduct.name = _name;
        counter++;
        products.push(tempProduct);
        //  Push: Push is used when a new element is to be added in a dynamic array. The new element is always added at the last position of the array.
        emit registered(tempProduct.seller, tempProduct.rate, tempProduct.name,tempProduct.productID );
    }
// this buy function is used to intialize buyer
    function buy(uint _productID) payable public{
        require(products[_productID-1].rate == msg.value, "Enter the actual price");
        // require(products[_productID-1].rate == msg.value, msg.value);

        require(products[_productID-1].seller != msg.sender,"Seller cant buy");
        products[_productID-1].buyer = msg.sender;
        emit bought( _productID , msg.sender);
        
        
    }

    function deleivered(uint _productID) public{
        require(products[_productID-1].buyer == msg.sender, "only buyers can access");
        products[_productID-1].deleivered = true;
        products[_productID-1].seller.transfer(products[_productID-1].rate);

        emit deleivery(_productID);
    }


   
}