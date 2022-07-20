import React, { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useParams } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, walletAdapterIdentity, bundlrStorage, Task, Nft } from "@metaplex-foundation/js";
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';


const UpdatePage = () => {
    const { mintAddress }: any = useParams();
    const [nftName, setNftName] = useState("");
    const [nftJson, setNftJson] = useState("");

    const connection = new Connection(clusterApiUrl("mainnet-beta"));

    const wallet = useWallet();

    const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage());

    async function fetchNft() {
        const mAddress = new PublicKey(mintAddress);
        const task = metaplex.nfts().findByMint(mAddress);
        const foundNft = await task.run();
        console.log('found', foundNft);
        return foundNft;
    }

    async function updateNft(ourNft: Nft) {
        console.log('this better not be undefined', ourNft);


        const { nft: updatedNft } = await metaplex
        .nfts()
        .update(ourNft, { name: nftName })
        .run();

    }

    const submitUpdate = async () => {
        const ourNft = await fetchNft();
        await updateNft(ourNft);
    }

    const yourJson = {zac: "hi"}

    const jsonChange = () => {
        return
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">
                  <WalletMultiButton />
                  <p><b>Update NFT with Mint Address: </b><u>{mintAddress}</u></p>
                    <form className="rounded px-8 pt-6 pb-8 mb-4">
                        <input onChange={(e)=> {setNftName(e.target.value)}} className="shadow my-8 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name">
                        </input>
                        <button onClick={submitUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Update
                        </button> 
                    </form>
                </header>
            </div>
        </div>
    )
}

export default UpdatePage;