import Searchbar from "../searchbar/Searchbar";
import Filter from "../filter/Filter";
import styles from "./review.module.css";
import ItemBox from "./ItemBox";

export default function Review() {
    return (
        <div className={styles.review}>
            <div className={styles.searchbar}>
                <Searchbar width={50} />
            </div>

            <div className={styles["container"]}>
                <div className={styles["col-1"]}>
                    <Filter />
                </div>
                <div className={styles["col-2"]}>
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                    <ItemBox />
                </div>
            </div>
        </div>
    );
}