/**
 *Submitted for verification at Etherscan.io on 2024-03-05
*/

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface ERC721 {
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function approve(address to, uint256 tokenId) external;
}

contract MarketPlace {
    event CreateOrder(address indexed contractAddress, uint256 indexed tokenId, uint256 indexed price);
    event Purchase(address indexed contractAddress, uint256 indexed tokenId, address indexed purchaser);
    struct UserPrice {
        address payable ownerAddress;
        uint256 price;
    }
    mapping(address => mapping(uint256 => UserPrice)) public nftOrder;

    function createOrder(
        address _contractAddress,
        uint256 _tokenId,
        uint256 _price,
        address _owner
    ) public {
        UserPrice memory userPrice = UserPrice(payable(_owner), _price);
        nftOrder[_contractAddress][_tokenId] = userPrice;
        emit CreateOrder(_contractAddress, _tokenId, _price);
    }


    function purchase(address _contractAddress, uint256 _tokenId) public payable {
        uint256 price = nftOrder[ _contractAddress][_tokenId].price;
        require(msg.value == price, "not enough ether to cover nft price.");
        ERC721 _nft = ERC721( _contractAddress);
        _nft.transferFrom(
            nftOrder[ _contractAddress][_tokenId].ownerAddress,
            msg.sender,
            _tokenId
        );
        delete nftOrder[ _contractAddress][_tokenId];
        nftOrder[ _contractAddress][_tokenId].ownerAddress.transfer(price);
        emit Purchase( _contractAddress, _tokenId, msg.sender);
    }
}