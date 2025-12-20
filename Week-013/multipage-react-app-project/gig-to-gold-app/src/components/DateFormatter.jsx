export default function DateFormatter({ dateTime }) {
  const dateObject = new Date(dateTime);
  const date = dateObject.getDate();
  const adjustedDate = date > 9 ? date : "0" + date;
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const monthNames = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const adjustedMonth = monthNames[month];
  const rawHour = dateObject.getHours();
  const isPM = rawHour > 12 ? true : false;
  const adjustedHour = isPM ? rawHour - 12 : rawHour;
  const minute = dateObject.getMinutes();
  const adjustedMinute = minute > 9 ? minute : "0" + String(minute);
  const amPm = isPM ? "PM" : "AM";

  return (
    <>
      <h3 className="gig-card-date-time">
        {adjustedMonth} {adjustedDate}, {year} at {adjustedHour}:{adjustedMinute} {amPm}
      </h3>
    </>
  );
}
