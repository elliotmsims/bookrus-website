/* eslint-disable react/destructuring-assignment */
export default function Highlight(props) {
  if (props.search === null || props.search === "" || props.value === "N/A") {
    return <span>{props.value}</span>;
  }
  // isNumber
  if (/^[+-]?\d+(\.\d+)?$/.test(props.value)) {
    if (String(props.value) === props.search) {
      return <b style={{ color: "var(--logo-color)" }}>{props.value}</b>;
    }
    return <span>{props.value}</span>;
  }
  const regex = new RegExp(`(${props.search})`, "gi");
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
