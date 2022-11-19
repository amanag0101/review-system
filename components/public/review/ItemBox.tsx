import styles from "./itembox.module.css";

export default function ItemBox() {
    return (
        <div className={styles.itembox}>
            <div>
                <img src="/img/working.png"></img>
            </div>
            <div>
                <p>Product Name</p>
                <p>Average Price</p>
                <p>Rating</p>
            </div>
        </div>
    );
}