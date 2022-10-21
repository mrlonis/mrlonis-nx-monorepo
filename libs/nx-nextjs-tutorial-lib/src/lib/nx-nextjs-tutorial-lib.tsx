import styles from './nx-nextjs-tutorial-lib.module.scss';

/* eslint-disable-next-line */
export interface NxNextjsTutorialLibProps {}

export function NxNextjsTutorialLib(_props: NxNextjsTutorialLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NxNextjsTutorialLib!</h1>
    </div>
  );
}

export default NxNextjsTutorialLib;
