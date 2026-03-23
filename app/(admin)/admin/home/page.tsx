import { createClient } from "@/lib/supabase/server";
import { HomeSectionsManager } from "@/components/admin/home-sections-manager";

export default async function HomeSectionsPage() {
  const supabase = await createClient();

  const [{ data: rawSections }, { data: carousels }, { data: productSections }, { data: imageCarousels }, { data: colorSections }] = await Promise.all([
    supabase.from("home_sections").select("*").order("sort_order"),
    supabase.from("carousels").select("id, title").eq("active", true).order("created_at"),
    supabase.from("product_sections").select("id, title").eq("active", true).order("created_at"),
    supabase.from("image_carousels").select("id, title").eq("active", true).order("created_at"),
    supabase.from("color_sections").select("id, title").eq("active", true).order("sort_order"),
  ]);

  // Enriquece seções com label do recurso referenciado
  const sections = await Promise.all(
    (rawSections ?? []).map(async (s) => {
      let label: string | undefined;
      if (s.type === "carousel" && s.reference_id) {
        label = carousels?.find((c) => c.id === s.reference_id)?.title;
      } else if (s.type === "product_section" && s.reference_id) {
        label = productSections?.find((p) => p.id === s.reference_id)?.title;
      } else if (s.type === "image_carousel" && s.reference_id) {
        label = imageCarousels?.find((c) => c.id === s.reference_id)?.title;
      } else if (s.type === "cores_tintas" && s.reference_id) {
        label = colorSections?.find((c) => c.id === s.reference_id)?.title;
      }
      return { ...s, label };
    })
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Gerenciar Home</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Defina quais seções aparecem na home e em qual ordem
        </p>
      </div>

      <HomeSectionsManager
        sections={sections}
        carousels={carousels ?? []}
        productSections={productSections ?? []}
        imageCarousels={imageCarousels ?? []}
        colorSections={colorSections ?? []}
      />
    </div>
  );
}
