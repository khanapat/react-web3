/// <reference types="react-scripts" />

interface Window {
    ethereum?: {
        isMetaMask?: true
        request?: (...args: IRequestArguments[]) => Promise<string[]>
        on?: (arg1: string, Function) => void
    }
}

