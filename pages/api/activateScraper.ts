// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDB } from "../../firebaseAdmin";
import admin from "firebase-admin";

type Data = {
  collection_id: string;
  start_eta: number;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    const { search } = req.body;

    console.log("Search is : ", search);

    const response = await fetch(
      `https://api.brightdata.com/dca/trigger?collector=c_lgn1kbc2adkerk3qp&confirm_cancel=1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search,
        }),
      }
    );

    const data = await response.json();
    console.log("data is : ", data);

    const { collection_id, start_eta } = data;

    await adminDB.collection("searches").doc(collection_id).set({
      search,
      start_eta,
      status: "pending",
      updatedAt: admin.firestore.Timestamp.now(),
    });

    res.status(200).json({ collection_id, start_eta });
  } catch (error: any) {
    console.log("error is : ", error);
    res.status(500).json({ error: error.message });
  }
}
