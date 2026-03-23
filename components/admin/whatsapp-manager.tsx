"use client";

import { useState, useTransition } from "react";
import {
  Plus, Trash, PencilSimple, Eye, EyeSlash,
  WhatsappLogo, CaretDown, CaretUp, X, FloppyDisk,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import {
  createDepartment, updateDepartment, deleteDepartment, toggleDepartment,
  createContact, updateContact, deleteContact, toggleContact,
} from "@/lib/actions/whatsapp-departments";

interface Contact {
  id: string;
  name: string;
  role: string | null;
  phone: string;
  sort_order: number;
  active: boolean;
}

interface Department {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
  active: boolean;
  whatsapp_contacts: Contact[];
}

interface Props {
  initialDepartments: Department[];
}

function ContactForm({
  departmentId,
  contact,
  onDone,
}: {
  departmentId: string;
  contact?: Contact;
  onDone: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = contact
        ? await updateContact(contact.id, fd)
        : await createContact(departmentId, fd);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(contact ? "Contato atualizado." : "Contato adicionado.");
        onDone();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nome *</label>
          <input
            name="name"
            required
            defaultValue={contact?.name}
            placeholder="João Silva"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Cargo / Função</label>
          <input
            name="role"
            defaultValue={contact?.role ?? ""}
            placeholder="Vendas, Tintas..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp (com DDI) *</label>
          <input
            name="phone"
            required
            defaultValue={contact?.phone}
            placeholder="5511999999999"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Ordem</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={contact?.sort_order ?? 0}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <button type="button" onClick={onDone} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors">
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <FloppyDisk size={13} weight="bold" />
          {pending ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}

function DepartmentForm({
  department,
  onDone,
}: {
  department?: Department;
  onDone: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = department
        ? await updateDepartment(department.id, fd)
        : await createDepartment(fd);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(department ? "Departamento atualizado." : "Departamento criado.");
        onDone();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nome *</label>
          <input
            name="name"
            required
            defaultValue={department?.name}
            placeholder="Loja Centro, Vendas Online..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Ordem</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={department?.sort_order ?? 0}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Descrição</label>
        <input
          name="description"
          defaultValue={department?.description ?? ""}
          placeholder="Ex: Rua das Flores, 123 — Centro"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <button type="button" onClick={onDone} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors">
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <FloppyDisk size={13} weight="bold" />
          {pending ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}

export function WhatsappManager({ initialDepartments }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addingDept, setAddingDept] = useState(false);
  const [editingDept, setEditingDept] = useState<string | null>(null);
  const [addingContact, setAddingContact] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleToggleDept(id: string, active: boolean) {
    startTransition(async () => {
      const res = await toggleDepartment(id, active);
      if (res.error) toast.error(res.error);
    });
  }

  function handleDeleteDept(id: string) {
    if (!confirm("Excluir este departamento e todos os seus contatos?")) return;
    startTransition(async () => {
      const res = await deleteDepartment(id);
      if (res.error) toast.error(res.error);
      else toast.success("Departamento excluído.");
    });
  }

  function handleToggleContact(id: string, active: boolean) {
    startTransition(async () => {
      const res = await toggleContact(id, active);
      if (res.error) toast.error(res.error);
    });
  }

  function handleDeleteContact(id: string) {
    if (!confirm("Excluir este contato?")) return;
    startTransition(async () => {
      const res = await deleteContact(id);
      if (res.error) toast.error(res.error);
      else toast.success("Contato excluído.");
    });
  }

  return (
    <div className="space-y-4">
      {/* Add department button */}
      <div className="flex justify-end">
        <button
          onClick={() => { setAddingDept(true); setEditingDept(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus size={15} weight="bold" />
          Novo Departamento
        </button>
      </div>

      {/* New department form */}
      {addingDept && (
        <DepartmentForm onDone={() => setAddingDept(false)} />
      )}

      {/* Departments list */}
      {initialDepartments.length === 0 && !addingDept && (
        <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-xl border border-gray-200">
          Nenhum departamento cadastrado ainda.
        </div>
      )}

      {initialDepartments.map((dept) => (
        <div key={dept.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Department header */}
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
              <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${!dept.active ? "text-gray-400 line-through" : "text-gray-900"}`}>
                {dept.name}
              </p>
              {dept.description && (
                <p className="text-xs text-gray-400 truncate">{dept.description}</p>
              )}
            </div>
            <span className="text-xs text-gray-400 shrink-0">
              {dept.whatsapp_contacts.length} contato{dept.whatsapp_contacts.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleToggleDept(dept.id, !dept.active)}
                disabled={pending}
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
                title={dept.active ? "Desativar" : "Ativar"}
              >
                {dept.active ? <Eye size={15} /> : <EyeSlash size={15} />}
              </button>
              <button
                onClick={() => { setEditingDept(editingDept === dept.id ? null : dept.id); setExpandedId(dept.id); }}
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
              >
                <PencilSimple size={15} />
              </button>
              <button
                onClick={() => handleDeleteDept(dept.id)}
                disabled={pending}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
              >
                <Trash size={15} />
              </button>
              <button
                onClick={() => setExpandedId(expandedId === dept.id ? null : dept.id)}
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
              >
                {expandedId === dept.id ? <CaretUp size={15} /> : <CaretDown size={15} />}
              </button>
            </div>
          </div>

          {/* Edit department form */}
          {editingDept === dept.id && (
            <div className="px-5 pb-4">
              <DepartmentForm department={dept} onDone={() => setEditingDept(null)} />
            </div>
          )}

          {/* Contacts */}
          {expandedId === dept.id && (
            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
              {dept.whatsapp_contacts.map((contact) => (
                <div key={contact.id}>
                  {editingContact === contact.id ? (
                    <ContactForm
                      departmentId={dept.id}
                      contact={contact}
                      onDone={() => setEditingContact(null)}
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${!contact.active ? "text-gray-400 line-through" : "text-gray-800"}`}>
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {contact.role && <span className="mr-2">{contact.role}</span>}
                          <span className="font-mono">{contact.phone}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleContact(contact.id, !contact.active)}
                          disabled={pending}
                          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
                        >
                          {contact.active ? <Eye size={14} /> : <EyeSlash size={14} />}
                        </button>
                        <button
                          onClick={() => setEditingContact(contact.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
                        >
                          <PencilSimple size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          disabled={pending}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add contact */}
              {addingContact === dept.id ? (
                <ContactForm
                  departmentId={dept.id}
                  onDone={() => setAddingContact(null)}
                />
              ) : (
                <button
                  onClick={() => setAddingContact(dept.id)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:text-primary border border-dashed border-gray-200 hover:border-primary rounded-lg w-full transition-colors"
                >
                  <Plus size={13} weight="bold" />
                  Adicionar contato
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
