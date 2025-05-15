import Loading from "@/components/loading/Loading";
import ShopPageComponent from "@/components/shop/ShopPageComp";
import { Suspense } from "react";

export default function ShopPageRoute() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ShopPageComponent />
      </Suspense>
    </div>
  );
}
