const express = require("express")
const router = express.Router()
const {
  generateUPILink,
  handleUPICallback,
} = require("../controllers/bulkpeController")
const { protect } = require("../middlewares/authMiddleware")
const {
  validateUPILinkRequest,
  validateCallbackRequest,
} = require("../middlewares/validation")

router.post("/generate-link", protect, validateUPILinkRequest, generateUPILink)
router.post("/callback", validateCallbackRequest, handleUPICallback)

module.exports = router
