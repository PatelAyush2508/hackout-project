// src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // States for Issue Credits
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [batchId, setBatchId] = useState("");
  const [metadataHash, setMetadataHash] = useState("");

  // States for Transfer Credits
  const [transferId, setTransferId] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  // States for Retire Credits
  const [retireId, setRetireId] = useState("");
  const [retireAmount, setRetireAmount] = useState("");
  const [retireReason, setRetireReason] = useState("");

  // States for Check Credits
  const [checkId, setCheckId] = useState("");
  const [creditInfo, setCreditInfo] = useState(null);

  // --- Issue Credits ---
  async function handleIssue() {
    try {
      const response = await axios.post("http://localhost:5000/issue", {
        to: toAddress,
        amount: amount,
        batchId: batchId,
        metadataHash: metadataHash
      });
      alert(`Credits Issued! Tx Hash: ${response.data.txHash}`);
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  }

  // --- Transfer Credits ---
  async function handleTransfer() {
    try {
      const response = await axios.post("http://localhost:5000/transfer", {
        id: transferId,
        to: transferTo,
        amount: transferAmount
      });
      alert(`Credits Transferred! Tx Hash: ${response.data.txHash}`);
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  }

  // --- Retire Credits ---
  async function handleRetire() {
    try {
      const response = await axios.post("http://localhost:5000/retire", {
        id: retireId,
        amount: retireAmount,
        reason: retireReason
      });
      alert(`Credits Retired! Tx Hash: ${response.data.txHash}`);
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  }

  // --- Check Credit Info ---
  async function handleCheck() {
    try {
      const response = await axios.get(`http://localhost:5000/credit/${checkId}`);
      setCreditInfo(response.data.credit);
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  }

  return (
    <div className="App">
      <h1>Hydrogen Credit Dashboard</h1>

      {/* Issue Credits */}
      <div className="card">
        <h2>Issue Credits</h2>
        <input placeholder="Recipient Address" value={toAddress} onChange={e => setToAddress(e.target.value)} />
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <input placeholder="Batch ID" value={batchId} onChange={e => setBatchId(e.target.value)} />
        <input placeholder="Metadata Hash" value={metadataHash} onChange={e => setMetadataHash(e.target.value)} />
        <button onClick={handleIssue}>Issue Credit</button>
      </div>

      {/* Transfer Credits */}
      <div className="card">
        <h2>Transfer Credits</h2>
        <input placeholder="Credit ID" value={transferId} onChange={e => setTransferId(e.target.value)} />
        <input placeholder="To Address" value={transferTo} onChange={e => setTransferTo(e.target.value)} />
        <input placeholder="Amount" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} />
        <button onClick={handleTransfer}>Transfer Credit</button>
      </div>

      {/* Retire Credits */}
      <div className="card">
        <h2>Retire Credits</h2>
        <input placeholder="Credit ID" value={retireId} onChange={e => setRetireId(e.target.value)} />
        <input placeholder="Amount" value={retireAmount} onChange={e => setRetireAmount(e.target.value)} />
        <input placeholder="Reason" value={retireReason} onChange={e => setRetireReason(e.target.value)} />
        <button onClick={handleRetire}>Retire Credit</button>
      </div>

      {/* Check Credits */}
      <div className="card">
        <h2>Check Credit Info</h2>
        <input placeholder="Credit ID" value={checkId} onChange={e => setCheckId(e.target.value)} />
        <button onClick={handleCheck}>Check</button>
        {creditInfo && (
          <div className="result">
            <p><strong>Owner:</strong> {creditInfo.owner}</p>
            <p><strong>Amount:</strong> {creditInfo.amount}</p>
            <p><strong>Retired:</strong> {creditInfo.retired}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   // --- Issue Credits ---
//   const [toAddress, setToAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [batchId, setBatchId] = useState("");
//   const [metadataHash, setMetadataHash] = useState("");

//   // --- Transfer Credits ---
//   const [transferId, setTransferId] = useState("");
//   const [transferTo, setTransferTo] = useState("");
//   const [transferAmount, setTransferAmount] = useState("");

//   // --- Retire Credits ---
//   const [retireId, setRetireId] = useState("");
//   const [retireAmount, setRetireAmount] = useState("");
//   const [retireReason, setRetireReason] = useState("");

//   // --- Check Credits ---
//   const [checkId, setCheckId] = useState("");
//   const [creditInfo, setCreditInfo] = useState(null);

//   // --- Issue Credits ---
//   async function handleIssue() {
//     try {
//       const response = await axios.post("http://localhost:5000/issue", {
//         to: toAddress,
//         amount,
//         batchId,
//         metadataHash,
//       });
//       alert(`Credits Issued! Tx Hash: ${response.data.txHash}`);
//     } catch (err) {
//       console.error(err);
//       alert(`Error: ${err.response?.data?.error || err.message}`);
//     }
//   }

//   // --- Transfer Credits ---
//   async function handleTransfer() {
//     try {
//       const response = await axios.post("http://localhost:5000/transfer", {
//         id: transferId,
//         to: transferTo,
//         amount: transferAmount,
//       });
//       alert(`Credits Transferred! Tx Hash: ${response.data.txHash}`);
//     } catch (err) {
//       console.error(err);
//       alert(`Error: ${err.response?.data?.error || err.message}`);
//     }
//   }

//   // --- Retire Credits ---
//   async function handleRetire() {
//     try {
//       const response = await axios.post("http://localhost:5000/retire", {
//         id: retireId,
//         amount: retireAmount,
//         reason: retireReason,
//       });
//       alert(`Credits Retired! Tx Hash: ${response.data.txHash}`);
//     } catch (err) {
//       console.error(err);
//       alert(`Error: ${err.response?.data?.error || err.message}`);
//     }
//   }

//   // --- Check Credit Info ---
//   async function handleCheck() {
//     try {
//       const response = await axios.get(`http://localhost:5000/credit/${checkId}`);
//       setCreditInfo(response.data.credit);
//     } catch (err) {
//       console.error(err);
//       alert(`Error: ${err.response?.data?.error || err.message}`);
//     }
//   }

//   return (
//     <div className="App">
//       <h1>Hydrogen Credit Dashboard</h1>

//       {/* Issue Credits */}
//       <div className="card">
//         <h2>Issue Credits</h2>
//         <input placeholder="Recipient Address" value={toAddress} onChange={e => setToAddress(e.target.value)} />
//         <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
//         <input placeholder="Batch ID" value={batchId} onChange={e => setBatchId(e.target.value)} />
//         <input placeholder="Metadata Hash" value={metadataHash} onChange={e => setMetadataHash(e.target.value)} />
//         <button onClick={handleIssue}>Issue Credit</button>
//       </div>

//       {/* Transfer Credits */}
//       <div className="card">
//         <h2>Transfer Credits</h2>
//         <input placeholder="Credit ID" value={transferId} onChange={e => setTransferId(e.target.value)} />
//         <input placeholder="To Address" value={transferTo} onChange={e => setTransferTo(e.target.value)} />
//         <input placeholder="Amount" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} />
//         <button onClick={handleTransfer}>Transfer Credit</button>
//       </div>

//       {/* Retire Credits */}
//       <div className="card">
//         <h2>Retire Credits</h2>
//         <input placeholder="Credit ID" value={retireId} onChange={e => setRetireId(e.target.value)} />
//         <input placeholder="Amount" value={retireAmount} onChange={e => setRetireAmount(e.target.value)} />
//         <input placeholder="Reason" value={retireReason} onChange={e => setRetireReason(e.target.value)} />
//         <button onClick={handleRetire}>Retire Credit</button>
//       </div>

//       {/* Check Credits */}
//       <div className="card">
//         <h2>Check Credit Info</h2>
//         <input placeholder="Credit ID" value={checkId} onChange={e => setCheckId(e.target.value)} />
//         <button onClick={handleCheck}>Check</button>
//         {creditInfo && (
//           <div className="result">
//             <p><strong>Owner:</strong> {creditInfo.owner}</p>
//             <p><strong>Amount:</strong> {creditInfo.amount}</p>
//             <p><strong>Batch ID:</strong> {creditInfo.batchId}</p>
//             <p><strong>Metadata Hash:</strong> {creditInfo.metadataHash}</p>
//             <p><strong>Retired:</strong> {creditInfo.retired ? "Yes" : "No"}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
