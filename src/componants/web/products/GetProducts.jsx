import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

const debouncedSort = debounce((value, setPage) => {
  setSort(value);
  setPage(1); 
}, 300);

const ProductCard = React.memo(({ prod }) => (
  <div key={prod._id} className="card m-3" style={{ width: '18rem' }}>
    <img
      src={prod.mainImage.secure_url}
      className="card-img-top"
      alt="..."
      width={50}
      height={200}
      loading="lazy"
    />
    <div className="card-body">
      <h5 className="card-title">{prod.name}</h5>
      <div className="mb-0">
        <p className="card-text text-danger">{prod.finalPrice} $</p>
        <Link to={`/products/${prod._id}`} className="btn btn-primary">
          Show Product
        </Link>
      </div>
    </div>
  </div>
));

export default function GetProducts() {
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  const getProducts = async (sort, page) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4&sort=${sort}`
    );
    return data;
  };

  const { data, isLoading } = useQuery(['All_products', sort, page], () => getProducts(sort, page));

  useEffect(() => {
    getProducts(sort, page);
  }, [sort, page]);

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div className="container mt-5 mb-5">
      <p>Sorted by : {sort}</p>
        <select name="sort" onChange={(e) => debouncedSort(setSort(e.target.value))}>
        <option value="">sort</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      <div className="row">
        
        {data.products.map((prod) => (
          <ProductCard key={prod._id} prod={prod} />
        ))}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
              </a>
            </li>
            {Array.from({ length: Math.ceil(data.total / 4) }, (_, index) => (
              <li key={index} className={`page-item ${index + 1 === page ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => setPage(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => setPage(page + 1)}
                disabled={page === Math.ceil(data.total / 4)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
