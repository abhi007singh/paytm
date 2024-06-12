const { default: mongoose } = require("mongoose");
const { Account } = require("../db");

const balance = async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.user.userId });
        res.json({ balance: account.balance });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const transfer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { to, amount } = req.body;

        const from = await Account.findOne({ userId: req.user.userId }).session(session);
        if (!from || from.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const account = await Account.findOne({ userId: to }).session(session);
        if (!account) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        await Account.updateOne({ userId: req.user.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        console.error(error.message);
        await session.abortTransaction();
        res.status(500).json({ error: error.message });
    } finally {
        await session.endSession();
    }
}

module.exports = {
    balance,
    transfer
}