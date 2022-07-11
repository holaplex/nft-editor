import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import RenderNFTs from "./RenderNFTs";
import logo from '../logo.svg'


const Home = () => {


    return(
        <div>
            <div className="App">
                <header className="App-header">
                  <WalletMultiButton />
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>Hello Vite + React!</p>
                  <RenderNFTs />
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
        </div>
    );
}

export default Home;