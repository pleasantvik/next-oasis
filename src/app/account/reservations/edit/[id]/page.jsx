import { updateReservation } from "../../../../_lib/action";
import { getBooking, getCabin } from "../../../../_lib/data-service";
import Button from "../../../../_components/Button";

export default async function Page({ params }) {
  // CHANGE
  const { numGuests, observations } = await getBooking(params?.id);
  const maxCapacity = 10;
  //   const maxiCapacity = await getCabin(params?.id);
  //   console.log(maxiCapacity, "mmmm");

  console.log(numGuests, observations);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{params?.id}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <input type="hidden" name="bookingId" value={params?.id} />
          <label htmlFor="numGuests">How many guests?</label>
          <input type="text" name="id" hidden />
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={numGuests}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button>Update reservation</Button>
        </div>
      </form>
    </div>
  );
}
