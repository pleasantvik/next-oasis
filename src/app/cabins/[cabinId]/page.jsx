import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "../../_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "../../_components/TextExpander";
import DateSelector from "../../_components/DateSelector";
import ReservationForm from "../../_components/ReservationForm";
import Reservation from "../../_components/Reservation";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";
import Cabin from "../../_components/Cabin";

// PLACEHOLDER DATA
// export const metadata = {
//   title:""
// }

// DYNAMIC META DATA

export const generateMetadata = async ({ params }) => {
  const cabin = await getCabin(params?.cabinId);

  return {
    title: `Cabin ${cabin?.name}`,
  };
};

export const generateStaticParams = async ({}) => {
  const cabins = await getCabins();

  const ids = cabins?.map((cabin) => ({
    cabinId: String(cabin?.id),
  }));
  return ids;
};

export default async function Page({ params }) {
  const cabin = await getCabin(params?.cabinId);
  // const settings = await getSettings();
  // const bookDates = await getBookedDatesByCabinId(params?.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin?.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
