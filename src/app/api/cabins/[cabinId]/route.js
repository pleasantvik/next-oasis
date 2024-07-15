import getCabin from "../../../_lib/data-service";
import getBookedDatesByCabinId from "../../../_lib/data-service";
export async function GET(request, { params }) {
  console.log(params);
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = Promise.all([
      getCabin(),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({
      cabin,
      bookedDates,
    });
  } catch (error) {
    return Response.json({
      message: "Not found",
    });
  }
}
