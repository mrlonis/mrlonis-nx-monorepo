export interface AppConfig {
  apiUrl: string;
}

export interface AppWindow extends Window {
  config: AppConfig;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
export const config = (window as AppWindow & typeof globalThis).config;
