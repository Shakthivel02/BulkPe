const { check, validationResult } = require("express-validator")

exports.validateUPILinkRequest = [
  check("amount").isNumeric().withMessage("Amount must be a number"),
  check("reference_id").notEmpty().withMessage("Reference ID is required"),
  check("transaction_note").optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

exports.validateCallbackRequest = [
  check("reference_id").notEmpty().withMessage("Reference ID is required"),
  check("status")
    .isIn(["success", "pending", "failed"])
    .withMessage("Invalid status value"),
  check("transaction_id").notEmpty().withMessage("Transaction ID is required"),
  check("amount").isNumeric().withMessage("Amount must be a number"),
  check("timestamp").isISO8601().withMessage("Invalid timestamp format"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]
