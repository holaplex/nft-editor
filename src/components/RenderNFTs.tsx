import React, { FC, useMemo, useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import '../App.css';




const RenderNFTs = () => {

  const { publicKey } = useWallet();
  

  const query = gql`
    query {
      nfts(
        limit: 9999, 
        offset: 0, 
        updateAuthorities:["${publicKey}"],
        owners: ["${publicKey}"]

      ) {
        name
        image
        mintAddress
        updateAuthorityAddress
      }
    }`;



  const { data, loading, error } = useQuery(query);

    console.log(data);

    return (
        <>
            <div className="grid grid-rows-4 grid-flow-col gap-4 shadow-lg">
            {data && data.nfts.map((nft: { name: string | null | undefined; image: string | undefined; mintAddress: string | null | undefined; }) => (
              <a href={`/update/${nft.mintAddress}`}>
              <div>
                <h1 className="font-bold text-2xl text-white-900">{nft.name}</h1>
                <img className="max-h-60 max-w-60" src={nft.image}></img>
              </div>
              </a>
            ))}
            </div>
        </>
    );
}

export default RenderNFTs;