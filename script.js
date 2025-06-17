// ===== IDIOMAS =====
let currentLanguage = localStorage.getItem("portfolioLanguage") || "en"

const translations = {
  en: {
    // Header
    updatePrices: "Update Prices",

    // Dashboard
    totalPortfolioValue: "Total Portfolio Value",
    totalInvested: "Total Invested",
    yourCostBasis: "Your cost basis",
    holdings: "Holdings",
    differentAssets: "Different assets",

    // Add Investment
    addInvestment: "Add Investment",
    buyStocksEtfs: "Buy stocks, ETFs, or crypto",
    symbol: "Symbol",
    shares: "Shares",
    pricePerShare: "Price per Share",
    buy: "Buy",
    current: "Current",

    // Holdings
    yourHoldings: "Your Holdings",
    exportCsv: "Export CSV",
    asset: "Asset",
    avgCost: "Avg. Cost",
    currentPrice: "Current Price",
    marketValue: "Market Value",
    gainLoss: "Gain/Loss",
    returnPercent: "Return %",
    actions: "Actions",

    // Performance
    monthlyPerformance: "Monthly Performance",
    trackPortfolioGrowth: "Track your portfolio growth over time",
    bestMonth: "Best Month",
    worstMonth: "Worst Month",
    avgMonthly: "Avg Monthly",
    lastSixMonths: "Last 6 months",

    // Transactions
    recentTransactions: "Recent Transactions",
    clearHistory: "Clear History",

    // Projections
    growthProjections: "Growth Projections",
    estimatedPortfolio: "Estimated portfolio value in 1 year",
    conservative: "Conservative",
    moderate: "Moderate",
    aggressive: "Aggressive",
    annual: "Annual",
    gain: "gain",

    // Messages
    portfolioLoaded: "Portfolio loaded successfully!",
    addedShares: "Added {shares} more shares of {symbol}",
    addedToPortfolio: "Added {symbol} to your portfolio",
    pricesUpdated: "Prices updated successfully",
    noHoldingsToUpdate: "No holdings to update",
    errorUpdatingPrices: "Error updating prices",
    sellAllShares: "Are you sure you want to sell all {symbol} shares?",
    soldAllShares: "Sold all {symbol} shares",
    noDataToExport: "No data to export",
    portfolioExported: "Portfolio exported to CSV",
    clearAllTransactions: "Are you sure you want to clear all transaction history?",
    transactionHistoryCleared: "Transaction history cleared",
    clearAllData: "Are you sure you want to clear all portfolio data and transactions?",
    allDataCleared: "All data cleared - Ready for new investments!",
    completeBackupExported: "Complete backup exported!",
    testPortfolioLoaded: "Test portfolio with gains loaded!",

    // Empty states
    noInvestmentsYet: "No investments yet",
    startBuildingPortfolio: "Start building your portfolio by adding your first investment above",
    noTransactionsYet: "No transactions yet",
    transactionHistoryAppear: "Your transaction history will appear here",
  },
  es: {
    // Header
    updatePrices: "Actualizar Precios",

    // Dashboard
    totalPortfolioValue: "Valor Total del Portfolio",
    totalInvested: "Total Invertido",
    yourCostBasis: "Tu costo base",
    holdings: "Posiciones",
    differentAssets: "Activos diferentes",

    // Add Investment
    addInvestment: "Agregar Inversión",
    buyStocksEtfs: "Compra acciones, ETFs o crypto",
    symbol: "Símbolo",
    shares: "Acciones",
    pricePerShare: "Precio por Acción",
    buy: "Comprar",
    current: "Actual",

    // Holdings
    yourHoldings: "Tus Posiciones",
    exportCsv: "Exportar CSV",
    asset: "Activo",
    avgCost: "Costo Prom.",
    currentPrice: "Precio Actual",
    marketValue: "Valor de Mercado",
    gainLoss: "Ganancia/Pérdida",
    returnPercent: "Retorno %",
    actions: "Acciones",

    // Performance
    monthlyPerformance: "Rendimiento Mensual",
    trackPortfolioGrowth: "Rastrea el crecimiento de tu portfolio a lo largo del tiempo",
    bestMonth: "Mejor Mes",
    worstMonth: "Peor Mes",
    avgMonthly: "Promedio Mensual",
    lastSixMonths: "Últimos 6 meses",

    // Transactions
    recentTransactions: "Transacciones Recientes",
    clearHistory: "Limpiar Historial",

    // Projections
    growthProjections: "Proyecciones de Crecimiento",
    estimatedPortfolio: "Valor estimado del portfolio en 1 año",
    conservative: "Conservador",
    moderate: "Moderado",
    aggressive: "Agresivo",
    annual: "Anual",
    gain: "ganancia",

    // Messages
    portfolioLoaded: "¡Portfolio cargado exitosamente!",
    addedShares: "Agregaste {shares} acciones más de {symbol}",
    addedToPortfolio: "Agregaste {symbol} a tu portfolio",
    pricesUpdated: "Precios actualizados exitosamente",
    noHoldingsToUpdate: "No hay posiciones para actualizar",
    errorUpdatingPrices: "Error al actualizar precios",
    sellAllShares: "¿Estás seguro de vender todas las acciones de {symbol}?",
    soldAllShares: "Vendiste todas las acciones de {symbol}",
    noDataToExport: "No hay datos para exportar",
    portfolioExported: "Portfolio exportado a CSV",
    clearAllTransactions: "¿Estás seguro de limpiar todo el historial de transacciones?",
    transactionHistoryCleared: "Historial de transacciones limpiado",
    clearAllData: "¿Estás seguro de limpiar todos los datos del portfolio y transacciones?",
    allDataCleared: "Todos los datos limpiados - ¡Listo para nuevas inversiones!",
    completeBackupExported: "¡Backup completo exportado!",
    testPortfolioLoaded: "¡Portfolio de prueba con ganancias cargado!",

    // Empty states
    noInvestmentsYet: "Aún no hay inversiones",
    startBuildingPortfolio: "Comienza a construir tu portfolio agregando tu primera inversión arriba",
    noTransactionsYet: "Aún no hay transacciones",
    transactionHistoryAppear: "Tu historial de transacciones aparecerá aquí",
  },
}

