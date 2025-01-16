import React, { useState, useEffect, useRef } from "react";
import { CallApiCat, FirstKeyword, DataKeywordCat } from "./facts";

import "../style.css";

const useCat = () => {
  const [apiCats, setApiCats] = useState<string>("hello");

  const apiCat = () => {
    CallApiCat().then((dataCat) => setApiCats(dataCat));
  };
  useEffect(() => {
    apiCat();
  }, []);

  return { apiCats, apiCat };
};

const useCatKeyword = (apiCats: string) => {
  const [apiCatsKeyword, setApiCatskeyword] = useState<string[]>([]);
  const [keywordCat, setKeywordCat] = useState<string>("");
  useEffect(() => {
    if (apiCats) {
      const fkeyword = FirstKeyword(apiCats);

      setKeywordCat(fkeyword);
    }
  }, [apiCats]);

  useEffect(() => {
    if (keywordCat) {
      DataKeywordCat(keywordCat).then((catUrl) => {
        if (catUrl) {
          setApiCatskeyword((previewCat) => [...previewCat, catUrl]);
        }
        console.log(catUrl, "vacio");
      });
    }
  }, [keywordCat]);
  return { apiCatsKeyword, keywordCat, setApiCatskeyword };
};

export const Home = () => {
  const { apiCats, apiCat } = useCat();

  const { apiCatsKeyword, keywordCat, setApiCatskeyword } =
    useCatKeyword(apiCats);
  const [page, setPage] = useState(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setApiCatskeyword([]);
    apiCat();
    setPage(1);
  };

  useEffect(() => {
    const target = document.getElementById("scroll");
    if (!target) return;
    const hanldeObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setPage((currenValue) => currenValue + 1);
      });
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(hanldeObserver, options);
      observer.observe(target);
      return () => {
        observer.unobserve(target);
      };
    };
  }, [page]);

  return (
    <div>
      <button onClick={handleClick}>Reload Page</button>
      <h1>Aplicación Cats</h1>
      <p>{apiCats}</p>
      <div id="scroll" style={{ height: "650px", overflow: "auto" }}>
        {apiCatsKeyword.length > 0 ? (
          apiCatsKeyword?.map((url, index) => (
            <div className="containerImg">
              <img
                key={index}
                src={url}
                alt={`The image is not found with name ${keywordCat}`}
                className="catsImg"
              />
            </div>
          ))
        ) : (
          <span>Cargando imagen ...</span>
        )}
      </div>
    </div>
  );
};
