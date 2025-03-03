import { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import { api } from "../lib/axios";

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
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProvaiderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvaider({ children }: TransactionsProvaiderProps) {

    const [transactions, setTransaction] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: {
                q: query,
            }
        })

        setTransaction(response.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}
