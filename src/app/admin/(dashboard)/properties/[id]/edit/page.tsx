import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/property-form";
import { createClient } from "@/lib/supabase/server";
import { updateProperty } from "../../actions";

type Params = Promise<{ id: string }>;

export default async function EditPropertyPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!property) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit property</h1>
      <div className="mt-6">
        <PropertyForm property={property} action={updateProperty.bind(null, id)} />
      </div>
    </div>
  );
}
