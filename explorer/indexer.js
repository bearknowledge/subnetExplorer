require('./models/registration');
require('./models/block');
require('./models/info')
const ethers  = require('ethers');
var provider = new ethers.providers.JsonRpcProvider("http://localhost:8080");

require('dotenv').config();
const mongoose = require('mongoose');
const Information = mongoose.model('Info')
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

async function loop() {
  setTimeout(async () => {
    await main()
   }, 3000)
   
}
 

async function main() {
  console.log("Starting Index...");
  let latestIndexed = 0;
  let txCounter = 0;
  let hasData = false;
  await Information.findById('61929f3efc232d63cd9dcb6b').then((data) => {
    
    if (data == null) {
      // Creating new...
      var newInfo = new Information({
        _id: '61929f3efc232d63cd9dcb6b',
        bestBlockHeight: 0,
        txCount: 0,
        latestIndexed: 0
      });
      newInfo.save();
    } else {
      latestIndexed = data.bestBlockHeight;
      console.log(data.bestBlockHeight)
      txCount = data.txCount;
      hasData = true;
      console.log("Previous data found in the explorer, indexing from " + latestIndexed + ".");
    }
  })

  latestBlock = await provider.getBlock('latest');
  console.log(latestBlock.number, latestIndexed)
  latestHeight = latestBlock.number;

  if (latestIndexed === latestHeight) {
    console.log("No new blocks found, exiting.");
  } else {
  for (let i = Boolean(latestIndexed == 0) ? 0 : latestIndexed + 1; i <= latestHeight; i++) {
    var block = await provider.getBlockWithTransactions(i);
    txHashList = [];
    for (var j = 0; j < block.transactions.length; j++) {
      var tx = block.transactions[j];
      var time = block.timestamp
      console.log("Indexing transaction " + tx.hash)
      var Tx = new Transaction({
        hash:             tx.hash,
        nonce:            tx.nonce,
        blockHash:        tx.blockHash,
        blockNumber:      tx.blockNumber,
        timestamp:        time,
        transactionIndex: tx.transactionIndex,
        from:             tx.from,
        to:               tx.to,
        value:            tx.value,
        gasPrice:         tx.gasPrice,
        gas:              tx.gasLimit,
        input:            tx.data,
        v:                tx.v,
        s:                tx.s,
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
    await Information.findOneAndUpdate({ _id: '61929f3efc232d63cd9dcb6b'}).then((data) => 
    {
      data.bestBlockHeight = latestBlock.number;
      data.txCount = txCounter;
      data.save();
    });
  }
}
loop()
}

main()