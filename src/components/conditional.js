// A wrapper component that will only show 'children' when 'showWhen' is true
export default function Conditional({ showWhen, children }) {
  if (showWhen) {
    return <>{children}</>;
  }
  return <></>;
}
