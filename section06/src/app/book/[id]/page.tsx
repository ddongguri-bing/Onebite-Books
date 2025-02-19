import { notFound } from "next/navigation";
import style from "./page.module.css";

// export const dynamicParams = false; // 아래 함수에 명시하지 않은 파라미터로 접근하고자 하면 바로 404 페이지로 이동하도록 설정

// 약속된 이름의 함수를 통해 return으로 어떤 url 파라미터가 빌드 타임에 이 페이지에 존재할 수 있는지 직접 설정함으로써 static 페이지로 만들 수 있다
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>[ERROR] 오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} alt="도서 이미지" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