// ===== VARIABLES GLOBALES =====
let holdings = [] // Array para almacenar todas las posiciones
let transactions = [] // Array para almacenar historial de transacciones
let chart = null // Variable para el gráfico de Chart.js
let autoUpdateInterval = null // Intervalo para actualización automática
let performanceChart = null

// ===== FUNCIONES DE IDIOMA =====
function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "es" : "en"
  localStorage.setItem("portfolioLanguage", currentLanguage)
  updateLanguage()
  showToast(currentLanguage === "en" ? "Language changed to English" : "Idioma cambiado a Español", "success")
}

function updateLanguage() {
  const t = translations[currentLanguage]

  // Update language button
  document.getElementById("language-text").textContent = currentLanguage.toUpperCase()

  // Update all elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate")
    if (t[key]) {
      element.textContent = t[key]
    }
  })

  // Update specific elements that need special handling
  document.getElementById("update-btn-text").textContent = t.updatePrices

  // Update current price text if visible
  const currentPriceText = document.getElementById("current-price-text")
  if (currentPriceText && currentPriceText.textContent.includes("Current:")) {
    const price = currentPriceText.textContent.split("$")[1]
    if (price) {
      currentPriceText.textContent = `${t.current}: $${price}`
    }
  }

  // Update projection gains text
  const updateProjectionGain = (elementId, value) => {
    const element = document.getElementById(elementId)
    if (element && element.textContent.includes("gain")) {
      const amount = element.textContent.split(" ")[0]
      element.innerHTML = `${amount} <span data-translate="gain">${t.gain}</span>`
    }
  }

  updateProjectionGain("gain-8")
  updateProjectionGain("gain-12")
  updateProjectionGain("gain-15")
}

