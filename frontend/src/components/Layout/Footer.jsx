import styles from './Footer.module.css'

export default function Navbar(){
    return (
        <footer className={styles.footer} id="footer">
            <p>
                Fã ou Hater copy &copy; {new Date().getFullYear()}
            </p>
        </footer>
    )
}