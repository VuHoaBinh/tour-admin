import { useCallback, useState } from 'react';

const useSearch = (search?: CommonSearch) => {
  const [dataSearch, setDataSearch] = useState({ page: 0, size: 10, desc: true, ...search });

  const onSearchChange = useCallback((search: CommonSearch) => {
    setDataSearch((current) => ({
      ...current,
      page: 0,
      ...search,
    }));
  }, []);

  return [dataSearch, onSearchChange] as [CommonSearch, (search: CommonSearch) => void];
};

export default useSearch;
