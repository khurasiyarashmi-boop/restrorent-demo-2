import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Category } from '../../types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export const AdminCategoryManager: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, menuItems } = useApp();
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    addCategory({
      name: newCatName.trim(),
      slug,
      description: newCatDesc.trim() || undefined,
      displayOrder: categories.length + 1,
      isActive: true
    });

    setNewCatName('');
    setNewCatDesc('');
  };

  const handleDelete = (id: string, slug: string) => {
    const count = menuItems.filter(m => m.category === slug).length;
    if (count > 0) {
      alert(`Cannot delete category "${slug}" because it contains ${count} menu items. Please reassign or delete the items first.`);
      return;
    }
    if (confirm('Delete this category?')) {
      deleteCategory(id);
    }
  };

  const handleStartEdit = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditName(cat.name);
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return;
    updateCategory(id, { name: editName.trim() });
    setEditingCatId(null);
  };

  return (
    <div id="admin-category-manager" className="space-y-6">
      
      <div>
        <h1 className="font-serif text-2xl font-medium text-white">Menu Categories</h1>
        <p className="text-xs text-[#A89887]">Organize products into customer-facing digital menu sections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Add Form (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
          <h3 className="font-serif text-lg font-medium text-white">Add New Category</h3>
          
          <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Category Name *</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Specialty Cold Brews"
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Description</label>
              <input
                type="text"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="e.g. 18-hour cold steeped single origins"
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#140D09] font-bold uppercase tracking-wider hover:bg-[#E5C358]"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Categories List (8 Cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#1C130E] border border-[#332218] p-6 space-y-4">
          <h3 className="font-serif text-lg font-medium text-white">Active Categories ({categories.length})</h3>

          <div className="divide-y divide-[#2D1E16]">
            {categories.map((cat, idx) => {
              const count = menuItems.filter(m => m.category === cat.slug).length;
              const isEditing = editingCatId === cat.id;

              return (
                <div key={cat.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#8C6D58] w-6">{idx + 1}.</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="p-1 rounded bg-[#2A1E17] text-white text-xs border border-[#D4AF37]"
                      />
                    ) : (
                      <div>
                        <span className="font-medium text-white text-xs block">{cat.name}</span>
                        {cat.description && (
                          <span className="text-[10px] text-[#A89887] block">{cat.description}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#2A1E17] text-[#D4AF37] text-[10px] font-mono">
                      {count} items
                    </span>

                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSaveEdit(cat.id)}
                          className="p-1 rounded bg-emerald-700 text-white"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingCatId(null)}
                          className="p-1 rounded bg-[#2A1E17] text-[#A89887]"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(cat)}
                          className="p-1 text-[#A89887] hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.slug)}
                          className="p-1 text-[#A89887] hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
