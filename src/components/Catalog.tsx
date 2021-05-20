import React from 'react';
import { useSelector} from 'react-redux';

const Catalog: React.FC = () => {
  const store = useSelector(state => state);

  console.log(store);

  return <h1>CatalogRedux</h1>
}

export default Catalog;