import React from 'react'
import styles from"../Header/Header.module.css"

export default function index() {
  return (
    <div className={styles.headerSection}>
        {/* Link BOTIRDEV */}
        <a className={styles.botirdevLink} target='_blank' href="https://www.botirdev.uz">BOTIRDEV</a>
        {/* Link ILHOMLANDIM */}
        <span className={styles.poweredBy}>Powered by: <a className={styles.ilhomlandimLink} target='_blank' href="https://www.ilhomlandim.uz">Ilhomlandim</a></span>
        {/* Button Dark Mode */}
        <button className={styles.darkMode}>Dark Mode</button>
    </div>
  )
}