// ===== OBTENER PRECIO ACTUAL =====
async function getCurrentPrice(symbol) {
  try {
    if (isCrypto(symbol)) {
      const symbolId = symbolMapping[symbol]
      if (!symbolId) return null

      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbolId}&vs_currencies=usd`)
      const data = await response.json()
      return data[symbolId]?.usd || null
    } else {
      // Para acciones, simular precio (en producción usarías una API real)
      const basePrice = Math.random() * 200 + 50 // Precio entre $50-$250
      return basePrice
    }
  } catch (error) {
    console.error("Error fetching current price:", error)
    return null
  }
}

// ===== MANEJAR INPUT DE SÍMBOLO =====
let priceTimeout = null
function handleSymbolInput() {
  const symbol = assetSymbolInput.value.trim().toUpperCase()
  const currentPriceDisplay = document.getElementById("current-price-display")
  const currentPriceText = document.getElementById("current-price-text")

  if (priceTimeout) {
    clearTimeout(priceTimeout)
  }

  if (symbol.length >= 2) {
    priceTimeout = setTimeout(async () => {
      const price = await getCurrentPrice(symbol)
      if (price) {
        currentPriceText.textContent = `${translations[currentLanguage].current}: $${price.toFixed(2)}`
        currentPriceDisplay.classList.add("show")

        // Auto-fill price input
        assetPriceInput.value = price.toFixed(2)
      } else {
        currentPriceDisplay.classList.remove("show")
      }
    }, 500)
  } else {
    currentPriceDisplay.classList.remove("show")
  }
}

// ===== ELEMENTOS DEL DOM =====
const investmentForm = document.getElementById("investment-form")
const assetSymbolInput = document.getElementById("asset-symbol")
const assetSharesInput = document.getElementById("asset-shares")
const assetPriceInput = document.getElementById("asset-price")
const holdingsTableBody = document.getElementById("holdings-tbody")
const totalBalanceElement = document.getElementById("total-balance")
const totalInvestedElement = document.getElementById("total-invested")
const totalAssetsElement = document.getElementById("total-assets")
const totalChangeElement = document.getElementById("total-change")
const emptyHoldings = document.getElementById("empty-holdings")
const updatePricesBtn = document.getElementById("update-prices-btn")
const exportCsvBtn = document.getElementById("export-csv-btn")
const clearHistoryBtn = document.getElementById("clear-history-btn")
const transactionsList = document.getElementById("transactions-list")
const emptyTransactions = document.getElementById("empty-transactions")
const toastContainer = document.getElementById("toast-container")
const assetForm = document.getElementById("asset-form")
const assetNameInput = document.getElementById("asset-name")
const assetQuantityInput = document.getElementById("asset-quantity")
const assetsTableBody = document.getElementById("assets-tbody")
const emptyState = document.getElementById("empty-state")
const notification = document.getElementById("notification")
const notificationText = document.getElementById("notification-text")
const notificationClose = document.getElementById("notification-close")
const contributionsGrid = document.getElementById("contributions-grid")

// Nuevos elementos
const autoUpdateCheckbox = document.getElementById("auto-update-checkbox")
const lastUpdateTime = document.getElementById("last-update-time")
const transactionsTableBody = document.getElementById("transactions-tbody")
const transactionsEmpty = document.getElementById("transactions-empty")

// Elementos de proyecciones
const projection8Element = document.getElementById("projection-8")
const projection12Element = document.getElementById("projection-12")
const projection15Element = document.getElementById("projection-15")
const gain8Element = document.getElementById("gain-8")
const gain12Element = document.getElementById("gain-12")
const gain15Element = document.getElementById("gain-15")

// ===== COLORES PARA EL GRÁFICO =====
const chartColors = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#84cc16",
  "#ec4899",
  "#6b7280",
  "#14b8a6",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
]

// ===== MAPEO DE SÍMBOLOS PARA APIs =====
const symbolMapping = {
  BTC: "bitcoin",
  ETH: "ethereum",
  ADA: "cardano",
  DOT: "polkadot",
  LINK: "chainlink",
  UNI: "uniswap",
  LTC: "litecoin",
  BCH: "bitcoin-cash",
  XRP: "ripple",
  DOGE: "dogecoin",
  MATIC: "polygon",
  SOL: "solana",
  AVAX: "avalanche-2",
  ATOM: "cosmos",
  // Acciones (simuladas)
  AAPL: "aapl",
  MSFT: "msft",
  GOOGL: "googl",
  TSLA: "tsla",
  AMZN: "amzn",
  NVDA: "nvda",
  META: "meta",
  NFLX: "nflx",
  SPY: "spy",
  QQQ: "qqq",
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Modern Investment Portfolio iniciado")

  // Cargar datos del localStorage
  loadHoldingsFromStorage()
  loadTransactionsFromStorage()

  // Configurar event listeners
  setupEventListeners()

  // Actualizar la interfaz
  updateUI()

  // Inicializar los gráficos
  initPortfolioChart()
  initPerformanceChart() // Agregar esta línea

  // Mostrar mensaje de bienvenida
  setTimeout(() => {
    showToast("💰 Portfolio loaded successfully!", "success")
  }, 1000)

  // Configurar idioma inicial
  updateLanguage()
})

// ===== CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
  // Formulario de inversión
  investmentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleAddInvestment()
  })

  // Botones
  updatePricesBtn.addEventListener("click", updateAllPrices)
  exportCsvBtn.addEventListener("click", exportToCSV)
  clearHistoryBtn.addEventListener("click", clearTransactionHistory)

  // Botón de idioma
  document.getElementById("language-toggle").addEventListener("click", toggleLanguage)

  // Input de símbolo para precio automático
  assetSymbolInput.addEventListener("input", handleSymbolInput)

  console.log("✅ Event listeners configurados")
}

// ===== MANEJAR AGREGAR INVERSIÓN =====
function handleAddInvestment() {
  console.log("🎯 Agregando nueva inversión...")

  // Obtener valores del formulario
  const symbol = assetSymbolInput.value.trim().toUpperCase()
  const shares = Number.parseFloat(assetSharesInput.value)
  const price = Number.parseFloat(assetPriceInput.value)

  console.log("📊 Datos del formulario:", { symbol, shares, price })

  // Validar datos
  if (!symbol || isNaN(shares) || isNaN(price) || shares <= 0 || price <= 0) {
    showToast("⚠️ Please fill all fields correctly", "error")
    return
  }

  // Verificar si ya existe la posición
  const existingHolding = holdings.find((holding) => holding.symbol === symbol)

  if (existingHolding) {
    // Calcular nuevo promedio ponderado
    const totalShares = existingHolding.shares + shares
    const totalCost = existingHolding.shares * existingHolding.avgCost + shares * price
    const newAvgCost = totalCost / totalShares

    existingHolding.shares = totalShares
    existingHolding.avgCost = newAvgCost
    existingHolding.totalCost = totalCost
    existingHolding.marketValue = totalShares * existingHolding.currentPrice

    showToast(`📈 Added ${shares} more shares of ${symbol}`, "success")
  } else {
    // Crear nueva posición
    const newHolding = {
      id: Date.now(),
      symbol: symbol,
      shares: shares,
      avgCost: price,
      currentPrice: price, // Inicialmente igual al precio de compra
      totalCost: shares * price,
      marketValue: shares * price,
      color: chartColors[holdings.length % chartColors.length],
      dateAdded: new Date().toISOString(),
    }

    holdings.push(newHolding)
    showToast(`🚀 Added ${symbol} to your portfolio`, "success")
  }

  // Registrar transacción
  addTransaction(symbol, "buy", shares, price, shares * price)

  // Limpiar formulario
  investmentForm.reset()

  // Guardar y actualizar
  saveHoldingsToStorage()
  updateUI()

  console.log("💰 Inversión agregada:", symbol)
}

// ===== AGREGAR TRANSACCIÓN =====
function addTransaction(symbol, type, shares, price, total) {
  const transaction = {
    id: Date.now() + Math.random(),
    date: new Date().toISOString(),
    symbol: symbol,
    type: type, // 'buy', 'sell'
    shares: shares,
    price: price,
    total: total,
  }

  transactions.unshift(transaction) // Agregar al inicio

  // Mantener solo las últimas 50 transacciones
  if (transactions.length > 50) {
    transactions = transactions.slice(0, 50)
  }

  saveTransactionsToStorage()
  updateTransactionsList()
}

// ===== ACTUALIZAR PRECIOS VIA API =====
async function updateAllPrices() {
  if (holdings.length === 0) {
    showToast("⚠️ No holdings to update", "warning")
    return
  }

  // Mostrar loading
  updatePricesBtn.innerHTML = '<span class="spinner"></span> Updating...'
  updatePricesBtn.disabled = true

  try {
    // Separar criptos de acciones
    const cryptoHoldings = holdings.filter((holding) => isCrypto(holding.symbol))
    const stockHoldings = holdings.filter((holding) => !isCrypto(holding.symbol))

    // Actualizar criptos
    if (cryptoHoldings.length > 0) {
      await updateCryptoPrices(cryptoHoldings)
    }

    // Actualizar acciones (simulado)
    if (stockHoldings.length > 0) {
      await updateStockPrices(stockHoldings)
    }

    // Guardar cambios
    saveHoldingsToStorage()
    updateUI()

    showToast("✅ Prices updated successfully", "success")
  } catch (error) {
    console.error("Error updating prices:", error)
    showToast("❌ Error updating prices", "error")
  } finally {
    // Restaurar botón
    updatePricesBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span>Update Prices</span>'
    updatePricesBtn.disabled = false
  }
}

// ===== ACTUALIZAR PRECIOS DE CRIPTOS =====
async function updateCryptoPrices(cryptoHoldings) {
  const symbols = cryptoHoldings.map((holding) => symbolMapping[holding.symbol]).filter(Boolean)

  if (symbols.length === 0) return

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbols.join(",")}&vs_currencies=usd`

  try {
    const response = await fetch(url)
    const data = await response.json()

    cryptoHoldings.forEach((holding) => {
      const symbolId = symbolMapping[holding.symbol]
      if (data[symbolId] && data[symbolId].usd) {
        holding.currentPrice = data[symbolId].usd
        holding.marketValue = holding.shares * holding.currentPrice
      }
    })
  } catch (error) {
    console.error("Error fetching crypto prices:", error)
    throw error
  }
}

// ===== ACTUALIZAR PRECIOS DE ACCIONES (SIMULADO) =====
async function updateStockPrices(stockHoldings) {
  stockHoldings.forEach((holding) => {
    // Simular cambio de precio entre -3% y +3%
    const changePercent = (Math.random() - 0.5) * 0.06 // -3% a +3%
    holding.currentPrice = holding.currentPrice * (1 + changePercent)
    holding.marketValue = holding.shares * holding.currentPrice
  })

  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

// ===== VERIFICAR SI ES CRIPTO =====
function isCrypto(symbol) {
  const cryptoSymbols = [
    "BTC",
    "ETH",
    "ADA",
    "DOT",
    "LINK",
    "UNI",
    "LTC",
    "BCH",
    "XRP",
    "DOGE",
    "MATIC",
    "SOL",
    "AVAX",
    "ATOM",
  ]
  return cryptoSymbols.includes(symbol)
}

// ===== TOGGLE AUTO UPDATE =====
function toggleAutoUpdate() {
  if (autoUpdateCheckbox.checked) {
    // Activar auto-update cada 5 minutos
    autoUpdateInterval = setInterval(updateAllPrices, 5 * 60 * 1000)
    localStorage.setItem("autoUpdateEnabled", "true")
    showNotification("🔄 Auto-actualización activada (cada 5 min)", "success")
  } else {
    // Desactivar auto-update
    if (autoUpdateInterval) {
      clearInterval(autoUpdateInterval)
      autoUpdateInterval = null
    }
    localStorage.setItem("autoUpdateEnabled", "false")
    showNotification("⏸️ Auto-actualización desactivada", "warning")
  }
}

// ===== CARGAR CONFIGURACIÓN AUTO-UPDATE =====
function loadAutoUpdateSettings() {
  const autoUpdateEnabled = localStorage.getItem("autoUpdateEnabled") === "true"
  const lastUpdate = localStorage.getItem("lastPriceUpdate")

  autoUpdateCheckbox.checked = autoUpdateEnabled

  if (lastUpdate) {
    lastUpdateTime.textContent = new Date(lastUpdate).toLocaleString()
  }

  if (autoUpdateEnabled) {
    autoUpdateInterval = setInterval(updateAllPrices, 5 * 60 * 1000)
  }
}

// ===== ELIMINAR POSICIÓN =====
function removeHolding(holdingId) {
  const holdingIndex = holdings.findIndex((holding) => holding.id === holdingId)

  if (holdingIndex !== -1) {
    const holding = holdings[holdingIndex]

    if (confirm(`Are you sure you want to sell all ${holding.symbol} shares?`)) {
      // Registrar transacción de venta
      addTransaction(holding.symbol, "sell", holding.shares, holding.currentPrice, holding.marketValue)

      holdings.splice(holdingIndex, 1)

      showToast(`🗑️ Sold all ${holding.symbol} shares`, "warning")

      // Guardar cambios
      saveHoldingsToStorage()
      updateUI()

      console.log("🗑️ Posición eliminada:", holding.symbol)
    }
  }
}

// ===== ACTUALIZAR INTERFAZ =====
function updateUI() {
  updateDashboardCards()
  updateHoldingsTable()
  updateChart()
  updateProjections()
  updateTransactionsList()
  toggleEmptyStates()
  updateStatsCards()
  updateAssetsTable()
  updateContributionsSection()
  // updateTransactionsTable() // Removed due to undeclared variable
  toggleEmptyState()
  updatePerformanceChart()
}

// ===== ACTUALIZAR CARDS DEL DASHBOARD =====
function updateDashboardCards() {
  const totalMarketValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
  const totalCost = holdings.reduce((sum, holding) => sum + holding.totalCost, 0)
  const totalGainLoss = totalMarketValue - totalCost
  const totalGainPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

  // Balance total
  totalBalanceElement.textContent = `$${totalMarketValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  // Total invertido
  totalInvestedElement.textContent = `$${totalCost.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  // Número de activos
  totalAssetsElement.textContent = holdings.length

  // Cambio total
  const changeClass = totalGainLoss >= 0 ? "positive" : "negative"
  const changeIcon = totalGainLoss >= 0 ? "+" : ""

  totalChangeElement.className = `card-change ${changeClass}`
  totalChangeElement.innerHTML = `
    <span class="change-amount">${changeIcon}$${Math.abs(totalGainLoss).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</span>
    <span class="change-percent">(${changeIcon}${Math.abs(totalGainPercent).toFixed(2)}%)</span>
  `

  // Animaciones
  totalBalanceElement.classList.add("scale-in")
  setTimeout(() => totalBalanceElement.classList.remove("scale-in"), 200)
}

// ===== ACTUALIZAR TABLA DE POSICIONES =====
function updateHoldingsTable() {
  holdingsTableBody.innerHTML = ""

  // Ordenar por valor de mercado (mayor a menor)
  const sortedHoldings = [...holdings].sort((a, b) => b.marketValue - a.marketValue)

  sortedHoldings.forEach((holding) => {
    const row = document.createElement("tr")
    row.classList.add("fade-in")

    // Calcular ganancia/pérdida
    const gainLoss = holding.marketValue - holding.totalCost
    const gainPercent = (gainLoss / holding.totalCost) * 100

    let gainClass = "gain-neutral"
    if (gainLoss > 0) {
      gainClass = "gain-positive"
    } else if (gainLoss < 0) {
      gainClass = "gain-negative"
    }

    row.innerHTML = `
      <td>
        <div class="asset-symbol">
          <div class="asset-icon" style="background-color: ${holding.color}">
            ${holding.symbol.charAt(0)}
          </div>
          <strong>${holding.symbol}</strong>
        </div>
      </td>
      <td>${holding.shares.toLocaleString("en-US", { maximumFractionDigits: 3 })}</td>
      <td>$${holding.avgCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
      <td>$${holding.currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
      <td><strong>$${holding.marketValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
      <td class="${gainClass}">
        $${gainLoss.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </td>
      <td class="${gainClass}">
        ${gainPercent.toFixed(2)}%
      </td>
      <td>
        <button class="btn-danger" onclick="removeHolding(${holding.id})" title="Sell all shares">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `

    holdingsTableBody.appendChild(row)
  })
}

// ===== ACTUALIZAR LISTA DE TRANSACCIONES =====
function updateTransactionsList() {
  transactionsList.innerHTML = ""

  transactions.slice(0, 10).forEach((transaction) => {
    // Mostrar solo las últimas 10
    const transactionItem = document.createElement("div")
    transactionItem.className = "transaction-item fade-in"

    const date = new Date(transaction.date).toLocaleDateString()
    const time = new Date(transaction.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    transactionItem.innerHTML = `
      <div class="transaction-left">
        <div class="transaction-icon ${transaction.type}">
          <i class="fas fa-${transaction.type === "buy" ? "plus" : "minus"}"></i>
        </div>
        <div class="transaction-details">
          <h4>${transaction.type.toUpperCase()} ${transaction.symbol}</h4>
          <p>${transaction.shares} shares @ $${transaction.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="transaction-right">
        <div class="transaction-amount">$${transaction.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
        <div class="transaction-date">${date} ${time}</div>
      </div>
    `

    transactionsList.appendChild(transactionItem)
  })
}

// ===== ACTUALIZAR PROYECCIONES =====
function updateProjections() {
  const currentBalance = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)

  if (currentBalance === 0) {
    projection8Element.textContent = "$0.00"
    projection12Element.textContent = "$0.00"
    projection15Element.textContent = "$0.00"
    gain8Element.textContent = "+$0.00 gain"
    gain12Element.textContent = "+$0.00 gain"
    gain15Element.textContent = "+$0.00 gain"
    return
  }

  // Calcular proyecciones a 1 año
  const projection8 = currentBalance * 1.08
  const projection12 = currentBalance * 1.12
  const projection15 = currentBalance * 1.15

  const gain8 = projection8 - currentBalance
  const gain12 = projection12 - currentBalance
  const gain15 = projection15 - currentBalance

  // Actualizar elementos
  projection8Element.textContent = `$${projection8.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  projection12Element.textContent = `$${projection12.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  projection15Element.textContent = `$${projection15.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  gain8Element.textContent = `+$${gain8.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} gain`

  gain12Element.textContent = `+$${gain12.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} gain`

  gain15Element.textContent = `+$${gain15.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} gain`
}

// ===== ACTUALIZAR TARJETAS DE ESTADÍSTICAS =====
function updateStatsCards() {
  const totalBalance = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
  const totalAssetsCount = holdings.length

  // Formatear el balance total con separadores de miles
  totalBalanceElement.textContent = `$${totalBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  totalAssetsElement.textContent = totalAssetsCount

  // Agregar animación a los números
  totalBalanceElement.classList.add("scale-in")
  totalAssetsElement.classList.add("scale-in")

  setTimeout(() => {
    totalBalanceElement.classList.remove("scale-in")
    totalAssetsElement.classList.remove("scale-in")
  }, 300)
}

// ===== CALCULAR PROYECCIÓN CON APORTES =====
function calculateProjectionWithContributions(initialAmount, monthlyContribution, annualRate) {
  const monthlyRate = annualRate / 12
  let balance = initialAmount

  // Simular 12 meses con aportes y crecimiento
  for (let month = 0; month < 12; month++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution
  }

  return balance
}

// ===== ACTUALIZAR SECCIÓN DE APORTES =====
function updateContributionsSection() {
  contributionsGrid.innerHTML = ""

  if (holdings.length === 0) {
    contributionsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-calendar-alt"></i>
        <p>Agrega activos para configurar aportes mensuales</p>
      </div>
    `
    return
  }

  holdings.forEach((holding) => {
    const contributionCard = document.createElement("div")
    contributionCard.className = "contribution-card fade-in"

    contributionCard.innerHTML = `
      <div class="contribution-header">
        <div class="contribution-asset">
          <span class="asset-color-indicator" style="background-color: ${holding.color}"></span>
          ${holding.symbol}
        </div>
      </div>
      <div class="contribution-form">
        <input 
          type="number" 
          class="contribution-input" 
          placeholder="Aporte mensual USD"
          value="${holding.monthlyContribution || ""}"
          onchange="updateMonthlyContribution(${holding.id}, this.value)"
          step="0.01"
          min="0"
        >
        <button class="btn-contribution" onclick="updateMonthlyContribution(${holding.id}, document.querySelector('input[onchange*=\\'${holding.id}\\']').value)">
          <i class="fas fa-save"></i>
        </button>
      </div>
      <div class="contribution-info">
        <div>Aporte anual: $${((holding.monthlyContribution || 0) * 12).toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
        <div>Cantidad actual: ${holding.shares.toLocaleString("en-US")} unidades</div>
      </div>
    `

    contributionsGrid.appendChild(contributionCard)
  })
}

// ===== ACTUALIZAR TABLA DE ACTIVOS CON GANANCIA/PÉRDIDA =====
function updateAssetsTable() {
  // Limpiar tabla
  assetsTableBody.innerHTML = ""

  // Ordenar activos por valor total (mayor a menor)
  const sortedAssets = [...holdings].sort((a, b) => b.marketValue - a.marketValue)

  sortedAssets.forEach((holding) => {
    const row = document.createElement("tr")
    row.classList.add("fade-in")

    // Calcular ganancia/pérdida
    const gainLoss = holding.currentPrice - holding.avgCost
    const gainPercent = (gainLoss / holding.avgCost) * 100

    let gainClass = "gain-neutral"
    let gainIcon = ""
    if (gainLoss > 0) {
      gainClass = "gain-positive"
      gainIcon = "📈"
    } else if (gainLoss < 0) {
      gainClass = "gain-negative"
      gainIcon = "📉"
    }

    row.innerHTML = `
            <td>
                <span class="asset-color-indicator" style="background-color: ${holding.color}"></span>
                <strong>${holding.symbol}</strong>
            </td>
            <td>${holding.shares.toLocaleString("en-US")}</td>
            <td>$${holding.avgCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td>$${holding.currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="${gainClass}">
                ${gainIcon} $${gainLoss.toLocaleString("en-US", { minimumFractionDigits: 2 })} 
                (${gainPercent.toFixed(2)}%)
            </td>
            <td><strong>$${holding.marketValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
            <td>
                <button class="btn-danger" onclick="removeHolding(${holding.id})" title="Eliminar activo">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `

    assetsTableBody.appendChild(row)
  })
}

// ===== MOSTRAR/OCULTAR ESTADO VACÍO =====
function toggleEmptyState() {
  if (holdings.length === 0) {
    emptyState.style.display = "block"
    document.getElementById("holdings-tbody")
.style.display = "none"
  } else {
    emptyState.style.display = "none"
    document.getElementById("holdings-tbody")
.style.display = "table"
  }
}

// ===== MOSTRAR/OCULTAR ESTADOS VACÍOS =====
function toggleEmptyStates() {
  // Holdings
  if (holdings.length === 0) {
    emptyHoldings.style.display = "block"
    document.getElementById("holdings-table").style.display = "none"
  } else {
    emptyHoldings.style.display = "none"
    document.getElementById("holdings-table").style.display = "table"
  }

  // Transactions
  if (transactions.length === 0) {
    emptyTransactions.style.display = "block"
    transactionsList.style.display = "none"
  } else {
    emptyTransactions.style.display = "none"
    transactionsList.style.display = "block"
  }
}

// ===== INICIALIZAR GRÁFICO =====
function initPortfolioChart() {
  const ctx = document.getElementById("portfolio-chart").getContext("2d")

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderColor: "#16213e",
          borderWidth: 3,
          hoverBorderWidth: 4,
          hoverBorderColor: "#6366f1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#e2e8f0",
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
              weight: "500",
              family: "Inter",
            },
          },
        },
        tooltip: {
          backgroundColor: "#1a1a2e",
          titleColor: "#ffffff",
          bodyColor: "#e2e8f0",
          borderColor: "#6366f1",
          borderWidth: 2,
          cornerRadius: 8,
          callbacks: {
            label: (context) => {
              const label = context.label || ""
              const value = context.parsed
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: $${value.toLocaleString()} (${percentage}%)`
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 800,
        easing: "easeOutQuart",
      },
    },
  })

  console.log("📊 Chart initialized")
}

// ===== ACTUALIZAR GRÁFICO =====
function updateChart() {
  if (!chart) return

  if (holdings.length === 0) {
    chart.data.labels = ["No holdings"]
    chart.data.datasets[0].data = [1]
    chart.data.datasets[0].backgroundColor = ["#334155"]
  } else {
    chart.data.labels = holdings.map((holding) => holding.symbol)
    chart.data.datasets[0].data = holdings.map((holding) => holding.marketValue)
    chart.data.datasets[0].backgroundColor = holdings.map((holding) => holding.color)
  }

  chart.update("active")
}

// ===== EXPORTAR A CSV =====
function exportToCSV() {
  if (holdings.length === 0) {
    showToast("⚠️ No data to export", "warning")
    return
  }

  let csvContent = "Symbol,Shares,Avg Cost,Current Price,Market Value,Gain/Loss,Return %,Date Added\n"

  holdings.forEach((holding) => {
    const gainLoss = holding.marketValue - holding.totalCost
    const gainPercent = (gainLoss / holding.totalCost) * 100

    csvContent += `${holding.symbol},${holding.shares},${holding.avgCost.toFixed(2)},${holding.currentPrice.toFixed(2)},${holding.marketValue.toFixed(2)},${gainLoss.toFixed(2)},${gainPercent.toFixed(2)}%,${new Date(holding.dateAdded).toLocaleDateString()}\n`
  })

  // Agregar resumen
  const totalMarketValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
  const totalCost = holdings.reduce((sum, holding) => sum + holding.totalCost, 0)
  const totalGainLoss = totalMarketValue - totalCost
  const totalReturn = (totalGainLoss / totalCost) * 100

  csvContent += `\nSUMMARY\n`
  csvContent += `Total Invested,${totalCost.toFixed(2)}\n`
  csvContent += `Market Value,${totalMarketValue.toFixed(2)}\n`
  csvContent += `Total Gain/Loss,${totalGainLoss.toFixed(2)}\n`
  csvContent += `Total Return %,${totalReturn.toFixed(2)}%\n`

  // Descargar archivo
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `portfolio-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  showToast("📊 Portfolio exported to CSV", "success")
}

// ===== LIMPIAR HISTORIAL =====
function clearTransactionHistory() {
  if (confirm("Are you sure you want to clear all transaction history?")) {
    transactions = []
    saveTransactionsToStorage()
    updateTransactionsList()
    toggleEmptyStates()
    showToast("🧹 Transaction history cleared", "warning")
  }
}

// ===== GUARDAR EN LOCALSTORAGE =====
function saveHoldingsToStorage() {
  try {
    localStorage.setItem("portfolioHoldings", JSON.stringify(holdings))
    console.log("💾 Holdings saved to localStorage")
  } catch (error) {
    console.error("❌ Error saving holdings:", error)
    showToast("Error saving data", "error")
  }
}

function saveTransactionsToStorage() {
  try {
    localStorage.setItem("portfolioTransactions", JSON.stringify(transactions))
    console.log("💾 Transactions saved to localStorage")
  } catch (error) {
    console.error("❌ Error saving transactions:", error)
  }
}

// ===== CARGAR DESDE LOCALSTORAGE =====
function loadHoldingsFromStorage() {
  try {
    const savedHoldings = localStorage.getItem("portfolioHoldings")
    if (savedHoldings) {
      holdings = JSON.parse(savedHoldings)

      // Asegurar que cada holding tenga todas las propiedades necesarias
      holdings.forEach((holding, index) => {
        if (!holding.color) {
          holding.color = chartColors[index % chartColors.length]
        }
        if (!holding.id) {
          holding.id = Date.now() + index
        }
        if (!holding.dateAdded) {
          holding.dateAdded = new Date().toISOString()
        }
      })

      console.log("📂 Holdings loaded from localStorage:", holdings.length, "positions")
    }
  } catch (error) {
    console.error("❌ Error loading holdings:", error)
    holdings = []
    showToast("Error loading saved data", "error")
  }
}

function loadTransactionsFromStorage() {
  try {
    const savedTransactions = localStorage.getItem("portfolioTransactions")
    if (savedTransactions) {
      transactions = JSON.parse(savedTransactions)
      console.log("📂 Transactions loaded from localStorage:", transactions.length, "transactions")
    }
  } catch (error) {
    console.error("❌ Error loading transactions:", error)
    transactions = []
  }
}

// ===== MOSTRAR TOAST =====
function showToast(message, type = "success") {
  const toast = document.createElement("div")
  toast.className = `toast ${type} fade-in`

  const iconMap = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
  }

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${iconMap[type]}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `

  toastContainer.appendChild(toast)

  // Auto-remove after 4 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove()
    }
  }, 4000)

  console.log(`📢 Toast (${type}):`, message)
}

// ===== MOSTRAR NOTIFICACIÓN =====
function showNotification(message, type = "success") {
  notificationText.textContent = message
  notification.className = `notification ${type}`
  notification.style.display = "flex"

  setTimeout(() => {
    hideNotification()
  }, 4000)

  console.log(`📢 Notificación (${type}):`, message)
}

// ===== OCULTAR NOTIFICACIÓN =====
function hideNotification() {
  notification.style.display = "none"
}

// ===== FUNCIONES DE DEBUGGING =====
function clearAllData() {
  if (confirm("Are you sure you want to clear all portfolio data and transactions?")) {
    holdings = []
    transactions = []
    localStorage.removeItem("portfolioHoldings")
    localStorage.removeItem("portfolioTransactions")
    updateUI()
    showToast("🧹 All data cleared - Ready for new investments!", "warning")
    console.log("🧹 All portfolio data cleared")
  }
}

function exportData() {
  const allData = {
    holdings: holdings,
    transactions: transactions,
    exportDate: new Date().toISOString(),
  }

  const dataStr = JSON.stringify(allData, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
  showToast("📤 Complete backup exported!", "success")
  console.log("📤 Complete backup exported successfully")
}

function addTestData() {
  const testHoldings = [
    {
      id: Date.now() + 1,
      symbol: "AAPL",
      shares: 10,
      avgCost: 150,
      currentPrice: 175,
      totalCost: 1500,
      marketValue: 1750,
      color: chartColors[0],
      dateAdded: new Date().toISOString(),
    },
    {
      id: Date.now() + 2,
      symbol: "BTC",
      shares: 0.5,
      avgCost: 40000,
      currentPrice: 45000,
      totalCost: 20000,
      marketValue: 22500,
      color: chartColors[1],
      dateAdded: new Date().toISOString(),
    },
    {
      id: Date.now() + 3,
      symbol: "SPY",
      shares: 25,
      avgCost: 400,
      currentPrice: 450,
      totalCost: 10000,
      marketValue: 11250,
      color: chartColors[2],
      dateAdded: new Date().toISOString(),
    },
  ]

  holdings.push(...testHoldings)

  // Agregar transacciones de prueba
  testHoldings.forEach((holding) => {
    addTransaction(holding.symbol, "buy", holding.shares, holding.avgCost, holding.totalCost)
  })

  saveHoldingsToStorage()
  updateUI()
  showToast("🎯 Test portfolio with gains loaded!", "success")
}

// Agregar esta función después de updateUI()
function initPerformanceChart() {
  const ctx = document.getElementById("performance-chart").getContext("2d")

  performanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Portfolio Value",
          data: [],
          borderColor: "#ff6b35",
          backgroundColor: "rgba(255, 107, 53, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#ff6b35",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#ffffff",
          bodyColor: "#e0e0e0",
          borderColor: "#ff6b35",
          borderWidth: 2,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: {
            color: "#333333",
          },
          ticks: {
            color: "#a0a0a0",
          },
        },
        y: {
          grid: {
            color: "#333333",
          },
          ticks: {
            color: "#a0a0a0",
            callback: (value) => "$" + value.toLocaleString(),
          },
        },
      },
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
    },
  })
}

