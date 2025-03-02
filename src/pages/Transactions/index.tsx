import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

export function Transactions() {
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
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transactions => {
                            return (
                                <tr key={transactions.id}>
                                    <td width="40%">{transactions.description}</td>
                                    <td>
                                        <PriceHighlight variant={transactions.type}>R$ {transactions.price},00</PriceHighlight>
                                    </td>
                                    <td>{transactions.category}</td>
                                    <td>{transactions.createdAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}