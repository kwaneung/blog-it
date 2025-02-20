import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // 쿼리 파라미터로 id 전달

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // 사용자 프로필 가져오기
    const { data: userProfile, error: userProfileError } = await supabase
      .from('user_profile')
      .select('name, bio, avatar_url')
      .eq('id', id);

    if (userProfileError) throw userProfileError;

    // 사용자 URL 가져오기
    const { data: userUrls, error: userUrlsError } = await supabase
      .from('user_profile_url')
      .select('url')
      .eq('id', id);

    if (userUrlsError) throw userUrlsError;

    const mappedUrls = userUrls.map((urlObj) => ({
      value: urlObj.url,
    }));

    // 결과 조합
    const result = { ...userProfile[0], urls: mappedUrls };

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const requestData = await req.json();
    const { id } = requestData;

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // undefined가 아닌 값만 포함하여 업데이트 데이터 생성
    const updateData = Object.fromEntries(
      Object.entries(requestData)
        .filter(([key]) => ['name', 'bio', 'avatar_url'].includes(key))
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [
          key,
          key === 'avatar_url' ? (value as string)?.replace('http://', 'https://') || '' : value,
        ]),
    );

    // 프로필 데이터가 있으면 업데이트
    if (Object.keys(updateData).length > 0) {
      const { error: userProfileError } = await supabase
        .from('user_profile')
        .update(updateData)
        .eq('id', id);

      if (userProfileError) {
        throw userProfileError;
      }
    }

    // urls가 제공된 경우에만 URL 업데이트
    if ('urls' in requestData) {
      const { error: deleteUrlsError } = await supabase
        .from('user_profile_url')
        .delete()
        .eq('id', id);

      if (deleteUrlsError) {
        throw deleteUrlsError;
      }

      const urlInsertData = requestData.urls.map((url: { value: string }) => ({
        id,
        url: url.value,
      }));

      const { error: insertUrlsError } = await supabase
        .from('user_profile_url')
        .insert(urlInsertData);

      if (insertUrlsError) {
        throw insertUrlsError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, name } = await req.json();

    if (!id || !name) {
      return NextResponse.json(
        { success: false, error: 'User ID and name are required' },
        { status: 400 },
      );
    }

    // user_profile 테이블에 새 프로필 생성
    const { error: profileError } = await supabase.from('user_profile').insert({ id, name });

    if (profileError) {
      throw profileError;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
