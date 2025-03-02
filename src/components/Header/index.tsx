import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../../assets/Logo.svg'
import { NewTransactionModal } from "../NewTrasactionModal";

export function Header() {
    return (
        <div>
            <HeaderContainer>
                <HeaderContent>
                    <img src={logoImg} alt="" />

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <NewTransactionButton>Nova transação</NewTransactionButton>
                        </Dialog.Trigger>

                        <NewTransactionModal />
                    </Dialog.Root>
                </HeaderContent>
            </HeaderContainer>
        </div>
    )
}
