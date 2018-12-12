<p align="center">
<a href="https://github.com/philosss/TrustIt."><img src="https://github.com/philosss/TrustIt./blob/master/Graphics/exports/full-logo-b-bg-2x.png?raw=true" width="500px"></a>
</p>

>We use Blockchain technology to add trust to peer-to-peer marketplaces, e.g. Craigslist, ebay or Milanuncios.

Even though buying second-hand products at online marketplaces is convenient and economic, it cannot be guaranteed that the seller who claims to be the owner of the product is trustworthy and that the product really exists and has not been stolen beforehand.

We solve this issue by storing the products a person owns in our Hyperledger Fabric blockchain. We further collaborate with online marketplaces to display in the ads if the seller can be confirmed as the legitimate owner using the entries in our blockchain or not.
Moreover, we store the purchase dates of new products so that users do not have to keep purchase receipts anymore for potential warranty claims.

Authors: [@boyraaijmakers](https://github.com/boyraaijmakers) [@mkpaszkiewicz](https://github.com/mkpaszkiewicz)  [@philosss](https://github.com/philosss)  [@jackiefeen](https://github.com/jackiefeen)


Universidad Politécnica de Madrid, Spain 🌞


TADHack 2018 💻

## Commands
- `fabric/fabric-dev-servers/startFabric.sh` starts Fabric
- `fabric/fabric-dev-servers/stopFabric.sh` stops Fabric
- `fabric-dev-servers/teardownFabric.sh` terminate Fabric development

## Installation of the business card for version `0.0.3-deploy.0`
Browse to the main git directory with your terminal
```
fabric/fabric-dev-servers/startFabric.sh
cd fabric/composer/trustit
# 1. Install the business network
composer network install --card PeerAdmin@hlfv1 --archiveFile trustit@0.0.3-deploy.0.bna
# 2. Start the business network
composer network start --networkName trustit --networkVersion 0.0.3-deploy.0 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
# 3. Import the network administration identity
composer card import --file networkadmin.card
# 4. Check installation
composer network ping --card admin@trustit
```


## Palette of Colors
- Background gradient from ![#028090](https://placehold.it/15/028090/000000?text=+) `#028090` to ![#05668D](https://placehold.it/15/05668D/000000?text=+) `#05668D`, angle `270°`
- Presentation logo ![#DEDEDE](https://placehold.it/15/DEDEDE/000000?text=+) `#DEDEDE`
- Logo ![#F8F5F5](https://placehold.it/15/F8F5F5/000000?text=+) `#F8F5F5`


## Credits
- [Font Lobster](https://www.fontsquirrel.com/fonts/lobster)
- [Font Amperzand](https://www.dafont.com/amperzand.font)
- [Font Avenir Next](https://www.fonts.com/font/linotype/avenir-next)


<p align="center">
<a href="http://upm.es/"><img src="https://github.com/philosss/TrustIt./blob/master/Graphics/images/upm.png" width="300px"></a>
</p>
