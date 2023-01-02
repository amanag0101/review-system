import SearchIcon from '@mui/icons-material/Search';
import styles from "./searchbar.module.css";

interface SearchbarProps {
    width: number
}

interface SearchbarStyle {
    width: string
}

export default function Searchbar(props: SearchbarProps) {
    const searchbarStyle: SearchbarStyle = {
        width: props.width + "%"
    }

    return (
        <div className={styles.searchbar} style={searchbarStyle}>
            <div className={styles["col-1"]}>
                <input type="text" placeholder="Search"/>
            </div>
            <div className={styles["col-2"]}>       
                <SearchIcon className="icon" />
            </div>
        </div>
    );  
}