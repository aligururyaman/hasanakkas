import AboutUs from "@/components/AboutUs";
import Best from "@/components/Best";
import AddCategory from "@/components/panelComp/AddCategory";
import AddProduct from "@/components/panelComp/AddProduct";
import Featuredproducts from "@/components/productsComp/Featuredproducts";
import SearchComp from "@/components/SearchComp";
import Section from "@/components/Section";
import UsefulInfo from "@/components/UsefulInfo";


export default function Home() {



  return (
    <div>
      <div>
        <AddProduct />
      </div>
      <div>
        <SearchComp />
      </div>
      {/* RESPONSİVE YAPILMADI */}
      <div>
        <Section />
      </div>
      {/* RESPONSİVE YAPILMADI */}
      <div>
        <Best />
      </div>

      {/* RESPONSİVE YAPILDI */}
      <div>
        <Featuredproducts />
      </div>
      <div>
        <AboutUs />
      </div>
      {/* RESPONSİVE YAPILDI */}
      <div>
        <UsefulInfo />
      </div>

    </div>
  );
}
