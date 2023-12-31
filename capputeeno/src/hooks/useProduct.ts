import { ProductFetchResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const query = (productId: string) => {
    return(
        `
        query {
            Product(id: "${productId}"){
                name
                description
                category
                price_in_cents
                image_url
            }
        }
        `
    )
}

const fetcher = (productId: string): AxiosPromise<ProductFetchResponse> => {
    return axios.post(API_URL, { query: query(productId) })
}

export function useProduct(id: string) {
    const { data } = useQuery({
        queryFn: () => fetcher(id),
        queryKey: ['product', id],
        enabled: !!id,
        staleTime: 1000 * 60 * 5  // 5 minutes of cache duration
    });

    return {
        data: data?.data?.data?.Product
    }
}
