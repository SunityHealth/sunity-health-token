# SUNITY token sale flow (SUN token, Ropsten tests)


<p align="center">
<img src="resources/public/images/logo_sunity_round_thick.png" width="30%"/>
</p>

### Instantiation:

#### 1. Deploy contribution contract [SunityContributionRopsten.sol](/resources/public/contracts/src/SunityContributionRopsten.sol).
Sunity contribution contract will be deployed at least 5 days prior to the beginning of the contribution period.

Parameters:

- _Owners_: Addresses allowed to confirm contract transactions that require multiple signatures. Such as enabling or cancelling contribution period.

- _Required_: Number of signatures required to run multi-signature transaction.

- _Wallet_: Multi-signature wallet holding raised funds.

- _Founder_: Address of Rodrigo Arigita.

- _Team_: 4 addresses of team members consisting of: Javier Gómez, Yael H. Oaknin, Mike Pérez and Carlos Abanses, who contributed to the project with their time, experience and illusion.

#### 2. Deploy MiniMeTokenFactory [MiniMeToken.sol](/resources/public/contracts/src/MiniMeToken.sol)

MiniMeToken contract must be deployed, so SUN Token becomes clonable.

No parameters.

#### 3. Deploy token contract [SunityHealthToken.sol](/resources/public/contracts/src/SunityHealthToken.sol)

Parameters:

- _Controller_: Address of SunityContribution contract. Its address will be the only one allowed to generate predetermined amount of SUN tokens. SunityContribution doesn't implement function to transfer controller ownership, therefore additional SUN tokens can never be generated.

- _TokenFactory_: Address of earlier deployed MiniMeToken contract.
<br>
#### 4. Set SUN Token address `SunityContribution.setSunityHealthToken()`
This method sets address of SunityHealthToken in contribution contract. At this moment, exactly 1,000,000,000 SUN tokens are generated and assigned to contribution contract. 

Parameters:

- _sunityHealthToken_: Address of earlier deployed SunityHealthToken 


<br>
#### 5. Set contribution period parameters `SunityContribution.setContribPeriod()`
This method sets up contribution period parameters and also vesting for founder and team members. Note, after setting up, contribution period is still not valid. To be valid it must be confirmed by multiple signatures (see following step).
  
Parameters:

- _Contribution Period Index_: **0** Index number of contribution period to be set up (0, 1 or 2).

- _Soft Cap Amount_: **10 Mil USD in ETH** Soft Cap for a contribution period.

- _After Soft Cap Duration_: **48 hours** Time to the end of contribution from the moment of reaching soft cap (unless reaching Hard Cap).

- _Hard Cap Amount_: **50 Mil USD in ETH** When reached this amount, the contribution period ends instantly.

- _Start Time_: **July 18, 3:00pm UTC** Beginning of a contribution period, in Unix timestamp format.

- _End Time_: **August 1, 3:00pm UTC** End of a contribution period, unless Soft or Hard cap is reached, in Unix timestamp format.
<br>
#### 6. Enable contribution period `SunityContribution.enableContribPeriod()`
This method will be executed only with multiple signatures 2/3 of our team and trusted individuals from Ethereum community (listed in our whitepaper). It will make a contribution period confirmed with current parameters. 

No parameter.

<br>
***
<br>

### Contribution:
<br>
#### 7. Buy SUN tokens `SunityContribution.contribute()` or `SunityContribution.fallback()` 
This method will save your address and amount of your contribution. If you contribute multiple times from the same address, amounts will be added up. Note, since we'll allocate SUN proportionally to the contributed amount, SUN
tokens will not be send to contributors immediately. Distribution will happen shortly after sale ends. Contributed Ether is transferred to our multi-signature wallet after each contribution. Note, **maximum gas price** that can be
used for contribution is **60Gwei**, otherwise transaction will fail!

No parameters
<br>
#### 8. Emergency stop `SunityContribution.emergencyStop()`
In case of emergency, district0x is able to pause contribution period
<br>
***
<br>
### After Contribution:
<br>
#### 9. Send SUN tokens to contributors `SunityContribution.compensateContributors()`
This method is called by owner after contribution period ends to distribute SUN tokens in proportional manner. In case of many contributors will need to be executed multiple times, due to gas limit restrictions.

Parameters:

- _offset_: Number of first contributors to skip.

- _limit_: Maximum number of contributors compensated with this transaction. 

Offset and limit parameters are used to "paging" through contributors.
<br>
#### 10. Enable SUN transfers `SunityContribution.enableSunityHealthTokenTransfers()`
This method is called by owner after SUN tokens were distributed to all contributors. DNT transfers should be enabled in matter of hours after end of contribution period.

We'll enable them as soon as we're sure that distribution of SUN went without bugs.

No Parameters.

***








