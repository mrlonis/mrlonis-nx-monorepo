import styles from './nx-react-tutorial-common-ui.module.scss';

/* eslint-disable-next-line */
export interface NxReactTutorialCommonUiProps {}

export function NxReactTutorialCommonUi(_props: NxReactTutorialCommonUiProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <div className={styles['container']}>
      <h1>Welcome to NxReactTutorialCommonUi!</h1>
    </div>
  );
}

export default NxReactTutorialCommonUi;
