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
      .select('name, bio')
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
    const { id, name, bio, urls } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // user_profile 테이블 업데이트
    const { error: userProfileError } = await supabase
      .from('user_profile')
      .update({ name, bio })
      .eq('id', id);

    if (userProfileError) {
      throw userProfileError;
    }

    // user_profile_url 테이블 업데이트 (기존 데이터 삭제 후 새로 추가)
    const { error: deleteUrlsError } = await supabase
      .from('user_profile_url')
      .delete()
      .eq('id', id);

    if (deleteUrlsError) {
      throw deleteUrlsError;
    }

    const urlInsertData = urls.map((url: { value: string }) => ({
      id,
      url: url.value,
    }));

    const { error: insertUrlsError } = await supabase
      .from('user_profile_url')
      .insert(urlInsertData);

    if (insertUrlsError) {
      throw insertUrlsError;
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
