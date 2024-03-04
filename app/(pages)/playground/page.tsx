import ProductCard from "@components/products/_components/ProductCard/ProductCard";
import styles from "./playground.module.scss";

const products = [
  {
    imageUrl:
      "https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg",
    title: "Apple Watch Series 9",
    listed: true,
  },
  {
    imageUrl:
      "https://www.seriouseats.com/thmb/hMevGtiDkCJ_k7FUZ9TNq3Ud4Wc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__12__20151201-gift-guide-stand-mixer-1500x1125-712fb32a38d84c8097d3f5ce60ca626b.jpg",
    title: "KitchenAid Stand Mixer",
    listed: false,
  },
  {
    imageUrl:
      "https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg",
    title: "Apple Watch Series 9",
    listed: false,
  },
  {
    imageUrl:
      "https://www.seriouseats.com/thmb/hMevGtiDkCJ_k7FUZ9TNq3Ud4Wc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__12__20151201-gift-guide-stand-mixer-1500x1125-712fb32a38d84c8097d3f5ce60ca626b.jpg",
    title: "KitchenAid Stand Mixer",
    listed: false,
  },
  {
    imageUrl:
      "https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg",
    title: "Apple Watch Series 9",
    listed: true,
  },
  {
    imageUrl:
      "https://www.seriouseats.com/thmb/hMevGtiDkCJ_k7FUZ9TNq3Ud4Wc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__12__20151201-gift-guide-stand-mixer-1500x1125-712fb32a38d84c8097d3f5ce60ca626b.jpg",
    title: "KitchenAid Stand Mixer",
    listed: false,
  },
  {
    imageUrl:
      "https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg",
    title: "Apple Watch Series 9",
    listed: false,
  },
  {
    imageUrl:
      "https://www.seriouseats.com/thmb/hMevGtiDkCJ_k7FUZ9TNq3Ud4Wc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__12__20151201-gift-guide-stand-mixer-1500x1125-712fb32a38d84c8097d3f5ce60ca626b.jpg",
    title: "KitchenAid Stand Mixer",
    listed: true,
  },
];

export default function Playground() {
  return (
    <div className={styles.generalcontainer}>
      <h2>Product Card:</h2>
      <div className={styles.generalcontainer}>
        <ProductCard productInfo={products[0]} />
      </div>
    </div>
  );
}
// import ProductList from "@components/products/_components/ProductList/ProductList";
// <ProductList products={products} />
