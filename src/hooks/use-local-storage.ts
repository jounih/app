import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);

    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export const useInitialLocalStorage = <T>(key: string, defaultValue: T): [T | undefined, (value: T) => void] => {
  const [initialValue, setInitialValue] = useState<T | undefined>();

  useEffect(() => {
    const item = window.localStorage.getItem(key);

    if (item) {
      setInitialValue(JSON.parse(item));
    } else {
      setInitialValue(defaultValue);
    }
  }, [key, defaultValue]);

  const setValue = useCallback(
    (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  return [initialValue, setValue];
};
