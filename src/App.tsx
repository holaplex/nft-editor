import React, { FC, useMemo, useState } from 'react'
import RenderNFTs from './components/RenderNFTs'
import Home from './components/Home';
import UpdatePage from './components/UpdatePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
              <Router>
                <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/update/:mintAddress">
                  <UpdatePage />
                </Route>
                </Switch>
              </Router>
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

  )
}

export default App
