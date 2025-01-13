import { useState, useEffect } from "react";
import { API_CATS, API_CATS_KEYWORD } from "../urls";
import { useRef } from "react";
export const Home = () => {
  const [apiCats, setApiCats] = useState<string | null>(null);
  const [apiCatsKeyword, setApiCatskeyword] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const count = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Enfoca el input directamente
    }
  };
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
  }, [keyword]);

  const increment = () => {
    count.current += 1;
    console.log("Valor actual:", count.current); // Muestra el valor actualizado sin renderizar
  };
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
      <button onClick={increment}>Incrementar</button>
      <div>
        <input ref={inputRef} type="text" placeholder="Escribe algo" />
        <button onClick={focusInput}>Enfocar</button>
      </div>
    </div>
  );
};
