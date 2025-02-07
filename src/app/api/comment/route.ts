import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    let query = supabase.from('comment').select('*');

    if (postId) {
      query = query.eq('post_id', postId);
    }

    const { data: posts, error: postsError } = await query;

    if (postsError) throw postsError;

    return NextResponse.json({ success: true, data: posts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
