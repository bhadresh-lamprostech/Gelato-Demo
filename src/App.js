import { useState } from "react";
// import login from "./component/wallet";
import { GaslessWalletInterface } from "@gelatonetwork/gasless-onboarding";
import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
// import { SafeEventEmitterProvider } from "@web3auth/base";
import { gaslessOnboarding } from "./component/onboard";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [gaslessWallet, setGaslessWallet] = useState({});
  const [web3AuthProvider, setWeb3AuthProvider] = useState(null);

  const login = async () => {
    try {
      await gaslessOnboarding.init();
      const provider = await gaslessOnboarding.login();
      if (provider) {
        setWeb3AuthProvider(provider);
      }

      const gaslessWallet = await gaslessOnboarding.getGaslessWallet();
      if (!gaslessWallet.isInitiated()) await gaslessWallet.init();
      const address = gaslessWallet.getAddress();
      console.log(address)
      setGaslessWallet(gaslessWallet);
      setWalletAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await gaslessOnboarding?.logout();

    setWeb3AuthProvider(null);
    setGaslessWallet(undefined);
    setWalletAddress(undefined);
    console.log(gaslessOnboarding)
  };

  return (
    <div>
      {/* <wallet/> */}
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
