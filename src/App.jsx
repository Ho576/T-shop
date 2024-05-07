import { RouterProvider } from "react-router-dom";
import { router } from './layouts/routes';
import { useContext, useEffect } from "react";
import { UserContext } from "./componants/web/context/User";
import { CartContext } from "./componants/web/context/Cart";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function App() {
  const { setUserToken } = useContext(UserContext);
  const { getCartContext, setCount } = useContext(CartContext);

  useEffect(() => {
    const userToken = cookies.get('userToken');
    if (userToken) {
      setUserToken(userToken);
      const cartContext = getCartContext();
      setCount(cartContext.count);
    }
  }, [getCartContext, setCount, setUserToken]);

  return (
    <RouterProvider router={router} />
  );
}
