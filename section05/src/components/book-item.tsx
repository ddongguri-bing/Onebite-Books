import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <img src={coverImgUrl} alt="도서 이미지" />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
