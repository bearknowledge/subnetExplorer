const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  hash: { type: String, required: true, trim: false },
  nonce: { type: Number, required: true, trim: false },
  blockHash: { type: String, required: true, trim: false },
  blockNumber: { type: Number, required: true, trim: false },
  timestamp: { type: Number, required: true, trim: false },
  transactionIndex: { type: Number, required: true, trim: false },
  from: { type: String, required: true, trim: false },
  to: { type: String, required: true, trim: false },
  value: { type: Number, required: true, trim: false },
  gasPrice: { type: Number, required: true, trim: false },
  gas: { type: Number, required: true, trim: false },
  input: { type: String, required: true, trim: false },
  v: { type: Number, required: true, trim: false },
  s: { type: Number, required: false, trim: false },
  standardV: { type: Number, required: false, trim: false },
  r: { type: Number, required: true, trim: false },
  chainid: { type: Number, required: true, trim: false },
})

const blockSchema = new mongoose.Schema({
  number: { type: Number, required: true, trim: false },
  hash: { type: String, required: true, trim: false },
  parentHash: { type: String, required: true, trim: false },
  nonce: { type: Number, required: false, trim: false },
  sha3Uncles: { type: String, required: false, trim: false },
  logsBloom: { type: String, required: false, trim: false },
  transactionsRoot: { type: String, required: false, trim: false },
  stateRoot: { type: String, required: false, trim: false },
  miner: { type: String, required: false, trim: false },
  difficulty: { type: Number, required: false, trim: false },
  totalDifficulty: { type: Number, required: false, trim: false },
  extraData: { type: String, required: false, trim: false },
  size: { type: Number, required: false, trim: false },
  gasLimit: { type: Number, required: false, trim: false },
  gasUsed: { type: Number, required: false, trim: false },
  timestamp: { type: Number, required: true, trim: false },
  transactions: [String]
});


module.exports = mongoose.model('Block', blockSchema);
module.exports = mongoose.model('Transaction', transactionSchema);