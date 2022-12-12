import axios from "axios";
import type { NextApiHandler } from "next";

const signinHandler: NextApiHandler = async (request, response) => {
  try {
    var postData = {
      usernamebyphone: request.query?.PhoneNumber || "",
      otp: request.query?.code || "",
      isadmin: "false",
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
      },
    };

    const { data, status } = await axios.post(
      "http://localhost:5000/api/client/registerv2",
      postData,
      axiosConfig
    );
    console.log(response);
    if (data.accessToken === undefined)
      return response.status(500).json({ data: "sms error" });

    return response.status(200).json(data);
  } catch (err: any) {
    console.log("eeerrrr===>>", err);

    return response.status(502).end(err);
  }
};

export default signinHandler;
