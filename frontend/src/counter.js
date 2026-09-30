import { BrowserProvider, Contract } from 'ethers'

const CONTRACT_ADDRESS = '0x47887A2ba1Ec77E4915A2C590D47c7Dc6958c95d'
const CONTRACT_ABI = [
  {
    type: 'function',
    name: 'number',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'increment',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'decrement',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
]

export async function setupCounter({ valueElement, statusElement, connectButton, incrementButton, decrementButton }) {
  let provider = null
  let contract = null

  const setStatus = (message, isError = false) => {
    statusElement.textContent = message
    statusElement.classList.toggle('error', isError)
  }

  const refreshValue = async () => {
    if (!contract) {
      valueElement.textContent = '0'
      return
    }

    const value = await contract.number()
    valueElement.textContent = value.toString()
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus('Instala MetaMask o una wallet compatible para continuar.', true)
      return
    }

    try {
      provider = new BrowserProvider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = await provider.getSigner()
      contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      connectButton.textContent = 'Wallet conectada'
      connectButton.disabled = true
      setStatus('Wallet conectada. Puedes usar el contador.')
      await refreshValue()
    } catch (error) {
      setStatus(error?.shortMessage || 'No se pudo conectar la wallet.', true)
    }
  }

  const callCounterMethod = async (methodName) => {
    if (!contract) {
      setStatus('Primero conecta tu wallet.', true)
      return
    }

    try {
      const tx = await contract[methodName]()
      await tx.wait()
      await refreshValue()
      const label = methodName === 'increment' ? 'incrementado' : 'decrementado'
      setStatus(`Se ha ${label} correctamente.`)
    } catch (error) {
      setStatus(error?.shortMessage || 'La transacción falló.', true)
    }
  }

  connectButton.addEventListener('click', connectWallet)
  incrementButton.addEventListener('click', () => callCounterMethod('increment'))
  decrementButton.addEventListener('click', () => callCounterMethod('decrement'))

  valueElement.textContent = '0'
  setStatus('Conecta tu wallet para interactuar con el contador.')
  await refreshValue()
}
