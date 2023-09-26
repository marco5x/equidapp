import { WhatsappIcon, WhatsappShareButton } from "react-share";

export const CounterLikes = () => {
  return (
    <div className="fixed flex gap-3 bottom-10 ">
      <p className="text-white ">¿Te gusto la App?</p>
      <div className="flex text-white gap-3">
        <p>Compartila</p>
        <WhatsappShareButton
          title="Mira esta grandiosa app!! "
          separator="👉🏻 "
          url="https://equidapp.netlify.com"
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};
