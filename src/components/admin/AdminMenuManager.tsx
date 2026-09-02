import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Star, 
  Flame, 
  Clock, 
  Check, 
  X, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminMenuManager: React.FC = () => {
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [category, setCategory] = useState(categories[0]?.slug || 'artisanal-coffee');
  const [price, setPrice] = useState(250);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [dietary, setDietary] = useState<'veg' | 'non-veg'>('veg');
  const [prepTime, setPrepTime] = useState(8);
  const [calories, setCalories] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isSignature, setIsSignature] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [ingredientsStr, setIngredientsStr] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setHindiName('');
    setCategory(categories[0]?.slug || 'artisanal-coffee');
    setPrice(250);
    setDescription('');
    setImage('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop');
    setDietary('veg');
    setPrepTime(8);
    setCalories('180 kcal');
    setIsBestseller(false);
    setIsSignature(false);
    setIsSpicy(false);
    setIngredientsStr('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setHindiName(item.hindiName || '');
    setCategory(item.category);
    setPrice(item.price);
    setDescription(item.description);
    setImage(item.image);
    setDietary(item.dietary);
    setPrepTime(item.preparationTimeMinutes);
    setCalories(item.calories || '');
    setIsBestseller(!!item.isBestseller);
    setIsSignature(!!item.isSignature);
    setIsSpicy(!!item.isSpicy);
    setIngredientsStr(item.ingredients?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const parsedIngredients = ingredientsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const itemData = {
      name: name.trim(),
      hindiName: hindiName.trim() || undefined,
      category,
      price: Number(price),
      description: description.trim(),
      image: image.trim() || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      dietary,
      preparationTimeMinutes: Number(prepTime),
      calories: calories.trim() || undefined,
      isAvailable: editingItem ? editingItem.isAvailable : true,
      isBestseller,
      isSignature,
      isSpicy,
      ingredients: parsedIngredients
    };

    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
    } else {
      addMenuItem(itemData);
    }

    setIsModalOpen(false);
  };

  const filtered = menuItems.filter((i) => {
    if (selectedCat !== 'all' && i.category !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div id="admin-menu-manager" className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium text-white">Menu Catalog & Inventory</h1>
          <p className="text-xs text-[#A89887]">Manage dishes, prices, descriptions, and stock availability</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#140D09] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C358] shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish / Coffee</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#1C130E] border border-[#332218] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A89887] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog by name or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white placeholder-[#7A6759] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="p-2 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
        >
          <option value="all">All Categories ({menuItems.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Catalog Table */}
      <div className="rounded-3xl bg-[#1C130E] border border-[#332218] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#2D1E16] bg-[#241A15] text-[#C4B099] font-mono uppercase">
                <th className="p-4">Dish Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Diet & Prep</th>
                <th className="p-4">Badges</th>
                <th className="p-4">In-Stock Switch</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D1E16] text-[#FAF7F2]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#231710] transition-colors">
                  
                  {/* Dish */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-black shrink-0"
                      />
                      <div>
                        <strong className="text-white text-sm block font-serif">{item.name}</strong>
                        {item.hindiName && (
                          <span className="text-[10px] text-[#A89887] font-serif block">{item.hindiName}</span>
                        )}
                        <span className="text-[11px] text-[#7A6759] line-clamp-1 mt-0.5">{item.description}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-mono text-[#C4B099] capitalize">
                    {item.category.replace('-', ' ')}
                  </td>

                  {/* Price */}
                  <td className="p-4 font-mono font-bold text-white text-sm">
                    ₹{item.price}
                  </td>

                  {/* Diet & Prep */}
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold mr-2 ${
                      item.dietary === 'veg' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                    }`}>
                      {item.dietary}
                    </span>
                    <span className="text-[10px] text-[#A89887] font-mono">
                      ~{item.preparationTimeMinutes}m
                    </span>
                  </td>

                  {/* Badges */}
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {item.isBestseller && (
                        <span className="px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#140D09] text-[9px] font-bold uppercase">
                          Star
                        </span>
                      )}
                      {item.isSignature && (
                        <span className="px-1.5 py-0.5 rounded bg-[#4E3424] text-[#FAF7F2] text-[9px] uppercase font-bold">
                          Sign
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Stock Availability Toggle */}
                  <td className="p-4">
                    <button
                      onClick={() => updateMenuItem(item.id, { isAvailable: !item.isAvailable })}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                        item.isAvailable
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-red-950 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {item.isAvailable ? 'In Stock' : 'Sold Out'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-[#2A1E17] hover:bg-[#3D2B20] text-[#C4B099] hover:text-white"
                        title="Edit Item"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${item.name}" from menu?`)) {
                            deleteMenuItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#2A1E17] hover:bg-red-950/60 text-[#C4B099] hover:text-red-400"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#1C130E] border border-[#332218] rounded-3xl p-6 sm:p-8 text-[#FAF7F2] shadow-2xl my-8 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#2A1E17] text-[#A89887]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl font-medium text-white mb-1">
                {editingItem ? 'Edit Dish / Beverage' : 'Add New Item to Menu'}
              </h3>
              <p className="text-xs text-[#A89887] mb-6">
                All changes synchronize instantly with customer digital menus.
              </p>

              <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A89887] uppercase font-mono mb-1">Dish Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Italian Tiramisu Latte"
                      className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A89887] uppercase font-mono mb-1">Hindi Wordmark</label>
                    <input
                      type="text"
                      value={hindiName}
                      onChange={(e) => setHindiName(e.target.value)}
                      placeholder="e.g. तिरामिसु लट्टे"
                      className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#A89887] uppercase font-mono mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#A89887] uppercase font-mono mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A89887] uppercase font-mono mb-1">Dietary *</label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#A89887] uppercase font-mono mb-1">Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short appetizing description..."
                    className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[#A89887] uppercase font-mono mb-1">Image URL</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A89887] uppercase font-mono mb-1">Prep Time (Mins)</label>
                    <input
                      type="number"
                      min={1}
                      value={prepTime}
                      onChange={(e) => setPrepTime(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A89887] uppercase font-mono mb-1">Calories info</label>
                    <input
                      type="text"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="e.g. 210 kcal"
                      className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A89887] uppercase font-mono mb-1">Key Ingredients (Comma separated)</label>
                  <input
                    type="text"
                    value={ingredientsStr}
                    onChange={(e) => setIngredientsStr(e.target.value)}
                    placeholder="e.g. Espresso, Mascarpone Cream, Valrhona Cocoa"
                    className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBestseller}
                      onChange={(e) => setIsBestseller(e.target.checked)}
                      className="rounded bg-[#2A1E17] border-[#433024] text-[#D4AF37]"
                    />
                    <span>Highlight as Bestseller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSignature}
                      onChange={(e) => setIsSignature(e.target.checked)}
                      className="rounded bg-[#2A1E17] border-[#433024] text-[#D4AF37]"
                    />
                    <span>Highlight as House Signature</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSpicy}
                      onChange={(e) => setIsSpicy(e.target.checked)}
                      className="rounded bg-[#2A1E17] border-[#433024] text-[#D4AF37]"
                    />
                    <span>Spicy Indicator</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#332218] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#2A1E17] text-[#A89887] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#D4AF37] text-[#140D09] font-bold uppercase hover:bg-[#E5C358]"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
