// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const {
//   issueCredits,
//   transferCredits,
//   retireCredits,
//   getCredit,
// } = require("./hydrogenCredit");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes

// // Issue new credits
// // Issue new credits
// app.post("/issue", async (req, res) => {
//   try {
//     const { to, amount, batchId, metadataHash } = req.body;

//     // Call the imported function directly
//     const tx = await issueCredits(to, amount, batchId, metadataHash);

//     // Send back the transaction hash
//     res.json({ txHash: tx.transactionHash });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });



// // Transfer credits
// app.post("/transfer", async (req, res) => {
//   try {
//     const { id, to, amount } = req.body;
//     const tx = await transferCredits(id, to, amount);
//     res.json({ success: true, tx });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // Retire credits
// app.post("/retire", async (req, res) => {
//   try {
//     const { id, amount, reason } = req.body;
//     const tx = await retireCredits(id, amount, reason);
//     res.json({ success: true, tx });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // Get credit info
// app.get("/credit/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const credit = await getCredit(id);
//     res.json({ success: true, credit });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  issueCredits,
  transferCredits,
  retireCredits,
  getCredit,
} = require("./hydrogenCredit");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- Routes ---

// Issue new credits
app.post("/issue", async (req, res) => {
  try {
    const { to, amount, batchId, metadataHash } = req.body;
    const tx = await issueCredits(to, amount, batchId, metadataHash);
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Transfer credits
app.post("/transfer", async (req, res) => {
  try {
    const { id, to, amount } = req.body;
    const tx = await transferCredits(id, to, amount);
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Retire credits
app.post("/retire", async (req, res) => {
  try {
    const { id, amount, reason } = req.body;
    const tx = await retireCredits(id, amount, reason);
    res.json({ txHash: tx.transactionHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get credit info
app.get("/credit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const credit = await getCredit(id);
    res.json({ success: true, credit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
