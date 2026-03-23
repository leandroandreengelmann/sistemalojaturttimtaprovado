import { getDepartments } from "@/lib/actions/whatsapp-departments";
import { WhatsappManager } from "@/components/admin/whatsapp-manager";

export default async function WhatsappPage() {
  const { data } = await getDepartments();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">WhatsApp</h1>
        <p className="text-sm text-gray-500 mt-1">
          Gerencie os departamentos e atendentes exibidos no modal de contato.
        </p>
      </div>
      <WhatsappManager initialDepartments={data as any} />
    </div>
  );
}
