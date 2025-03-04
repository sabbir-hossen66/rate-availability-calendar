// import { enqueueSnackbar } from "notistack";
// import { IFetchError } from "@/types";


interface Props {
  method: string;
  url: URL | RequestInfo;
  body?: Record<string, unknown>;
}

export interface IResult<T> {
  data: T;
  message: string;
  status: string;
}

const Fetch = async <TResponseData>({
  method,
  url,
  body,
}: Props): Promise<IResult<TResponseData>> => {
  const controller = new AbortController(); // AbortController instance
  const signal = controller.signal; // Signal to abort request

  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal, // Add signal to fetch
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { ...errorData, statusCode: response.status };
    }

    const data = await response.json();
    return data as IResult<TResponseData>;
  } catch (error) {
     const err = error as Error;
    if (err.name === "AbortError") {
      console.log("Fetch request aborted!");
      return Promise.reject("Request Aborted");
    }
    throw error;
  } finally {
    controller.abort(); // Always abort to clean up resources
  }
};
export default Fetch