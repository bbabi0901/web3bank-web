'use client'

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { publicConfig } from '@/app/config'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'

interface WagmiProviderProps {
  children: React.ReactNode
}

const { chains, publicClient } = configureChains(
  [publicConfig.chain],
  [
    jsonRpcProvider({
      rpc: () => ({ http: publicConfig.jsonRpcEndpoint }),
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: publicConfig.rainbowKit.appName,
  projectId: publicConfig.rainbowKit.projectId,
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const WagmiProvider: React.FC<WagmiProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#FF5500',
          borderRadius: 'small',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default WagmiProvider
