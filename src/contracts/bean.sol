// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts@5.0.1/token/ERC721/ERC721.sol";

contract MyBean is ERC721 {
    constructor()
        ERC721("MyBean", "BEAN")
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmdYeDpkVZedk1mkGodjNmF35UNxwafhFLVvsHrWgJoz6A/beanz_metadata/";
    }
}
