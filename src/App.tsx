import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobaStyle } from "./styles/globals"
import { Transactions } from "./pages/Transactions"
import { TransactionsProvaider } from "./contexts/TransactionsContext"


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobaStyle />

      <TransactionsProvaider>
        <Transactions />
      </TransactionsProvaider>
    </ThemeProvider>
  )
}

