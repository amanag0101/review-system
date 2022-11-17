import Searchbar from "../searchbar/Searchbar";
import styles from "./review.module.css";

export default function Review() {
    return (
        <div className={styles.review}>
            <div className={styles.searchbar}>
                <Searchbar width={50} />
            </div>

            <div className={styles["container"]}>
                <div className={styles["col-1"]}>
                    Filter
                </div>
                <div className={styles["col-2"]}>
                    Review
                </div>
            </div>
        </div>
    );
}