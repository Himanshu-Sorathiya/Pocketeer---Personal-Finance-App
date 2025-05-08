import Icon from "./Icon.tsx";

function RestrictionAlert({ msg1, msg2 }: { msg1: string; msg2: string }) {
  return (
    <div className="flex flex-col">
      <Icon id="waring-triangle" className="text-accent" />

      <div className="flex flex-col text-center text-pretty">
        <p className="text-xl font-semibold text-gray-900">{msg1}</p>
        <p className="text-xl font-semibold text-gray-900">{msg2}</p>
      </div>
    </div>
  );
}

export default RestrictionAlert;
