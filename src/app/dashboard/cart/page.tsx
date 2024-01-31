import { Product } from "@/products/data/products";
import { cookies } from "next/headers";
import { products } from "../../../products/data/products";
import { ItemCard } from "@/shopping-cart";
import { WidgetItem } from "../../../components/WidgetItem";

export const metadata = {
  title: "Products cart",
  description: "Products cart",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: Record<string, number>): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((p) => p.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as Record<
    string,
    number
  >;

  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  const taxes = 1.15;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-blue-900">Products in cart</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map((productInCart) => (
            <ItemCard key={productInCart.product.id} {...productInCart} />
          ))}
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * taxes).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500 ">
              Taxes 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
