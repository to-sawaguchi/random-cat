import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";
 
// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};
 
// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#319795",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "4px 8px",
        }}
      >
        きょうのにゃんこ🐱
      </button>
      <div style={{ marginTop: 8, maxWidth: 500 }}>
        <img src={catImageUrl} width="100%" height="auto" alt="猫" />
      </div>
    </div>
  );
};
export default IndexPage;
 
// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};
 
type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
