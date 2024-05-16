import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest, response: NextResponse) {
  // same code as the other upload route but with an array of files
  try {
    const data = await request.formData();
    const files: File[] = data.getAll("files") as unknown as File[];

    if (!files) {
      return NextResponse.json({ success: false });
    }

    const secure_urls = [];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      let mime = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(bytes).toString("base64");
      let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

      const { secure_url } = await cloudinary.uploader.upload(fileUri, {
        invalidate: true,
        folder: "publicaciones",
      });

      secure_urls.push(secure_url);
    }

    return NextResponse.json({ secure_urls }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error al subir imagen a cloudinary" },
      { status: 500 }
    );
  }
}
