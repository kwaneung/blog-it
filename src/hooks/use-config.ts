// import { useAtom } from 'jotai';
// import { atomWithStorage } from 'jotai/utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Style } from '@/components/ui/styles';
import { Theme } from '@/components/ui/themes';

interface IConfig {
  style: Style['name'];
  theme: Theme['name'];
  radius: number;
}

interface IConfigStore {
  config: IConfig;
  setConfig: (newConfig: IConfig) => void;
}

// const configAtom = atomWithStorage<Config>('config', {
//   style: 'default',
//   theme: 'zinc',
//   radius: 0.5,
// });

// export function useConfig() {
//   return useAtom(configAtom);
// }

const localStorageWrapper = {
  getItem: (name: string) => {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

const useConfigStore = create<IConfigStore>()(
  persist(
    (set) => ({
      config: {
        style: 'default',
        theme: 'zinc',
        radius: 0.5,
      },
      setConfig: (newConfig) => set({ config: newConfig }),
    }),
    {
      name: 'config', // 로컬 스토리지 키 이름
      storage: localStorageWrapper, // (옵션) 기본값이 localStorage이므로 명시하지 않아도 됩니다.
    },
  ),
);

export function useConfig() {
  const { config, setConfig } = useConfigStore();
  return [config, setConfig] as const;
}
