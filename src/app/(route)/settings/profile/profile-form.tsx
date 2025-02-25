'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserProfileQuery, useUserProfileMutation } from '@/queries/useUserProfile';
import { IUserUrl } from '@/types/profile';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  // email: z
  //   .string({
  //     required_error: 'Please select an email to display.',
  //   })
  //   .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { data: userProfile } = useUserProfileQuery();

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    username: userProfile?.name,
    bio: userProfile?.bio,
    urls: userProfile?.urls,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth');
    }
  }, [session, router]);

  const { fields, append, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  const { reset } = form;

  const { mutate: updateUserProfile } = useUserProfileMutation();

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const param = {
      name: data.username,
      bio: data.bio,
      urls: data.urls?.map((url) => ({ value: url.value })) || [],
    };

    updateUserProfile(param);
  }

  // userProfile이 로드된 후 form 필드에 값 설정
  useEffect(() => {
    if (userProfile) {
      reset({
        username: userProfile.name,
        bio: userProfile.bio,
        urls: userProfile.urls?.map((url: IUserUrl) => ({ value: url.value })),
      });
    }
  }, [userProfile, reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Input user name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a pseudonym. You can
                only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        userProfile?.emails.find(
                          (email: { is_default: boolean }) => email.is_default,
                        )?.email
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userProfile?.emails?.map((email: IUserEmail) => (
                    <SelectItem key={email.email} value={email.email}>
                      {email.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{' '}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>URLs</FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <div className="flex items-start gap-2">
                      <Input {...field} />
                      <Button
                        variant="secondary"
                        className="shrink-0"
                        onClick={() => remove(index)}
                      >
                        Delete Link
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
