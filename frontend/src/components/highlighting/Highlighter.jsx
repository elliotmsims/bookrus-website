/* eslint-disable react/destructuring-assignment */
export default function Highlight(props) {
  if (props.search === null || props.search === "" || props.value === "N/A") {
    return <span>{props.value}</span>;
  }
  const terms = props.search.split(" ");
  // isNumber
  if (/^[+-]?\d+(\.\d+)?$/.test(props.value)) {
    for (let i = 0; i < terms.length; i += 1) {
      if (String(props.value) === terms[i]) {
        return <b style={{ color: "var(--logo-color)" }}>{props.value}</b>;
      }
    }
    return <span>{props.value}</span>;
  }
  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = props.value.split(regex);
  return (
    <span>
      {parts
        .filter(String)
        .map((part) =>
          regex.test(part) ? (
            <b style={{ color: "var(--logo-color)" }}>{part}</b>
          ) : (
            <span>{part}</span>
          )
        )}
    </span>
  );
}
