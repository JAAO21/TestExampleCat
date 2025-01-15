import { useState, useEffect, useRef } from "react";
import { API_CATS, API_CATS_KEYWORD } from "../urls";

export const Home = () => {
  const [apiCats, setApiCats] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [apiCatsKeyword, setApiCatskeyword] = useState<string | null>(null);
  /* const [data, setData] = useState<number[]>([]); */
  const [page, setPage] = useState<number>(1);
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch(API_CATS);
        if (!response.ok) {
          throw new Error(`Response status :${response.status}`);
        }
        const responseJson = await response.json();
        setApiCats(responseJson?.fact);
      } catch (err: any) {
        throw new Error(err.message);
      }
    };

    callApi();
  }, []);

  useEffect(() => {
    if (apiCats) {
      const convertToString = JSON.stringify(apiCats);
      const firstKeyword = convertToString?.split(" ")[0].replace(/["']+/g, "");
      console.log(firstKeyword);
      setKeyword(firstKeyword);
    }
  }, [apiCats]);

  useEffect(() => {
    const dataKeywordCat = async () => {
      if (keyword) {
        try {
          const responseApiKeyword = await fetch(API_CATS_KEYWORD(keyword));
          console.log(responseApiKeyword);
          if (!responseApiKeyword.ok) {
            throw new Error(`Response error:${responseApiKeyword.status}`);
          }

          setApiCatskeyword(responseApiKeyword.url);
        } catch (err: any) {
          throw new Error(`Error:${err}`);
        }
      }
    };
    dataKeywordCat();
  }, [keyword, page]);
  /* 
  useEffect(() => {
    const fetchMockData = () => {
      const newItems = Array.from(
        { length: 10 },
        (_, index) => (page - 1) * 10 + index + 1
      ); // Generar 10 números por página
      setData((prevData) => [...prevData, ...newItems]);
    };

    fetchMockData();
  }, [page]); */
  useEffect(() => {
    if (!observerRef.current) return;
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef]);
  return (
    <div>
      <h1>Aplicación cats</h1>
      <p>{apiCats}</p>
      {apiCatsKeyword ? (
        <img
          src={apiCatsKeyword}
          alt={`The image is not found with name ${keyword}`}
        />
      ) : (
        <span>Cargando imagen ...</span>
      )}
      {/*   <div>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "5px 0",
            }}
          >
            Item {item}
          </div>
        ))}
      </div>
      <div
        style={{ height: "700px", width: "700px", background: "pink" }}
      ></div>
      <div
        ref={observerRef}
        style={{ height: "20px", background: "red" }}
      ></div> */}
    </div>
  );
};
