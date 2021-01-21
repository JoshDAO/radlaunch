import {useState} from "react";
import Web3Modal from "web3modal";
import Portis from "@portis/web3"
import Web3 from "web3";

export default function Wallet_model(){

    const [loading, setLoading] = useState(false);

    return{
        get web3Loading(){
            return loading
        },

        async getweb3(){
            setLoading(true);
            let web3Modal;
            let provider;
            let web3;
            let providerOptions;
            providerOptions = {
                metamask: {
                    id: "injected",
                    name: "MetaMask",
                    type: "injected",
                    check: "isMetaMask"
                }
                ,
                portis:{
                    package: Portis,
                    options:{
                        id: "f93ee87a-6e6b-4c92-a394-ef5e494c82f6",
                    }
                }
            };

            web3Modal = new Web3Modal({
                network:'kovan',
                cacheProvider: true,
                providerOptions,
            });

            provider = await web3Modal.connect();

            provider.on('error', e => console.error('WS Error', e));

            provider.on('end', e => console.error('WS End', e));
            provider.on('disconnect', (error: { code: number; message: string }) => {
                console.log(error);
            });

            provider.on('connect', (info: { chainId: number }) => {
                console.log(info);
            });
            web3 = new Web3(provider);
            setLoading(false);
            return web3;

        }
    }
}