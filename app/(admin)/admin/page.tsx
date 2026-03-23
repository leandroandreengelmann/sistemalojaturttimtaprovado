import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Package,
  Tag,
  ArrowRight,
  Image,
} from "@phosphor-icons/react/dist/ssr";

async function getDashboardData() {
  const supabase = await createClient();

  const [products, categories, banners] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("categories").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("banners").select("id", { count: "exact", head: true }).eq("active", true),
  ]);

  return {
    totalProducts:   products.count   ?? 0,
    totalCategories: categories.count ?? 0,
    totalBanners:    banners.count    ?? 0,
  };
}

export default async function DashboardPage() {
  const { totalProducts, totalCategories, totalBanners } =
    await getDashboardData();

  const stats = [
    { label: "Produtos ativos",  value: totalProducts,   icon: Package, href: "/admin/produtos" },
    { label: "Categorias",       value: totalCategories, icon: Tag,     href: "/admin/categorias" },
    { label: "Banners ativos",   value: totalBanners,    icon: Image,   href: "/admin/banners" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Visão geral do painel administrativo</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-gray-200 p-5 hover:border-primary hover:shadow-sm transition-all group rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-primary/10 flex items-center justify-center rounded-md">
                <stat.icon size={18} weight="duotone" className="text-primary" />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Ações rápidas */}
      <div className="bg-white border border-gray-200 p-5 rounded-lg max-w-lg">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Ações rápidas</h2>
        <div className="space-y-2">
          {[
            { label: "Adicionar produto",   href: "/admin/produtos/novo" },
            { label: "Adicionar categoria", href: "/admin/categorias/nova" },
            { label: "Adicionar banner",    href: "/admin/banners/novo" },
            { label: "Gerenciar lojas",     href: "/admin/lojas" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center justify-between px-4 py-3 border border-gray-100 hover:border-primary hover:bg-primary/5 text-sm text-gray-700 hover:text-primary transition-colors group rounded-md"
            >
              {a.label}
              <ArrowRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