// ===== ACTUALIZAR GRÁFICO DE RENDIMIENTO =====
function updatePerformanceChart() {
  if (!performanceChart) return

  // Generar datos de ejemplo para los últimos 6 meses
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)

  // Simular valores históricos
  const values = []
  for (let i = 0; i < 6; i++) {
    const variation = (Math.random() - 0.5) * 0.2 // ±10% variation
    values.push(currentValue * (1 + variation * (i / 6)))
  }
  values[5] = currentValue // El último mes es el valor actual

  performanceChart.data.labels = months
  performanceChart.data.datasets[0].data = values
  performanceChart.update("active")

  // Actualizar estadísticas
  const bestValue = Math.max(...values)
  const worstValue = Math.min(...values)
  const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length

  document.getElementById("best-month-value").textContent = `+$${(bestValue - avgValue).toFixed(2)}`
  document.getElementById("worst-month-value").textContent = `-$${(avgValue - worstValue).toFixed(2)}`
  document.getElementById("avg-month-value").textContent = `$${avgValue.toFixed(2)}`
}

// Agregar funciones al objeto window
window.portfolioDebug = {
  clearAllData,
  exportData,
  addTestData,
  updatePrices: updateAllPrices,
  showHoldings: () => console.table(holdings),
  showTransactions: () => console.table(transactions),
  getStats: () => {
    const totalMarketValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
    const totalCost = holdings.reduce((sum, holding) => sum + holding.totalCost, 0)
    const totalGainLoss = totalMarketValue - totalCost
    const totalReturn = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

    return {
      marketValue: totalMarketValue,
      totalCost: totalCost,
      gainLoss: totalGainLoss,
      returnPercent: totalReturn.toFixed(2) + "%",
      holdings: holdings.length,
      transactions: transactions.length,
    }
  },
}

console.log("🎯 Modern Investment Portfolio loaded. Use portfolioDebug in console for advanced functions.")
