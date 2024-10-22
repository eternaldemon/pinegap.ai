import { Customer } from "@/interfaces/customer";

export const customerApi = {
    async getPhotos(noOfImages: number = 9, width: number = 200, height: number = 200): Promise<string[]> {
        const photoPromises = Array.from({ length: noOfImages }, () =>
            fetch(`https://picsum.photos/${width}/${height}?random=${noOfImages}`).then(res => res.url)
        );
        return Promise.all(photoPromises);
    },
    async getCustomerList(noOfCustomers: number = 1000): Promise<Customer[]>{
        return Array.from({ length: noOfCustomers }, (_, index) => ({
            id: index + 1,
            name: `Customer ${index + 1}`,
            title: `Title ${index + 1}`,
            address: `Address ${index + 1}`,
        }));
    }
}