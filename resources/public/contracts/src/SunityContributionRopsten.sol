pragma solidity ^0.4.11;

/*
    Copyright 2017, Matus Lestan (sunity)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
    Copyright 2017, Rodrigo Arigita (Sunity)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Forked and modified to fit Sunity requirements

    This version is for Ropsten Network with short vesting cliff and period
    4 days vesting with 1 day cliff to test. Allocation is the same as the 
    full mainnet Contribution contract.

    1 founder, 4 team members.
*/

import "./SafeMath.sol";
import "./SunityHealthToken.sol";
import "./Ownable.sol";
import "./Pausable.sol";
import "./HasNoTokens.sol";
import "./minime_interface/TokenController.sol";

contract SunityContribution is Pausable, HasNoTokens, TokenController {
    using SafeMath for uint;

    SunityHealthToken public sunityHealthToken;
    address public multisigWallet;                                      // Wallet that receives all sale funds
    address public founder1;                                            // Wallet of early sponsor
    address[] public team;                                              // 4 Wallets of advisors

    uint public constant FOUNDER1_STAKE = 120000000 ether;              // 120M SUN
    uint public constant TEAM_STAKE = 80000000 ether;                   // 80M   SUN
    uint public constant CONTRIB_PERIOD1_STAKE = 600000000 ether;       // 600M SUN
    uint public constant CONTRIB_PERIOD2_STAKE = 150000000 ether;       // 150M SUN
    uint public constant CONTRIB_PERIOD3_STAKE = 50000000 ether;        // 50M  SUN

    uint public minContribAmount = 0.1 ether;                           // 0.1 ether
    uint public maxGasPrice = 50000000000;                              // 50 GWei

    uint public constant TEAM_VESTING_CLIFF = 1 days;                 // 6 months vesting cliff for founders and advisors, except community advisors
    uint public constant TEAM_VESTING_PERIOD = 4 days;                // 2 years vesting period for founders and advisors, except community advisors

    // Period Index global
    uint private periodIndex;

    bool public tokenTransfersEnabled = false;                          // SUN token transfers will be enabled manually
                                                                        // after first contribution period
                                                                        // Can't be disabled back
    struct Contributor {
        uint amount;                        // Amount of ETH contributed by an address in given contribution period
        bool isCompensated;                 // Whether this contributor received SUN token for ETH contribution
        uint amountCompensated;             // Amount of SUN received. Not really needed to store,
                                            // but stored for accounting and security purposes
    }

    uint public softCapAmount;                                 // Soft cap of contribution period in wei
    uint public afterSoftCapDuration;                          // Number of seconds to the end of sale from the moment of reaching soft cap (unless reaching hardcap)
    uint public hardCapAmount;                                 // When reached this amount of wei, the contribution will end instantly
    uint public startTime;                                     // Start time of contribution period in UNIX time
    uint public endTime;                                       // End time of contribution period in UNIX time
    bool public isEnabled;                                     // If contribution period was enabled by multisignature
    bool public softCapReached;                                // If soft cap was reached
    bool public hardCapReached;                                // If hard cap was reached
    uint public totalContributed;                              // Total amount of ETH contributed in given period
    address[] public contributorsKeys;                         // Addresses of all contributors in given contribution period
    mapping (address => Contributor) public contributors;

    event onContribution(uint totalContributed, address indexed contributor, uint amount,
        uint contributorsCount);
    event onSoftCapReached(uint endTime);
    event onHardCapReached(uint endTime);
    event onCompensated(address indexed contributor, uint amount);

    modifier onlyMultisig() {
        require(multisigWallet == msg.sender);
        _;
    }

    function setPeriodIndex(uint _periodIndex) private onlyOwner {
        periodIndex = _periodIndex;
    }

    function getPeriodIndex() returns (uint){
        return periodIndex;
    }

    function SunityContribution(
        address _multisigWallet, 
        address _founder1,
        address[] _team
    ) {
        require(_team.length == 4);
        multisigWallet = _multisigWallet;
        founder1 = _founder1;
        team = _team;
    }
    
    // @notice Returns true if contribution period is currently running
    function isContribPeriodRunning() constant returns (bool) {
        return !hardCapReached &&
               isEnabled &&
               startTime <= now &&
               endTime > now;
    }

    function contribute()
        payable
        stopInEmergency
    {
        contributeWithAddress(msg.sender);
    }

    // @notice Function to participate in contribution period
    //  Amounts from the same address should be added up
    //  If soft or hard cap is reached, end time should be modified
    //  Funds should be transferred into multisig wallet
    // @param contributor Address that will receive SUN token
    function contributeWithAddress(address contributor)
        payable
        stopInEmergency
    {
        require(tx.gasprice <= maxGasPrice);
        require(msg.value >= minContribAmount);
        require(isContribPeriodRunning());

        uint contribValue = msg.value;
        uint excessContribValue = 0;

        uint oldTotalContributed = totalContributed;

        totalContributed = oldTotalContributed.add(contribValue);

        uint newTotalContributed = totalContributed;

        // Soft cap was reached
        if (newTotalContributed >= softCapAmount &&
            oldTotalContributed < softCapAmount)
        {
            softCapReached = true;
            endTime = afterSoftCapDuration.add(now);
            onSoftCapReached(endTime);
        }
        // Hard cap was reached
        if (newTotalContributed >= hardCapAmount &&
            oldTotalContributed < hardCapAmount)
        {
            hardCapReached = true;
            endTime = now;
            onHardCapReached(endTime);

            // Everything above hard cap will be sent back to contributor
            excessContribValue = newTotalContributed.sub(hardCapAmount);
            contribValue = contribValue.sub(excessContribValue);

            totalContributed = hardCapAmount;
        }
        // If new contributor add it to the keys array
        if (contributors[contributor].amount == 0) {
            contributorsKeys.push(contributor);
        }
        // Add contributor to the struct mapping and add the value amount
        contributors[contributor].amount = contributors[contributor].amount.add(contribValue);

        // Transfer value to multisig owner
        multisigWallet.transfer(contribValue);
        if (excessContribValue > 0) {
            msg.sender.transfer(excessContribValue);
        }
        onContribution(newTotalContributed, contributor, contribValue, contributorsKeys.length);
    }

    // @notice This method is called by owner after contribution period ends, to distribute SUN in proportional manner
    //  Each contributor should receive SUN just once even if this method is called multiple times
    //  In case of many contributors must be able to compensate contributors in paginational way, otherwise might
    //  run out of gas if wanted to compensate all on one method call. Therefore parameters offset and limit
    // @param offset Number of first contributors to skip.
    // @param limit Max number of contributors compensated on this call
    function compensateContributors(uint offset, uint limit)
        onlyOwner
    {
        require(isEnabled);
        require(endTime < now);

        uint i = offset;
        uint compensatedCount = 0;
        uint contributorsCount = contributorsKeys.length;
        uint ratio = 0;
        uint period = getPeriodIndex();

        if(period == 0){
            ratio = CONTRIB_PERIOD1_STAKE
                .mul(1000000000000000000)
                .div(totalContributed);
        } else if(period == 1){
            ratio = CONTRIB_PERIOD2_STAKE
                .mul(1000000000000000000)
                .div(totalContributed);
        } else {
            ratio = CONTRIB_PERIOD3_STAKE
                .mul(1000000000000000000)
                .div(totalContributed);
        }

        while (i < contributorsCount && compensatedCount < limit) {
            address contributorAddress = contributorsKeys[i];
            if (!contributors[contributorAddress].isCompensated) {
                uint amountContributed = contributors[contributorAddress].amount;
                contributors[contributorAddress].isCompensated = true;

                contributors[contributorAddress].amountCompensated =
                    amountContributed.mul(ratio).div(1000000000000000000);

                sunityHealthToken.transfer(contributorAddress, contributors[contributorAddress].amountCompensated);
                onCompensated(contributorAddress, contributors[contributorAddress].amountCompensated);

                compensatedCount++;
            }
            i++;
        }
    }

    // @notice Method for setting up contribution period
    //  Only owner should be able to execute
    //  Setting first contribution period sets up vesting for founders & advisors
    //  Contribution period should still not be enabled after calling this method
    // @param periodIndex Index of contribution period (0-2)
    // @param softCapAmount Soft Cap in wei
    // @param afterSoftCapDuration Number of seconds till the end of sale in the moment of reaching soft cap (unless reaching hard cap)
    // @param hardCapAmount Hard Cap in wei
    // @param startTime Contribution start time in UNIX time
    // @param endTime Contribution end time in UNIX time
    function setContribPeriod(
        uint _periodIndex,
        uint _softCapAmount,
        uint _afterSoftCapDuration,
        uint _hardCapAmount,
        uint _startTime,
        uint _endTime
    )
        onlyOwner
    {
        require(_periodIndex < 3);
        require(_softCapAmount > 0);
        require(_hardCapAmount > _softCapAmount);
        require(_afterSoftCapDuration > 0);
        require(_startTime > now);
        require(_endTime > _startTime);
        require(!isEnabled);

        setPeriodIndex(_periodIndex);
        softCapAmount = _softCapAmount;
        afterSoftCapDuration = _afterSoftCapDuration;
        hardCapAmount = _hardCapAmount;
        startTime = _startTime;
        endTime = _endTime;

        sunityHealthToken.revokeAllTokenGrants(founder1);

        for (uint j = 0; j < team.length; j++) {
            sunityHealthToken.revokeAllTokenGrants(team[j]);
        }

        uint64 vestingDate = uint64(startTime.add(TEAM_VESTING_PERIOD));
        uint64 cliffDate = uint64(startTime.add(TEAM_VESTING_CLIFF));
        uint64 startDate = uint64(startTime);

        sunityHealthToken.grantVestedTokens(founder1, FOUNDER1_STAKE, startDate, cliffDate, vestingDate, true, false);
        
        for (j = 0; j < team.length; j++) {
            sunityHealthToken.grantVestedTokens(team[j], TEAM_STAKE.div(team.length), startDate, cliffDate, vestingDate, true, false);
        }
        // Community advisors stake has no vesting, but we set it up this way, so we can revoke it in case of
        // re-setting up contribution period
    }

    // @notice Enables contribution period
    //  Must be executed by multisignature
    function enableContribPeriod()
        onlyMultisig
    {
        require(startTime > now);
        isEnabled = true;
    }

    // @notice Sets new min. contribution amount
    //  Only owner can execute
    //  Cannot be executed while contribution period is running
    // @param _minContribAmount new min. amount
    function setMinContribAmount(uint _minContribAmount)
        onlyOwner
    {
        require(_minContribAmount > 0);
        require(startTime > now);
        minContribAmount = _minContribAmount;
    }

    // @notice Sets new max gas price for contribution
    //  Only owner can execute
    //  Cannot be executed while contribution period is running
    // @param _minContribAmount new min. amount
    function setMaxGasPrice(uint _maxGasPrice)
        onlyOwner
    {
        require(_maxGasPrice > 0);
        require(startTime > now);
        maxGasPrice = _maxGasPrice;
    }

    // @notice Sets SunityHealthToken contract
    //  Generates all SUN tokens and assigns them to this contract
    //  If token contract has already generated tokens, do not generate again
    // @param _sunityHealthToken SunityHealthToken address
    function setSunityHealthToken(address _sunityHealthToken)
        onlyOwner
    {
        require(_sunityHealthToken != 0x0);
        require(!isEnabled);
        sunityHealthToken = SunityHealthToken(_sunityHealthToken);
        if (sunityHealthToken.totalSupply() == 0) {
            sunityHealthToken.generateTokens(this, 
                FOUNDER1_STAKE.add(TEAM_STAKE).add(CONTRIB_PERIOD1_STAKE)
            );
            sunityHealthToken.generateTokens(multisigWallet, 
                CONTRIB_PERIOD2_STAKE.add(CONTRIB_PERIOD3_STAKE)
            );
        }
    }

    // @notice Enables transfers of SUN
    //  Will be executed after first contribution period by owner
    function enableSunityHealthTokenTransfers()
        onlyOwner
    {
        require(endTime < now);
        tokenTransfersEnabled = true;
    }

    // @notice Method to claim tokens accidentally sent to a SUN contract
    //  Only multisig wallet can execute
    // @param _token Address of claimed ERC20 Token
    function claimTokensFromTokenSunityHealthToken(address _token)
        onlyMultisig
    {
        sunityHealthToken.claimTokens(_token, multisigWallet);
    }

    // @notice Kill method should not really be needed, but just in case
    function kill(address _to) onlyMultisig external {
        suicide(_to);
    }

    function()
        payable
        stopInEmergency
    {
        contributeWithAddress(msg.sender);
    }

    // MiniMe Controller default settings for allowing token transfers.
    function proxyPayment(address _owner) payable public returns (bool) {
        throw;
    }

    // Before transfers are enabled for everyone, only this contract is allowed to distribute SUN
    function onTransfer(address _from, address _to, uint _amount) public returns (bool) {
        return tokenTransfersEnabled || _from == address(this) || _to == address(this);
    }

    function onApprove(address _owner, address _spender, uint _amount) public returns (bool) {
        return tokenTransfersEnabled;
    }

    function isTokenSaleToken(address tokenAddr) returns(bool) {
        return sunityHealthToken == tokenAddr;
    }

    /*
     Following constant methods are used for tests and contribution web app
     They don't impact logic of contribution contract, therefor DOES NOT NEED TO BE AUDITED
     */

    // Used by contribution front-end to obtain contribution period properties
    function getContribPeriod()
        constant
        returns (bool[3] boolValues, uint[8] uintValues)
    {
        uint ratio = 0;
        uint period = getPeriodIndex();
        
        if(period == 0){
            ratio = CONTRIB_PERIOD1_STAKE;
        } else if(period == 1){
            ratio = CONTRIB_PERIOD2_STAKE;
        } else {
            ratio = CONTRIB_PERIOD3_STAKE;
        }
        boolValues[0] = isEnabled;
        boolValues[1] = softCapReached;
        boolValues[2] = hardCapReached;

        uintValues[0] = softCapAmount;
        uintValues[1] = afterSoftCapDuration;
        uintValues[2] = hardCapAmount;
        uintValues[3] = startTime;
        uintValues[4] = endTime;
        uintValues[5] = totalContributed;
        uintValues[6] = contributorsKeys.length;
        uintValues[7] = ratio;

        return (boolValues, uintValues);
    }

    // Used by contribution front-end to obtain contribution contract properties
    function getConfiguration()
        constant
        returns (bool, address, address, address[] _team, bool, uint)
    {
        _team = new address[](team.length);
        for (uint i = 0; i < team.length; i++) {
            _team[i] = team[i];
        }
        return (stopped, multisigWallet, founder1, _team, tokenTransfersEnabled,
            maxGasPrice);
    }

    // Used by contribution front-end to obtain contributor's properties
    function getContributor(address contributorAddress)
        constant
        returns(uint, bool, uint)
    {
        Contributor contributor = contributors[contributorAddress];
        return (contributor.amount, contributor.isCompensated, contributor.amountCompensated);
    }

    // Function to verify if all contributors were compensated
    function getUncompensatedContributors(uint offset, uint limit)
        constant
        returns (uint[] contributorIndexes)
    {
        uint contributorsCount = contributorsKeys.length;

        if (limit == 0) {
            limit = contributorsCount;
        }

        uint i = offset;
        uint resultsCount = 0;
        uint[] memory _contributorIndexes = new uint[](limit);

        while (i < contributorsCount && resultsCount < limit) {
            if (!contributors[contributorsKeys[i]].isCompensated) {
                _contributorIndexes[resultsCount] = i;
                resultsCount++;
            }
            i++;
        }

        contributorIndexes = new uint[](resultsCount);
        for (i = 0; i < resultsCount; i++) {
            contributorIndexes[i] = _contributorIndexes[i];
        }
        return contributorIndexes;
    }

    function getNow()
        constant
        returns(uint)
    {
        return now;
    }
}
