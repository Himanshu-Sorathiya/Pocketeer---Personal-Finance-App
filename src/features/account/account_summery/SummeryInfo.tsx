import Icon from "../../../components/ui/Icon.tsx";

function SummeryInfo({ email, name }: { email: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl text-shadow-md">{name}</span>
      <span className="text-shadow-md">{email}</span>

      <div className="bg-text mt-4 size-auto rounded-full p-3 text-white">
        <Icon id="profile" className="size-60" />
      </div>
    </div>
  );
}

export default SummeryInfo;
