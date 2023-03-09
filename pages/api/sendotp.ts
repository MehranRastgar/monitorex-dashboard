import axios from "axios";
import type { NextApiHandler } from "next";

const smsHandler: NextApiHandler = async (request, response) => {
  try {
    var postData = {
      phone: request.query?.PhoneNumber,
      _id: request.query?.PhoneNumber,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "*/*",
      },
    };
    const { data, status } = await axios.post(
      process?.env?.OTP_ENDPOINT ?? "err",
      postData,
      axiosConfig
    );
    //console.log(data);
    return response.status(200).json(data);
  } catch (err: any) {
    //console.log("eeerrrr===>>", err);

    return response.status(502).end(err);
  }
};

export default smsHandler;
