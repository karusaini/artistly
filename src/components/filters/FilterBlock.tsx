type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function FilterBlock({
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <select
        className="border rounded px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
