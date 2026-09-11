import { PropertyForm } from "@/components/admin/property-form";
import { createProperty } from "../actions";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">New property</h1>
      <div className="mt-6">
        <PropertyForm action={createProperty} />
      </div>
    </div>
  );
}
