/**
 * Track the trade of a commodity from one trader to another
 * @param {org.upm.trustit.network.Trade} trade - the trade to be processed
 * @transaction
 */
async function tradeCommodity(trade) {
	trade.good.owner = trade.newOwner;
	let assetRegistry = await getAssetRegistry('org.upm.trustit.network.Good');
	await assetRegistry.update(trade.good);
}
