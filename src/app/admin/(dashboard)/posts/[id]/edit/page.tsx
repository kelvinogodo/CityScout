import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { createClient } from "@/lib/supabase/server";
import { updatePost } from "../../actions";

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit post</h1>
      <div className="mt-6">
        <PostForm post={post} action={updatePost.bind(null, id)} />
      </div>
    </div>
  );
}
