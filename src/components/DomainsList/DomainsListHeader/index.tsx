import styles from "./DomainsListHeader.module.scss";

const DomainsListHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerDomain}>
                <p className={styles.headerText}>Домен</p>
            </div>
            <div className={styles.headerStatus}>
                <p className={styles.headerText}>Статус</p>
            </div>
            <div className={styles.headerButtons}>
                Управление
            </div>
        </div>
    );
};

export default DomainsListHeader;
