/* eslint-disable react/destructuring-assignment */
export default function Highlight(props) {
  if (props.search === null || props.search === "") {
    return <span>{props.string}</span>;
  }
  const regex = new RegExp(`(${props.search})`, "gi");
  const parts = props.string.split(regex);
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
