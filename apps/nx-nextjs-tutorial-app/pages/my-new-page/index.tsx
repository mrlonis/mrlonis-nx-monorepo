import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface MyNewPageProps {}

export function MyNewPage(_props: MyNewPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MyNewPage!</h1>
    </div>
  );
}

export default MyNewPage;
