import { AppElement } from './app.element';

describe('AppElement', () => {
  let app: AppElement;

  beforeEach(() => {
    app = new AppElement();
  });

  it('should create successfully', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(app).toBeTruthy();
  });

  it('should have a greeting', () => {
    app.connectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(app.querySelector('h1').innerHTML).toContain('Welcome events-and-callbacks-interview-question');
  });
});
