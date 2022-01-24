import React from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const mumbaiChainId = 80001;

const useSetupNetwork = () => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React<ethers.providers.Web3Provider>();
    // library?.provider.request

    const setupNetwork = async () => {
        if (library && library.provider && library.provider.request) {
            try {
                await library.provider.request({
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
                        await library.provider.request({
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
    }

    return {
        setupNetwork
    }
};

export default useSetupNetwork;