import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await Delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" } // 검색 결과는 캐싱되어 한 번 검색되었던 검색 결과는 조금 더 빠르게 렌더링(최적화)
  );
  if (!response.ok) {
    return <div>[ERROR] 오류가 발생했습니다...</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>Loading...</div>}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
