import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import tokenABI from "./tokenABI";

function App() {
  const [Accounts, setAccounts] = useState();
  const [Balance, setBalance] = useState();
  const [Address, setAddress] = useState();
  const [amount, setAmount] = useState();

  const DaiContractAddress = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";
  const MetaMaskTokenAddress = "0xe5889eA79CC1bA8d8816c1C706965cA5ae82be1B";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);

      const netId = await web3.eth.net.getId();
      console.log(netId);

      const accounts = await window.ethereum.enable();

      console.log(accounts);
      var accs = await web3.eth.getAccounts();
      setAccounts(accs[0]);
      console.log(accs[0]);

      const tokenInst = new web3.eth.Contract(tokenABI, DaiContractAddress);

      const balance = await tokenInst.methods
        .balanceOf(MetaMaskTokenAddress)
        .call();

      console.log(balance);

      const blc = web3.utils.fromWei(balance);
      console.log(blc);

      setBalance(blc);
    } else {
      window.alert("please install metamask");
    }
  }, []);

  console.log(Accounts);
  console.log(Balance);

  const sendTranstion = async () => {
    const web3 = new Web3(window.ethereum);

    const tokenInst = new web3.eth.Contract(tokenABI, DaiContractAddress);
    tokenInst.methods
      .transfer(Address, web3.utils.toWei(amount, "ether"))
      .send({
        from: "0xe5889eA79CC1bA8d8816c1C706965cA5ae82be1B",
      });
    // await web3.eth.sendTranstion({
    //   from: "0xe5889eA79CC1bA8d8816c1C706965cA5ae82be1B",
    //   to: Address,
    //   value: web3.utils.toWei(amount, "ether"),
    // });
  };
  console.log(Address);
  console.log(amount);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Address</h1>
          {Accounts}
        </div>
        <div>
          <h1>Balance</h1>
          {Balance} DAi
        </div>

        <input
          type="text"
          placeholder="Enter Dai address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={sendTranstion}>Send</button>
      </header>
    </div>
  );
}

export default App;
