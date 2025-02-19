import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Delay } from "@/util/delay";
import { Suspense } from "react";

// export const dynamic = ""; -> 정말 특별한 경우가 아니라면 권장되지 않음!
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값(생략 가능), 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정 -> 동적 함수가 제대로 동작하지 않을 수 있다
// 4. error : 페이지를 강제로 Static 페이지로 설정 (동적 함수와 같이 설정하면 안되는 이유가 있다면 빌드 오류를 발생)

async function AllBooks() {
  await Delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>[ERROR] 오류가 발생했습니다...</div>;
  }
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await Delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>[ERROR] 오류가 발생했습니다...</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
