require('./models/Registration');
require('./models/Block');
require('./models/Info')
const ethers  = require('ethers');
var provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");

require('dotenv').config();
const mongoose = require('mongoose');
const information = mongoose.model('info')
const Transaction = mongoose.model('Transaction');
const Block = mongoose.model('Block');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

async function main() {
  console.log("Starting Index...");
  var latestIndexed = 0;
  var txCounter = 0;
  var hasData = false;
  information.findById('61929f3efc232d63cd9dcb6b').then((data) => {
    if (data == null) {
      // Creating new...
      var newInfo = new information({
        _id: '61929f3efc232d63cd9dcb6b',
        bestBlockHeight: 0,
        txCounter: 0
      });
      newInfo.save();
    } else {
      latestIndexed = data.bestBlockHeight;
      txCounter = data.txCount;
      hasData = true;
      console.log("Previous data found in the explorer, indexing from " + latestIndexed + ".");
    }
  })

  latestBlock = await provider.getBlock("latest");
  latestHeight = latestBlock.number;

  if (latestIndexed == latestHeight) {
    console.log("No new blocks found, exiting.");
    process.exit(0);
  }

  for (var i = Boolean(latestIndexed == 0) ? 0 : latestIndexed + 1; i <= latestHeight; i++) {
    block = await provider.getBlockWithTransactions(i);
    txHashList = [];
    for (var j = 0; j < block.transactions.length; j++) {
      var tx = block.transactions[j];
      await tx;
      console.log("Indexing transaction " + tx.hash)
      var Tx = new Transaction({
        hash:             tx.hash,
        nonce:            tx.nonce,
        blockHash:        tx.blockHash,
        blockNumber:      tx.blockNumber,
        transactionIndex: tx.transactionIndex,
        from:             tx.from,
        to:               tx.to,
        value:            tx.value,
        gasPrice:         tx.gasPrice,
        gas:              tx.gasLimit,
        input:            tx.data,
        v:                tx.v,
        standardV:        tx.standardV,
        r:                tx.r,
        chainid:          tx.chainId
      });


      txHashList.push(tx.hash);
      await Tx.save()
      ++txCounter;
    }

    var dbBlock = new Block({
      number:           block.number,
      hash:             block.hash,
      parentHash:       block.parentHash,
      nonce:            block.nonce,
      sha3Uncles:       block.sha3Uncles,
      logsBloom:        block.logsBloom,
      transactionsRoot: block.transactionsRoot,
      stateRoot:        block.stateRoot,
      miner:            block.miner,
      difficulty:       block.difficulty,
      totalDifficulty:  block.totalDifficulty,
      extraData:        block.extraData,
      size:             block.size,
      gasLimit:         block.gasLimit,
      gasUsed:          block.gasUsed,
      timestamp:        block.timestamp,
      transactions:     txHashList
    });
    await dbBlock.save()
    information.findOneAndUpdate({ _id: '61929f3efc232d63cd9dcb6b'}).then((data) => 
    {
      data.bestBlockHeight = latestBlock.number;
      data.txCount = txCounter;
      data.save();
    });
  }

}

main();