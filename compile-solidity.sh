#!/usr/bin/env bash
cd resources/public/contracts/src


solc --overwrite --optimize --bin --abi SunityHealthToken.sol -o ../build/
solc --overwrite --optimize --bin --abi MultisigWallet.sol -o ../build/
solc --overwrite --optimize --bin --abi SunityContributionRopsten.sol -o ../build/

cd ../build
wc -c SunityContribution.bin | awk '{print "SunityContribution: " $1}'
wc -c MiniMeTokenFactory.bin | awk '{print "MiniMeTokenFactory: " $1}'
wc -c MultisigWallet.bin | awk '{print "MultisigWallet: " $1}'

