import { Banner } from '@mrlonis/nx-react-tutorial-common-ui';
import { exampleProducts } from '@mrlonis/nx-react-tutorial-products';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function App() {
  return (
    <>
      <Banner text="Welcome to the store!" />
      <h1>Welcome nx-react-tutorial-store</h1>
      <ul>
        {exampleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> Price: {product.price}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
