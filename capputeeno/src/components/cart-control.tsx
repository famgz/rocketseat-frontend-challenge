import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartIcon } from "./icons/cart-icon";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const CartCount = styled.span`
    display: inline-flex;
    width: 17px;
    height: 17px;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    font-size: 10px;
    /* padding: 2px 5px; */

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
    const router = useRouter()
    const { value } = useLocalStorage('cart-items', [])

    const handleNavigateToCart = () => {
        router.push("/cart")
    }

    let quantity: number = 0;

    value.forEach(item => {
        quantity += item.quantity ?? 0
    })

    return (
        <Container onClick={handleNavigateToCart}>
            <CartIcon></CartIcon>
            {/* { {value.length > 0 && <CartCount>{value.length}</CartCount>} } */}
            {quantity > 0 && <CartCount>{quantity}</CartCount>}
        </Container>
    )
}
