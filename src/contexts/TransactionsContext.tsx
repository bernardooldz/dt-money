import { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
}

interface TransactionsProvaiderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvaider({ children }: TransactionsProvaiderProps) {

    const [transactions, setTransaction] = useState<Transaction[]>([])

    async function loadTransaction() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json();

        setTransaction(data)
    }

    useEffect(() => {
        loadTransaction();
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}
