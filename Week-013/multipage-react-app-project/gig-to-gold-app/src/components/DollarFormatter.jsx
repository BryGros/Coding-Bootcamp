export default function DollarFormatter({ number }) {
  const numberType = Number(number);
  const formattedNumber = numberType.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <h3 className="return-num">${formattedNumber}</h3>;
}
