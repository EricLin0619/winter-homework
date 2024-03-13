// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";

contract MyToken is ERC721, VRFConsumerBaseV2 {
    

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmdYeDpkVZedk1mkGodjNmF35UNxwafhFLVvsHrWgJoz6A/beanz_metadata/";
    }

    VRFCoordinatorV2Interface immutable COORDINATOR;

    // Your subscription ID.
    uint64 immutable s_subscriptionId;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 immutable s_keyHash;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 constant CALLBACK_GAS_LIMIT = 100000;

    // The default is 3, but you can set this higher.
    uint16 constant REQUEST_CONFIRMATIONS = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 constant NUM_WORDS = 1;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;
    mapping (uint256 => address) requestidToAddress;

    event ReturnedRandomness(uint256[] randomWords);
    
    constructor(
        uint64 subscriptionId,
        address vrfCoordinator,
        bytes32 keyHash
    ) 
    ERC721("MyBean", "Bean") 
    VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_keyHash = keyHash;
        s_owner = msg.sender;
        s_subscriptionId = subscriptionId;
    }

    /**
     * @notice Constructor inherits VRFConsumerBaseV2
     *
     * @param subscriptionId - the subscription ID that this contract uses for funding requests
     * @param vrfCoordinator - coordinator, check https://docs.chain.link/docs/vrf-contracts/#configurations
     * @param keyHash - the gas lane to use, which specifies the maximum gas price to bump to
     */

    /**
     * @notice Requests randomness
     * Assumes the subscription is funded sufficiently; "Words" refers to unit of data in Computer Science
     */
    function requestRandomWords() public {
        // Will revert if subscription is not set and funded.
        uint256 requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            REQUEST_CONFIRMATIONS,
            CALLBACK_GAS_LIMIT,
            NUM_WORDS
        );
        s_requestId = requestId;
        requestidToAddress[requestId] = msg.sender;
    }

    /**
     * @notice Callback function used by VRF Coordinator
     *
     * @param _requestId - id of the request
     * @param randomWords - array of random results from VRF Coordinator
     */
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
        _mint(requestidToAddress[_requestId], randomWords[0] % 19951 );
        emit ReturnedRandomness(randomWords);
    }

    function draw() public {
        requestRandomWords();
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }
}
