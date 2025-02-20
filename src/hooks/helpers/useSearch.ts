import { useDebounce } from './useDebounce';
import { useCallback, useState } from 'react';

/**
 * This hook will be handle search value
 * @returns {Object} Object contain value search
 * @property {string} search - Value search
 * @property {string} debounceSearch - Value debounce search
 * @property {function} onChangeSearch - Handle search
 */
export function useSearch() {
  const [search, setSearch] = useState<string>('');

  const debounceSearch = useDebounce(search, 600);
  const onChangeSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);
  return {
    search,
    debounceSearch,
    onChangeSearch,
  };
}
