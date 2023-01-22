import { Rating } from "@mui/material";
import styles from "./itembox.module.css";

interface ItemBoxProps {
  productName: string,
  productLink: string,
  price: number,
  rating: number,
  imageHash: string
}

export default function ItemBox(props: ItemBoxProps) {
  return (
    <div className={styles.itembox}>
      <div>
        <img src={`https://gateway.pinata.cloud/ipfs/${props.imageHash}`}></img>
      </div>
      <div>
        <p>{props.productName}</p>
        <p><a href={props.productLink}>{props.productLink}</a></p>
        <p>Rs {props.price}</p>
        <Rating
          name="half-rating-read"
          defaultValue={props.rating}
          precision={1}
          readOnly
        />
      </div>
    </div>
  );
}
