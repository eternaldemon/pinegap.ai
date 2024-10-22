import { Customer } from "@/interfaces/customer";
import { useGetRandomPhotoGridQuery } from "@/queries/customer";
import Image from "next/image";
import { CustomerImagesConfig } from "@/constants/customer-images";
import Loader from "../loader/Loader";
import styles from "./CustomerDetails.module.scss";

interface CustomerDetailsProps {
  selectedCustomer: Customer;
}

const IMAGE_CONFIG = CustomerImagesConfig;
const GRID_GAP = 8;

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  selectedCustomer,
}) => {
  const { photoGrid, isPhotoGridBeingFetched } = useGetRandomPhotoGridQuery(
    selectedCustomer.id
  );

  if (isPhotoGridBeingFetched) return <Loader />;

  return (
    <div className={styles.details}>
      <h2>{selectedCustomer.name}</h2>
      <p>{selectedCustomer.title}</p>
      <p>{selectedCustomer.address}</p>
      <div className={styles.photoGrid} style={{width: `${(IMAGE_CONFIG.width + GRID_GAP)*3}px`, gridGap: `${GRID_GAP}px`}}>
        {photoGrid?.map((photo, index) => (
          <div key={index}>
            <Image
              src={photo}
              width={IMAGE_CONFIG.width}
              height={IMAGE_CONFIG.height}
              alt={IMAGE_CONFIG.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
