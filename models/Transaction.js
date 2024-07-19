const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    reference_id: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_note: String,
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
    // Additional fields can be added as required
  },
  {
    timestamps: true,
  }
)

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction
