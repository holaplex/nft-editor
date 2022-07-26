import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useParams } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, walletAdapterIdentity, bundlrStorage, Task, Nft } from "@metaplex-foundation/js";
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { JsonForms } from '@jsonforms/react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'

const UpdatePage = () => {
    const { mintAddress }: any = useParams();
    const [nftName, setNftName] = useState("");
    const [nftJson, setNftJson] = useState("");
    const [nftMetadata, setNftMetadata]: any = useState();
    

    const connection = new Connection(clusterApiUrl("mainnet-beta"));

    const wallet = useWallet();

    const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage());

    async function fetchNft() {
        const mAddress = new PublicKey(mintAddress);
        const task = metaplex.nfts().findByMint(mAddress);
        const foundNft = await task.run();
        return foundNft;
    }

    async function updateNft(ourNft: Nft) {

        const { uri: newUri } = await metaplex
        .nfts()
        .uploadMetadata({
            nftMetadata,
        })
        .run();

        const { nft: updatedNft } = await metaplex
            .nfts()
            .update(ourNft, { uri: newUri })
            .run();
    }

    const submitUpdate = async () => {
        const ourNft = await fetchNft();
        await updateNft(ourNft);
    }

    const yourJson = {zac: "hi"}

    useEffect(() => {
        async function fillForm() {
            const ourNft = await fetchNft();
            setNftMetadata(ourNft.json);
        }

        fillForm();

    },[])
    

    const schema = {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          external_url: {
            type: 'string'
          },
          symbol: {
            type: 'string'
          },
          image: {
            type: 'string'
          },
          category: {
            type: 'string',
            enum: ['audio', 'image', 'html', 'video', 'vr']
          },
          attributes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                trait_type: {
                  type: 'string'
                },
                value: {
                  type: 'string'
                }
              }
            }
          }
        }
      }

    const uischema = {
    type: 'VerticalLayout',
    elements: [
        ,
        {
        type: 'Control',
        scope: '#/properties/name'
        },
        {
        type: 'Control',
        scope: '#/properties/description'
        },
        {
        type: 'HorizontalLayout',
        elements: [
            {
            type: 'Control',
            scope: '#/properties/external_url'
            },
            {
            type: 'Control',
            scope: '#/properties/symbol'
            }
        ]
        },
        {
            type: 'Control',
            scope: '#/properties/image'
        },
        {
        type: 'Control',
        scope: '#/properties/attributes',
        options: {
            showSortButtons: true
        }
        }
        ]
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">
                  <WalletMultiButton />
                  <p><b>Update NFT with Mint Address: </b><u>{mintAddress}</u></p>
                    <form className="rounded px-8 pt-6 pb-8 mb-4">
                        <JsonForms
                            schema={schema}
                            uischema={uischema}
                            data={nftMetadata}
                            renderers={materialRenderers}
                            cells={materialCells}
                            validationMode={'NoValidation'}
                            onChange={({ data }) => {
                                setNftMetadata(data);
                            }}
                        />
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