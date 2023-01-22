import { Rating } from "@mui/material";
import styles from "./itembox.module.css";
import { useRouter } from "next/router";

interface ItemBoxProps {
  id: string;
  productName: string;
  productLink: string;
  price: number;
  rating: number;
  imageHash: string;
}

export default function ItemBox(props: ItemBoxProps) {
  const router = useRouter();

  return (
    <div className={styles.itembox}>
      <div>
        <img src={`https://gateway.pinata.cloud/ipfs/${props.imageHash}`}></img>
      </div>
      <div className={styles["item"]}>
        <p
          className={styles["product_name"]}
          onClick={() => {
            router.push(`/reviews/${props.id}`);
          }}
        >
          <b>{props.productName}</b>
        </p>
        <p className={styles["link"]}>
          <a href={props.productLink} target="_blank">
            {props.productLink}
          </a>
        </p>
        <Rating
          name="half-rating-read"
          defaultValue={props.rating}
          precision={1}
          readOnly
        />
        <p>
          <b>Rs {props.price}</b>
        </p>
      </div>
    </div>
  );
}
