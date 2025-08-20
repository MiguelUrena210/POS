import { CategoryWithProductsResponseSchema } from '@/schemas';
import ProductCard from '../../../../components/ProductCard';

// El nombre del parámetro debe ser igual al nombre de la carpeta con []
type Params = Promise<{ categoryId: string }>;

async function getProducts(categoryId: string) {
  /* console.log(categoryId); */
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
  console.log('La url: ', url);
  const res = await fetch(url);
  const json = await res.json();
  const products = CategoryWithProductsResponseSchema.parse(json);
  return products;
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params;
  /* console.log(categoryId); */
  const category = await getProducts(categoryId);
  console.log(category);

  return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {category.products.map(product => (
            <ProductCard
                key={product.id}
            >
            </ProductCard>
        ))}
      </div>
  );
}
