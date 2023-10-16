
import { FC } from "react";
import { WhiteIconLogo } from "../../common/icons/WhiteIconLogo";

const data = [
  {
    title: "VITRIMA",
    id: 0,
  },
  {
    title: "Все права защищены",
    id: 1,
  },
  {
    title: "Политика конфиденциальности",
    id: 2,
  },
  {
    title: "Использование файлов cookie",
    id: 3,
  },
  {
    title: "Правовая информация",
    id: 4,
  },
];

const Footer = () => {
  return (
    <div className="text-gray-300 py-11 px-24 bg-primary">
      <div className="flex  justify-between pb-10">
        <WhiteIconLogo width={24} />

        <p className="text-base">ВЕРСИЯ RU</p>
      </div>
      <div>
        <ul className="text-xl flex">
          {data.map((item) => (
            <li className="pr-10" key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
