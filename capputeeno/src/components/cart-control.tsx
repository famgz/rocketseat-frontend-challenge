import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartIcon } from "./cart-icon";
import styled from "styled-components";

const CartCount = styled.span`
    width: 17px;
    height: 17px;
    border-radius: 100%;
    padding: 0 5px;
    font-size: 10px;

    background-color: var(--delete-color);
    color: white;

    margin-left: -10px;
`

const Container = styled.button`
    position: relative;
    cursor: pointer;
    border: none;
    background: transparent;
`

export function CartControl() {
    const { value } = useLocalStorage('cart-items', [])

    return (
        <Container>
            <CartIcon></CartIcon>
            {value.length > 0 && <CartCount>{value.length}</CartCount>}
        </Container>
    )
}
