import { API_CATS, API_CATS_KEYWORD } from "../urls";

export const CallApiCat = async () => {
  try {
    const response = await fetch(API_CATS);
    if (!response.ok) {
      throw new Error(`Response status :${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson?.fact;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const FirstKeyword = (apiCats: string) => {
  const convertToString = JSON.stringify(apiCats);
  const firstKeyword = convertToString?.split(" ")[0].replace(/["']+/g, "");
  return firstKeyword;
};

export const DataKeywordCat = async (keyword: string) => {
  try {
    const responseApiKeyword = await fetch(API_CATS_KEYWORD(keyword));
    if (!responseApiKeyword.ok) {
      throw new Error(`Response error:${responseApiKeyword.status}`);
    }
    const newUrl = responseApiKeyword?.url;
    console.log(responseApiKeyword, "aqui");
    return newUrl;
  } catch (err: any) {
    throw new Error(`Error:${err}`);
  }
};
