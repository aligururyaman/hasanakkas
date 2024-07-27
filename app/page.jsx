import Best from "@/components/Best";
import Featuredproducts from "@/components/Featuredproducts";
import Section from "@/components/Section";
import UsefulInfo from "@/components/UsefulInfo";


export default function Home() {



  return (
    <div>
      {/* RESPONSİVE YAPILMADI */}
      <div>
        <Section />
      </div>
      {/* RESPONSİVE YAPILMADI */}
      <div className="flex w-full bg-primary my-10 rounded-xl shadow-md">
        <Best />
      </div>
      {/* RESPONSİVE YAPILDI */}
      <div>
        <Featuredproducts />
      </div>
      {/* RESPONSİVE YAPILDI */}
      <div>
        <UsefulInfo />
      </div>
    </div>
  );
}
