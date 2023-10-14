import { exit } from 'node:process'
import { Chain } from 'wagmi'
import { bsc, bscTestnet, hardhat } from 'wagmi/chains'
import _ from 'lodash'

const dotEnv = (envKey: string) => {
  const envVal = process.env[envKey]
  if (!envVal) {
    console.error(`Environment is missing '${envKey}' variable!`)
    exit(1)
  }
  return envVal
}

const env =
  (process.env.NEXT_PUBLIC_ENV as keyof typeof overrideConfig) || 'development'

const baseConfig = {
  rainbowKit: {
    appName: 'web3bank',
    projectId: dotEnv('NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID'),
  },
}

const overrideConfig = {
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
}

export interface Config {
  chain: Chain
  jsonRpcEndpoint: string
  rainbowKit: {
    appName: string
    projectId: string
  }
}

export const config: Config = _.merge(baseConfig, overrideConfig[env])
