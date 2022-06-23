import React, { FC, useMemo, useState } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import logo from './logo.svg'
import './App.css'

import '@solana/wallet-adapter-react-ui/styles.css'

function App() {
  const [count, setCount] = useState(0)
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
        new GlowWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton />

              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>Hello Vite + React!</p>
                  <p>
                    Edit <code>App.tsx</code> and save to test HMR updates.
                  </p>
                  <p>
                    <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn React
                    </a>
                    {' | '}
                    <a
                      className="App-link"
                      href="https://vitejs.dev/guide/features.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vite Docs
                    </a>
                  </p>
                </header>
              </div>
          </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>

  )
}

export default App
