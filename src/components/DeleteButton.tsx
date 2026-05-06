"use client";

export default function DeleteButton({ action, id, name, label = "Xóa", idFieldName = "id" }: { 
  action: (formData: FormData) => Promise<void>, 
  id: string, 
  name: string,
  label?: string,
  idFieldName?: string
}) {
  const handleDelete = async (formData: FormData) => {
    if (confirm(`Bạn có chắc chắn muốn xóa "${name}"?`)) {
      await action(formData);
    }
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name={idFieldName} value={id} />
      <button 
        type="submit" 
        className="btn" 
        style={{ 
          padding: "0.4rem 0.8rem", 
          fontSize: "0.85rem", 
          backgroundColor: "#fee2e2", 
          color: "#ef4444" 
        }}
      >
        {label}
      </button>
    </form>
  );
}
