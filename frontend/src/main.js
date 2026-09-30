import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <main class="counter-app">
    <section class="panel">
      <p class="eyebrow">dApp Web3</p>
      <h1>Contador on-chain</h1>
      <p class="subtitle">Incrementa o decrementa el valor del contrato en Sepolia.</p>

      <div class="value-box">
        <span class="label">Valor actual</span>
        <strong id="counter-value">0</strong>
      </div>

      <div class="actions">
        <button id="connect-wallet" class="secondary" type="button">Conectar wallet</button>
        <button id="decrement-button" class="danger" type="button">− Decrement</button>
        <button id="increment-button" class="primary" type="button">+ Increment</button>
      </div>

      <p id="status-message" class="status">Conecta tu wallet para interactuar con el contador.</p>
    </section>
  </main>
`

setupCounter({
  valueElement: document.querySelector('#counter-value'),
  statusElement: document.querySelector('#status-message'),
  connectButton: document.querySelector('#connect-wallet'),
  incrementButton: document.querySelector('#increment-button'),
  decrementButton: document.querySelector('#decrement-button'),
}).catch((error) => {
  console.error(error)
})
