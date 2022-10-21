import styles from './nx-nextjs-tutorial-publishable-lib.module.scss';

/* eslint-disable-next-line */
export interface NxNextjsTutorialPublishableLibProps {}

export function NxNextjsTutorialPublishableLib(_props: NxNextjsTutorialPublishableLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NxNextjsTutorialPublishableLib!</h1>
    </div>
  );
}

export default NxNextjsTutorialPublishableLib;
