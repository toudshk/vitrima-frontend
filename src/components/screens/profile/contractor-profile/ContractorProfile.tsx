import { FC } from "react";
import styles from "./ContractorProfile.module.scss";
import { ContractorProfileProps, IData, IWorks } from "../Profile.interface";
import Header from "../header";
import ProfileWorks from "./profile-works/ProfileWorks";
import Image from "next/image";


const ContractorProfile: FC<ContractorProfileProps> = ({ works, data, id }) => {
 

  return (
    <div className={styles.wrapper}>
      <Header data={data} id={id}/>

      <div className={styles.blockTitle}>
        <div className={styles.leftBlock}>{data.email}</div>
        <div className={styles.rightBlock}>
          <div className={styles.subscribers}>
            <p>Подписчики</p>
            <div>{data.subscribers?.length}</div>
          </div>

          <div className={styles.inn}>
            <p>ИНН</p>
            <div>{data.inn}</div>
          </div>
        </div>
      </div>
      <div className={styles.blockWorks}>
        {works.map((work: any, index) => {
          console.log(index);
          return (
            <div className={styles.itemBlock} key={index}>
              {index % 2 === 0 ? (
                <>
                  <div className={styles.imageBlock}>
                    <Image
                      src={work.images[0]}
                      width={860}
                      height={348}
                      alt={"фотография"}
                    />
                  </div>
                  <div className={styles.textBlock}>
                    <h1>{work.title}</h1>
                    <p>{work.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.textBlock}>
                    <h1>{work.title}</h1>
                    <p>{work.description}</p>
                  </div>
                  <div className={styles.imageBlock}>
                    <Image
                      src={work.images[0]}
                      width={860}
                      height={348}
                      alt={"фотография"}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContractorProfile;
