import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PaintColorForm } from "@/components/admin/paint-color-form";

interface Props { params: Promise<{ id: string }> }

export default async function EditarCorPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: color } = await supabase
    .from("paint_colors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!color) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md border border-gray-200 shrink-0"
            style={{ backgroundColor: color.hex }}
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">{color.name}</h1>
            <p className="text-xs text-gray-500 mt-0.5">{color.hex} {color.code ? `· ${color.code}` : ""}</p>
          </div>
        </div>
      </div>
      <PaintColorForm color={color} />
    </div>
  );
}
