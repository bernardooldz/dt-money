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
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProvaiderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvaider({ children }: TransactionsProvaiderProps) {

    const [transactions, setTransaction] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const url = new URL('http://localhost:3333/transactions');

        if (query) {
            url.searchParams.append('q', query);
        }

        const response = await fetch(url)
        const data = await response.json();

        setTransaction(data);
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
