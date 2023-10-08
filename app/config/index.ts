import { exit } from 'node:process'
import { Chain } from 'wagmi'
import { bsc, bscTestnet, hardhat } from 'wagmi/chains'

const dotEnv = (envKey: string) => {
  const envVal = process.env[envKey]
  if (!envVal) {
    console.error(`Environment is missing '${envKey}' variable!`)
    exit(1)
  }
  return envVal
}

const env = process.env.NEXT_PUBLIC_ENV || 'development'

const configs = {
  local: {
    chain: hardhat,
    jsonRpcEndpoint: 'http://127.0.0.1:8545',
  },
  development: {
    chain: bscTestnet,
    jsonRpcEndpoint: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  production: {
    chain: bsc,
    jsonRpcEndpoint: 'https://bsc-dataseed1.binance.org/',
  },
}[env]

export default configs

export interface PublicConfig {
  chain: Chain
  jsonRpcEndpoint: string
  rainbowKit: {
    appName: string
    projectId: string
  }
}

export const publicConfig: PublicConfig = {
  chain: configs?.chain!,
  jsonRpcEndpoint: configs?.jsonRpcEndpoint!,
  rainbowKit: {
    appName: 'web3bank',
    projectId: dotEnv('NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID'),
  },
}
