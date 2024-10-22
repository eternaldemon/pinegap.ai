import { customerApi } from "@/api/customer";
import { CustomerImagesConfig } from "@/constants/customer-images";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";

export const useGetRandomPhotoGridQuery = (customerId: number, width: number = CustomerImagesConfig.width, height: number = CustomerImagesConfig.height) => {
    const {data, isLoading, isError, isSuccess, error} = useQuery({
        enabled: !!customerId,
        queryKey: ['get-random-photo-grid', customerId, width, height],
        queryFn: async () => await customerApi.getPhotos(undefined, width, height),
        refetchInterval: 10000
    });

    useEffect(() => {
        if(isError) {
            // show error notification, using alert for now
            alert(error?.message ?? 'Error occured while trying to fetch the photo grid!');
        }
    }, [error?.message, isError]);

    return {
        photoGrid: data ?? [],
        isPhotoGridBeingFetched: isLoading,
        // not adding the flag for isPending || isFetching so that user interaction is not blocked on changing the selected customer
        isPhotoGridFetchSuccess: isSuccess,
        isPhotoGridFetchError: isError,
        photoGridFetchError: error
    }
};

export const useGetCustomerListQuery = () => {
    const {data, isLoading, isError, isSuccess, error} = useQuery({
        queryKey: ['get-customer-list'],
        queryFn: async () => await customerApi.getCustomerList(),
    });

    useEffect(() => {
        if(isError) {
            // show error notification, using alert for now
            alert(error?.message ?? 'Error occured while trying to fetch the customer list!');
        }
    }, [error?.message, isError]);

    return {
        customerList: data ?? [],
        isCustomerListBeingFetched: isLoading,
        isCustomerListFetchSuccess: isSuccess,
        isCustomerListFetchError: isError,
        CustomerListFetchError: error
    }
}