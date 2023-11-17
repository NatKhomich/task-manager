import React from 'react';
import error from '../../img/error404.jpg'
import styles from './NotFound.module.css'


export const NotFound = () => {
    return (
        <div className={styles.root}>
           <img src={error} alt='error' className={styles.error}  />
        </div>
    );
};
