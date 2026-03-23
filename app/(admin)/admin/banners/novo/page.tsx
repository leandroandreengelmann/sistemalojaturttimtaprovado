import { BannerForm } from "@/components/admin/banner-form";

export default function NovoBannerPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Novo Banner</h1>
      <BannerForm />
    </div>
  );
}
