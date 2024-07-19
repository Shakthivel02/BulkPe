const axios = require("axios")
const Transaction = require("../models/Transaction")

exports.generateUPILink = async (req, res) => {
  const { amount, reference_id, transaction_note } = req.body
  try {
    const response = await axios.post(
      "https://api.bulkpe.in/client/checkOutRequest",
      {
        amount,
        reference_id,
        transaction_note,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BULKPE_AUTH_TOKEN}`,
        },
      }
    )

    // Save the transaction in the database
    const transaction = new Transaction({
      reference_id,
      amount,
      transaction_note,
      status: "pending", // initial status
      user: req.user._id, // associate the transaction with the authenticated user
    })
    await transaction.save()

    res.json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.handleUPICallback = async (req, res) => {
  const { reference_id, status, transaction_id, amount, timestamp } = req.body
  try {
    // Find the transaction by reference_id
    const transaction = await Transaction.findOne({ reference_id })

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    // Update the transaction status
    transaction.status = status
    transaction.transaction_id = transaction_id
    transaction.timestamp = timestamp

    await transaction.save()

    res.status(200).json({ message: "Callback received and processed" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
