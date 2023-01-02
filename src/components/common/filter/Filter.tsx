import styles from "./filter.module.css";

export default function Filter() {
    return (
        <div className={styles.filters}>
            <p><b>Filters</b></p>

            <div className={styles.filter}>
                <input type="checkbox" />
                <label>Sort by Price</label>
                <br/>
            </div>

            <div className={styles.filter}>
                <input type="checkbox" />
                <label>Sort by Rating</label>
                <br/>
            </div>
        </div>
    );
}