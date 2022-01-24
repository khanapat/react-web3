import React, { useEffect } from 'react';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "./components/wallet/connector";
import { Web3ReactProvider } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";

// import setupNetwork from './utils/wallet';

import './App.css';

import useSetupNetwork from './utils/useWallet';

function App() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React<ethers.providers.Web3Provider>();

    const { setupNetwork } = useSetupNetwork();

    const connect = async () => {
        try {
            await activate(injected, async (error: Error) => {
                console.log(error);
                if (error instanceof UnsupportedChainIdError) {
                    await setupNetwork();
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const disconnect = async () => {
        try {
            deactivate();
        } catch (error) {
            console.log(error);
        }
    };

    const signMessage = async () => {
        const message = "Nice trust";
        if (account && library) {
            try {
                const signature = await library.getSigner(account).signMessage(message);
                console.log("signature:", signature);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const sendTxn = async () => {
        const message = ethers.utils.defaultAbiCoder.encode(["string"], ["bobo"]);
        console.log(message);
        if (account && library) {
            try {
                const txn: ethers.providers.TransactionRequest = {
                    to: "0xa9B6D99bA92D7d691c6EF4f49A1DC909822Cee46",
                    data: message
                }
                const sendTxn = await library.getSigner().sendTransaction(txn);
                await sendTxn.wait(1);
                console.log(sendTxn);

            } catch (error) {
                console.log(error);
            }
        }
    };

    const signTxn = async () => {
        const message = ethers.utils.defaultAbiCoder.encode(["string"], ["bobo"]);
        console.log(message);
        if (account && library) {
            try {
                const network = await library.getNetwork();
                // console.log(network);
                const txn: ethers.providers.TransactionRequest = {
                    chainId: network.chainId,
                    to: "0xa9B6D99bA92D7d691c6EF4f49A1DC909822Cee46",
                    data: message,
                    gasLimit: 210000,
                    gasPrice: ethers.utils.parseUnits("20", "gwei")
                }
                const wallet = new ethers.Wallet(account, library);
                const signTxn = await wallet.signTransaction(txn);
                console.log(signTxn);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        console.log(active);
        if (library) {
            library.on("chainChanged", (chainId: string) => {
                console.log(Number.parseInt(chainId));
            });
        }
    }, [active])

    return (
        <div className="App">
            <button onClick={connect}>Connect to MetaMask</button>
            {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
            <button onClick={disconnect}>Disconnect</button>
            <button onClick={signMessage}>Sign Message</button>
            <button onClick={sendTxn}>Send Txn</button>
            <button onClick={signTxn}>Sign Txn</button>
        </div>
    );
}

export default App;
