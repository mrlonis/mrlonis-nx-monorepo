import styles from './my-new-component.module.scss';

/* eslint-disable-next-line */
export interface MyNewComponentProps {}

export function MyNewComponent(_props: MyNewComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MyNewComponent!</h1>
    </div>
  );
}

export default MyNewComponent;
