interface Spec {
  key: string;
  value: string;
}

interface ProductSpecsProps {
  specs: Spec[];
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  if (specs.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
        Especificações Técnicas
      </h2>
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.key}
              className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}
            >
              <td className="py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-2/5">
                {spec.key}
              </td>
              <td className="py-2.5 px-3 text-gray-800 font-medium text-xs">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
