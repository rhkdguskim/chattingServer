import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class OpenaiService {
  async test() {
    const openApiURL = "http://aiopen.etri.re.kr:8000/WikiQA";
    const access_key = process.env.OPEN_API_KEY;
    const question = "타입스크립트에 대해서 알려줘";
    const type = "irqa";

    const requestJson = {
      argument: {
        question: question,
        type: type,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: access_key,
    };

    try {
      const response = await axios.post(openApiURL, requestJson, { headers });
      return response.data; // You might want to return the response data instead of the whole response object
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
}
