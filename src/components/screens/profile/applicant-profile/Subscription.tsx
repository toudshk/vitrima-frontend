"use client";
import { useSubscribe } from "@/hooks/subscribe/useSubscribe";
import { useUnSubscribe } from "@/hooks/subscribe/useUnSubscribe";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import { FC, useState } from "react";
import checkMarkSvg from "@/app/assets/images/check-mark.svg";
import plusMarkSvg from "@/app/assets/images/plus.svg";
interface ISubscription {
  nickname: string;
  email: string;
  image: string;
  _id: string;
}

interface IData {
  data: ISubscription;
}

const Subscription: FC<IData> = ({ data }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const { onSubmit: unSubscribeSubmit } = useUnSubscribe(
    userId || "",
    data._id
  );
  const { onSubmit: subscribeSubmit } = useSubscribe(userId || "", data._id);

  const [isSubscribed, setIsSubscribed] = useState(true);
  const handleSubscribe = async () => {
    await subscribeSubmit();
    setIsSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    await unSubscribeSubmit();
    setIsSubscribed(false);
  };

  return (
    <div className="mb-8 flex  justify-between">
      <Link className="text-2xl font-semibold" href={`/profile/${data._id}`}>
        {data.nickname}
      </Link>
    
        {isSubscribed ? (
          <button  className="flex items-center text-xl font-semibold bg-primary text-white px-8 py-4 rounded-lg " onClick={handleUnsubscribe}>
            <Image className="mr-4" src={checkMarkSvg} width={17} height={12} alt={""} />
            Вы подписаны
          </button>
        ) : (
            <button className="flex items-center text-xl font-semibold  bg-primary text-white px-[39px] py-4 rounded-lg " onClick={handleSubscribe}>
            <Image className="mr-4" src={plusMarkSvg} width={17} height={15} alt={""} />
            Подписаться
          </button>
        )}
     
    </div>
  );
};

export default Subscription;
