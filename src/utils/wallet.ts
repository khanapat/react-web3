import React from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const mumbaiChainId = 80001;

const setupNetwork = async () => {
    // const { active, account, library, connector, activate, deactivate } = useWeb3React<ethers.providers.Web3Provider>();
    // library?.provider.request

    if (window.ethereum && window.ethereum.request) {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        chainId: `0x${mumbaiChainId.toString(16)}`
                    }
                ],
            });
        } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: `0x${mumbaiChainId.toString(16)}`,
                                chainName: "Trust",
                                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                                nativeCurrency: {
                                    name: "TRUST",
                                    symbol: "TST",
                                    decimals: 18,
                                },
                            }
                        ]
                    });
                } catch (error: any) {
                    console.log(error);
                }
            }
            console.log(switchError);
        }
    }
};

export default setupNetwork;