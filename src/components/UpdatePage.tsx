import React, { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useParams } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
//import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";


const connection = new Connection(clusterApiUrl("mainnet-beta"));

const wallet = Keypair.generate();

// const metaplex = Metaplex.make(connection)
//     .use(keypairIdentity(wallet))
//     .use(bundlrStorage());

const UpdatePage = () => {
    const { mintAddress }: any = useParams();
    const [nft, setNft] = useState();
    const [nftName, setNftName] = useState('');

    async function fetchNft() {
        const foundNft = await metaplex.nfts().findByMint(mintAddress);
        setNft(foundNft);

        return foundNft;
    }

    async function updateNft() {
        const { nft: updatedNft } = await metaplex.nfts().update(nft, {
            name: {nftName},
        });
    }

    const submitUpdate = () => {
        fetchNft();
        updateNft();
    }



    return (
        <div>
            <div className="App">
                <header className="App-header">
                  <WalletMultiButton />
                  <p><b>Update NFT with Mint Address: </b><u>{mintAddress}</u></p>
                    <form className="rounded px-8 pt-6 pb-8 mb-4">
                        <input className="shadow my-8 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name">
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