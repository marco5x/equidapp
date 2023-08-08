import equidapp from "../../assets/equidapp.webp";

export const Header = () => {
  return (
    <div>
      <div className="flex py-5 gap-3 md:gap-9">
        <img
          className="w-20 md:w-24 animate-[pulse_2s_ease-in-out]"
          src={"/logo.webp"}
          alt="equidapp"
          width={24}
          height={24}
        />
        <img
          className="w-52 md:w-[24rem]"
          src={equidapp}
          alt="equidapp"
          width={360}
        />
      </div>
    </div>
  );
};
