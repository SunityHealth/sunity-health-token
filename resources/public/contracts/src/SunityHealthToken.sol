pragma solidity ^0.4.11;

import "./MiniMeToken.sol";
import "./VestedToken.sol";

contract SunityHealthToken is MiniMeToken, VestedToken {
    function SunityHealthToken(address _controller, address _tokenFactory)
        MiniMeToken(
            _tokenFactory,
            0x0,                        // no parent token
            0,                          // no snapshot block number from parent
            "Sunity Health Token",     // Token name
            18,                          // Decimals
            "SUN",                      // Symbol
            true                        // Enable transfers
            )
    {
        changeController(_controller);
        changeGrantsController(_controller);
    }
}
