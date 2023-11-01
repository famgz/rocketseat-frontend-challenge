"use client"

import { BackBtn } from "@/components/back-button";
import { CartItem } from "@/components/cart/cart-item";
import { DefaultPageLayout } from "@/components/default-page-layour";
import { Divider } from "@/components/divider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import styled from "styled-components";

const EmptyCartMessage = styled.div<{ hasItems: boolean }>`
    display: ${props => props.hasItems ? "none" : "flex"};
    flex-direction: column;
    align-items: center;

    p:first-child {
        font-weight: 600;
        font-size: 40px;
        line-height: 200%;
        text-transform: uppercase;
        color: var(--text-dark);
    }

    p {
        font-weight: 400;
        font-size: 20px;
        line-height: 200%;
    }

    a {
        color: white;
        border-radius: 4px;
        width: 50%;
        height: 44px;
        margin-top: 40px;
        background: var(--success-color);
        border: none;
        font-size: 16px;
        font-weight: 500;
        padding: 8px 12px;
        cursor: pointer;
        text-transform: uppercase;
        text-decoration: none;
        text-align: center;
    }
`

const Container = styled.div<{ hasItems: boolean }>`
    display: ${props => props.hasItems ? "flex" : "none"};
    justify-content: center;
    flex-direction: column;
    gap: 32px;
    
    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        flex-direction: row;
    }
`

const CartListContainer = styled.div`

    h3 {
        font-size: 24px;
        font-weight: 500;
        line-height: 150%;
        text-transform: uppercase;
        color: var(--text-darker);
        margin-top: 24px;
    }

    p {
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;
        color: var(--text-darker);

        span {
            font-weight: 600;
        }
    }
`

const CartList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
`

const CartResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 352px;
    padding: 16px 24px;

    background: white;

    h3 {
        font-weight: 600;
        font-size: 20px;
        color: var(--text-darker);
        text-transform: uppercase;
        margin-bottom: 30px;
    }
`

const TotalItem = styled.div<{ isBold: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    font-weight: ${props => props.isBold ? '600' : '400'};
    font-size: 16px;
    line-height: 150%;
`

const ShopBtn = styled.button`
    color: white;
    border-radius: 4px;
    width: 100%;
    height: 44px;
    margin-top: 40px;
    background: var(--success-color);
    border: none;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 12px;
    cursor: pointer;
`

export default function CartPage() {
    const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", [])

    const calculateTotalPrice = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
    }

    const calculateTotalItens = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += item.quantity, 0)
    }

    const cartTotalItems = calculateTotalItens(value)
    const cartTotalPrice = calculateTotalPrice(value)
    const formattedCartTotal = formatPrice(cartTotalPrice)
    const shipping = cartTotalPrice > 90000 || cartTotalPrice === 0 ? 0 : 4000
    const formattedShipping = formatPrice(shipping)
    const cartTotalWithShipping = cartTotalPrice + shipping
    const formattedCartTotalWithShipping = formatPrice(cartTotalWithShipping)

    const handleDeleteItem = (id: string) => {
        const newValue = value.filter(item => {
            if (item.id !== id) return item
        })
        updateLocalStorage(newValue)
    }

    const handleUpdateQuantity = (id: string, quantity: number) => {
        const newValue = value.map(item => {
            if (item.id !== id) return item
            return { ...item, quantity: quantity }
        })
        updateLocalStorage(newValue)
    }

    return (
        <DefaultPageLayout>
            <BackBtn navigate="/" />
            <EmptyCartMessage hasItems={cartTotalItems}>
                <p>Seu carrinho está vazio!</p>
                <p>Navegue pelas categorias e escolha produtos para adicionar ao carrinho de compras</p>
                <Link href="/">Continuar Comprando</Link>
            </EmptyCartMessage>
            <Container hasItems={cartTotalItems}>
                <CartListContainer>
                    <h3>Seu carrinho</h3>
                    <p>
                        Total {cartTotalItems} produtos
                        <span>{formattedCartTotal}</span>
                    </p>
                    <CartList>
                        {value.map(item =>
                            <CartItem
                                product={item}
                                key={item.id}
                                handleDeleteItem={handleDeleteItem}
                                handleUpdateQuantity={handleUpdateQuantity}
                            />)}
                    </CartList>
                </CartListContainer>
                <CartResultContainer>
                    <h3>Resumo do Pedido</h3>
                    <TotalItem isBold={false}>
                        <p>Subtotal de produtos</p>
                        <p>{formattedCartTotal}</p>
                    </TotalItem>
                    <TotalItem isBold={false}>
                        <p>Entrega {!shipping && cartTotalPrice ? "(grátis)" : ""}</p>
                        <p>{formattedShipping}</p>
                    </TotalItem>
                    <Divider />
                    <TotalItem isBold={true}>
                        <p>Total</p>
                        <p>{formattedCartTotalWithShipping}</p>
                    </TotalItem>
                    <ShopBtn>FINALIZAR COMPRA</ShopBtn>
                </CartResultContainer>
            </Container>
        </DefaultPageLayout>
    )
}
