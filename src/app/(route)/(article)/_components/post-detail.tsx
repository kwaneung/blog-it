'use client';

import { IPost } from '@/types/post';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUserProfileQuery } from '@/queries/useUserProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from '@supabase/auth-helpers-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useComments } from '@/queries/usePost';
const DisplayTimeSince = ({ name, time }: { name: string; time: string }) => {
  const now = new Date().getTime();
  const targetTime = new Date(time).getTime();
  const diffInSeconds = Math.floor((now - targetTime) / 1000);

  const getTimeString = () => {
    const intervals = [
      { unit: 'year', seconds: 31536000 },
      { unit: 'month', seconds: 2592000 },
      { unit: 'day', seconds: 86400 },
      { unit: 'hour', seconds: 3600 },
      { unit: 'minute', seconds: 60 },
      { unit: 'second', seconds: 1 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const { unit, seconds } = intervals[i];
      const value = Math.floor(diffInSeconds / seconds);

      if (value > 0) {
        const nextInterval = intervals[i + 1];
        const remainder = nextInterval
          ? Math.floor((diffInSeconds % seconds) / nextInterval.seconds)
          : 0;

        const mainPart = `${value} ${unit}${value !== 1 ? 's' : ''}`;
        const remainderPart =
          remainder > 0 && nextInterval
            ? `, ${remainder} ${nextInterval.unit}${remainder !== 1 ? 's' : ''}`
            : '';

        return `${mainPart}${remainderPart} ago`;
      }
    }

    return 'just now';
  };

  return (
    <span className="flex items-center">
      <span className="text-sm text-gray-500 mr-2">{name}</span>
      <span className="text-black">{getTimeString()}</span>
    </span>
  );
};

const Separator = () => {
  return (
    <div className={`relative`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-gray-500"></span>
      </div>
    </div>
  );
};

const formSchema = z.object({
  content: z.string().min(1, '댓글 내용을 입력해주세요'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ArticleDetail({ post, ownerName }: { post: IPost; ownerName: string }) {
  const { data: userProfile } = useUserProfileQuery();
  const session = useSession();
  const { data: comments } = useComments(post.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('input comment :: ', data.content);

    const userId = session?.user?.id;
    console.log('userId :: ', userId);
    const postId = post.id;
    console.log('postId :: ', postId);
  };

  const dummyComments = [
    {
      id: 'comment_1',
      userId: '1',
      postId: '1',
      avatarUrl: 'https://picsum.photos/200',
      ownerName: '김관응',
      content: '첫번째 코멘트',
      createdAt: '2024-01-01',
    },
    {
      id: 'comment_2',
      userId: '2',
      postId: '1',
      avatarUrl: 'https://picsum.photos/201',
      ownerName: '홍길동',
      content: '두번째 코멘트',
      createdAt: '2024-01-02',
    },
    {
      id: 'comment_3',
      userId: '3',
      postId: '1',
      avatarUrl: 'https://picsum.photos/202',
      ownerName: '또치',
      content: '세번째 코멘트',
      createdAt: '2024-01-03',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="pb-2 flex flex-row items-center">
          <Badge className="mr-2">{post.type}</Badge>
          <span>{post?.title}</span>
        </CardTitle>
        <CardDescription className="flex flex-col">
          <span className="flex justify-between">
            <span className="flex space-x-4">
              {post?.created_at && <DisplayTimeSince name="Asked" time={post.created_at} />}
              {post?.updated_at && <DisplayTimeSince name="Modified" time={post.updated_at} />}
            </span>
            <span>{`작성자 : ${ownerName}`}</span>
          </span>
          <span className="flex gap-2 justify-start">
            <span className="flex flex-row items-center">
              <Label htmlFor="label" className="mr-2">
                Post Id
              </Label>
              <span className="text-black">{post?.id}</span>
            </span>
            |
            <span className="flex flex-row items-center">
              <Label htmlFor="label" className="mr-2">
                Label
              </Label>
              <span className="text-black">{post?.label}</span>
            </span>
          </span>
          <span className="flex gap-2 justify-start">
            <span className="flex flex-row items-center">
              <Label htmlFor="label" className="mr-2">
                Status
              </Label>
              <span className="text-black">{post?.status}</span>
            </span>
            |
            <span className="flex flex-row items-center">
              <Label htmlFor="label" className="mr-2">
                Priority
              </Label>
              <span className="text-black">{post?.priority}</span>
            </span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Separator />
        </div>
        <div>
          {post?.content?.split('\n').map((line: string, i: number) => (
            <span key={i}>
              {line}
              <br />
            </span>
          )) || '내용이 없습니다.'}
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <Label className="text-lg font-bold pb-4">Comment</Label>
        {comments?.map((comment: any) => (
          <div key={comment.id}>
            <div className="my-4">
              <div className="flex flex-row items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={comment.avatarUrl}
                    alt="@shadcn"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span>{comment.ownerName}</span>
                <span className="text-sm text-gray-500">{comment.createdAt}</span>
              </div>
              <div className="my-2">{comment.content}</div>
            </div>
            <Separator />
          </div>
        ))}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4 space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    {userProfile?.name || '로그인 필요'}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Content"
                      className="min-h-[100px] resize-none"
                      disabled={!userProfile?.name}
                    />
                  </FormControl>
                  <FormDescription>{`form description`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!userProfile?.name}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">{/* <Button>Deploy</Button> */}</CardFooter>
    </Card>
  );
}
