/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<any, {}, any>
    export default component
}
  
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  // Only string type here to avoid hard to debug cast problems in your components!
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_BUILD_EPOCH?: string
  readonly VITE_APP_ETHERSCAN_URL: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_DEFAULT_NETWORK_ID: number
  readonly VITE_INFURA_PROJECT_ID: string
  readonly VITE_PILLS_CONTRACT: string
  readonly VITE_ALERTS_CONTRACT: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  ethereum: any
}