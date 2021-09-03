import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import tokenABI from "./tokenABI";

function App() {
  const [Accounts, setAccounts] = useState();
  const [Balance, setBalance] = useState();
  const [Address, setAddress] = useState();
  const [Amount, setAmount] = useState();
 
  //Rinkeby Dai contract address
  const DaiContractAddress = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";
 
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
     // console.log(accs[0]);

      const tokenInst = new web3.eth.Contract(tokenABI, DaiContractAddress);

      const balance = await tokenInst.methods
        .balanceOf(accs[0])
        .call();

     // console.log(balance);

      const blc = web3.utils.fromWei(balance);
     // console.log(blc);
       setBalance(blc);
    } else {
      window.alert("please install metamask");
    }
  }, []);

  // console.log(Accounts);
  // console.log(Balance);

  const sendTranstion = async () => {
    const web3 = new Web3(window.ethereum);

    const tokenInst = new web3.eth.Contract(tokenABI, DaiContractAddress);
   await  tokenInst.methods.transfer(Address, web3.utils.toWei(Amount, "ether")).send({
        from: Accounts,
      });
  };
  // console.log(Address);
  // console.log(Amount);

  return (
    <div className="container">
    
        
        <div>
          <h1>Address</h1>
          {Accounts}
        </div>
        <br/>
        <div className="main-container">
          <h1>Balance:  {Balance} DAi </h1>
         
        
            <div className="form-container" >
        <input
          type="text"
          placeholder="Enter Dai address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          required
         
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          required
         
        />
           <button onClick={sendTranstion} disabled={!Address || !Amount}   >Send</button>
        </div>
        

        </div>
      
    </div>
  );
}

export default App;
