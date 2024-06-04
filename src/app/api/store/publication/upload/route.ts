import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    const session = await isValidToken(mobileToken);

    if (session === 'JWT no es válido' || !session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid session token',
        },
        { status: 401 }
      );
    }

    try {
      const data = await request.formData();
      const files: File[] = data.getAll('files') as unknown as File[];

      if (!files) {
        return NextResponse.json({ success: false });
      }

      const secure_urls = [];
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        let mime = file.type;
        const encoding = 'base64';
        const base64Data = Buffer.from(bytes).toString('base64');
        let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

        const { secure_url } = await cloudinary.uploader.upload(fileUri, {
          invalidate: true,
          folder: 'publicaciones',
        });

        secure_urls.push(secure_url);
      }

      return NextResponse.json({ secure_urls }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: 'Error al subir imagen a cloudinary' },
        { status: 500 }
      );
    }
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
  try {
    const data = await request.formData();
    const files: File[] = data.getAll('files') as unknown as File[];

    if (!files) {
      return NextResponse.json({ success: false });
    }

    const secure_urls = [];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      let mime = file.type;
      const encoding = 'base64';
      const base64Data = Buffer.from(bytes).toString('base64');
      let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

      const { secure_url } = await cloudinary.uploader.upload(fileUri, {
        invalidate: true,
        folder: 'publicaciones',
      });

      secure_urls.push(secure_url);
    }

    return NextResponse.json({ secure_urls }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Error al subir imagen a cloudinary' },
      { status: 500 }
    );
  }
}
