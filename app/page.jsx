import Best from "@/components/Best";
import Featuredproducts from "@/components/Featuredproducts";
import Section from "@/components/Section";
import UsefulInfo from "@/components/UsefulInfo";


export default function Home() {



  return (
    <div>
      <div>
        <Section />
      </div>
      <div className="flex w-full bg-primary my-10 rounded-xl shadow-md">
        <Best />
      </div>
      <div className="flex w-full h-[30rem] bg-primary my-10 rounded-xl shadow-md p-5" >
        <Featuredproducts />
      </div>
      <div className="flex w-full h-[30rem] bg-primary my-10 rounded-xl shadow-md p-10">
        <UsefulInfo />
      </div>
    </div>
  );
}
