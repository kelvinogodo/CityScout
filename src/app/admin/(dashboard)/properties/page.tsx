import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { cn, formatPrice } from "@/lib/utils";
import { getProperties } from "@/lib/data/properties";
import { deleteProperty } from "./actions";

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <Button asChild className="gap-2">
          <Link href="/admin/properties/new">
            <Plus className="h-4 w-4" />
            New property
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {properties.map((property, index) => (
              <tr
                key={property.id}
                className={cn(
                  "hover:bg-muted/60",
                  index % 2 === 1 && "bg-muted/30",
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded">
                      <Image
                        src={property.front_view_image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-1 max-w-xs">
                      {property.description}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">{property.location}</td>
                <td className="px-4 py-3">{formatPrice(property.price)}</td>
                <td className="px-4 py-3 capitalize">{property.type}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="icon">
                      <Link
                        href={`/admin/properties/${property.id}/edit`}
                        aria-label="Edit property"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteButton
                      action={deleteProperty.bind(null, property.id)}
                      confirmMessage="Delete this property? This cannot be undone."
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {properties.length === 0 && (
          <p className="p-6 text-center text-muted-foreground">
            No properties yet.
          </p>
        )}
      </div>
    </div>
  );
}
