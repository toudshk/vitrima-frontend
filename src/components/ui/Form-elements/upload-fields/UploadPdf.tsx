// import { useUpload } from "./useUpload";
// import clsx from "clsx";
// import Image from "next/image";
// import { FC, useEffect, useState } from "react";
// import { Worker, Viewer  } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { Page, pdfjs } from "react-pdf";

// import { IUploadField } from "../form.interface";
// import styles from "./UploadPdf.module.scss";
// import SkeletonLoader from "../../skeleton-loader/skeletonLoader";
// import CloseIcon from "@mui/icons-material/Close";
// import { SimpleDialog } from "@/app/documents/page";
// const UploadPdf: FC<IUploadField> = ({
//   placeholder,
//   error,
//   style,
//   image: initialPdfArray = [],
//   folder,
//   onChange,
// }) => {
//   const [open, setOpen] = useState(false);

//   const { uploadImage, isLoading } = useUpload((url) => {
//     setPdfList((prev) => [...prev, url]);
//     onChange([...pdfList, url]);
//   }, folder);
//   const [pdfList, setPdfList] = useState<string[]>([]);
//   console.log(pdfList);
//   useEffect(() => {
//     setPdfList(initialPdfArray);
//   }, [initialPdfArray]);

//   const [workData, setWorkData] = useState();
//   console.log(workData);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value: string) => {
//     setOpen(false);
//   };
//   const handleWorkData = (value: any) => {
//     setWorkData(value);
//     setOpen(true);
//   };

//   const [scroll, setScroll] = useState("body");

//   const handleRemoveFile = (index: number) => {
//     const newImageList = [...pdfList];
//     newImageList.splice(index, 1);
//     setPdfList(newImageList);
//     onChange(newImageList); // Update parent component with the new list
//   };
//   return (
//     <div className={styles.field}>
//       <label className={styles.topBlock}>
//         <span className={styles.title}>{placeholder}</span>
//         <div className={styles.button}>
//           <input type="file" accept=".pdf" onChange={uploadImage} multiple />
//           {error && <div className={styles.error}>{error.message}</div>}
//         </div>
//       </label>
//       <div className={styles.pdfList}>
//         {pdfList.map((item) => {
//           const startIndex = item.indexOf("/uploads/drawings/");
//           const displayText =
//             startIndex !== -1
//               ? item.substring(startIndex + "/uploads/drawings/".length)
//               : item;

//           return (
//             <button
//               key={item}
//               onClick={(e) => {
//                 handleWorkData(item);
//                 handleClickOpen();
//               }}
//             >
//               <Worker
//                 workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
//               >
//                 <Viewer renderPage={renderFirstPage}  fileUrl={item}/>
//               </Worker>
//               {displayText}
//             </button>
//           );
//         })}
//       </div>
//       <SimpleDialog
//         open={open}
//         pdfUrl={workData ? workData : ""}
//         scroll={scroll}
//         handleClose={handleClose}
//       />
//     </div>
//   );
// };

// export default UploadPdf;


// const renderFirstPage = (props: any) => {
//   const { doc } = props;
//   return <Page key={1} pageIndex={0} />;
// };
