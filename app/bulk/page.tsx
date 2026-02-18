"use client";

import { useState } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface BulkProduct {
  name: string;
  features: string;
  category?: string;
}

interface BulkResult {
  name: string;
  success: boolean;
  description?: string;
  error?: string;
}

export default function BulkPage() {
  const [csvData, setCsvData] = useState('');
  const [products, setProducts] = useState<BulkProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BulkResult[]>([]);
  const [summary, setSummary] = useState<{ total: number; successful: number; failed: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'csv' | 'manual'>('csv');
  const [manualProducts, setManualProducts] = useState<BulkProduct[]>([
    { name: '', features: '', category: '' }
  ]);

  const parseCSV = (text: string): BulkProduct[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const header = lines[0].toLowerCase().split(',').map(h => h.trim());
    const nameIndex = header.findIndex(h => h.includes('name') || h.includes('product'));
    const featuresIndex = header.findIndex(h => h.includes('feature') || h.includes('description'));
    const categoryIndex = header.findIndex(h => h.includes('category'));

    if (nameIndex === -1 || featuresIndex === -1) {
      alert('CSV must have "name" and "features" columns');
      return [];
    }

    const products: BulkProduct[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values[nameIndex] && values[featuresIndex]) {
        products.push({
          name: values[nameIndex],
          features: values[featuresIndex],
          category: categoryIndex !== -1 ? values[categoryIndex] : undefined,
        });
      }
    }
    return products;
  };

  const handleCSVParse = () => {
    const parsed = parseCSV(csvData);
    if (parsed.length > 0) {
      setProducts(parsed);
      setResults([]);
      setSummary(null);
    }
  };

  const addManualProduct = () => {
    setManualProducts([...manualProducts, { name: '', features: '', category: '' }]);
  };

  const updateManualProduct = (index: number, field: keyof BulkProduct, value: string) => {
    const updated = [...manualProducts];
    updated[index] = { ...updated[index], [field]: value };
    setManualProducts(updated);
  };

  const removeManualProduct = (index: number) => {
    if (manualProducts.length > 1) {
      setManualProducts(manualProducts.filter((_, i) => i !== index));
    }
  };

  const handleManualAdd = () => {
    const validProducts = manualProducts.filter(p => p.name && p.features);
    if (validProducts.length > 0) {
      setProducts(validProducts);
      setResults([]);
      setSummary(null);
    }
  };

  const generateBulk = async () => {
    if (products.length === 0) return;

    setIsLoading(true);
    setResults([]);
    setSummary(null);

    try {
      const response = await fetch('/api/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products,
          options: {
            tone: 'professional',
            length: 'medium',
            platform: 'amazon',
            tier: 'pro',
          },
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data.results);
        setSummary(data.summary);
      } else {
        alert(data.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Bulk generation error:', error);
      alert('Failed to generate descriptions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = () => {
    const csvContent = [
      'Name,Description,Status',
      ...results.map(r => `"${r.name}","${(r.description || r.error || '').replace(/"/g, '""')}","${r.success ? 'Success' : 'Failed'}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'descriptions_bulk_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const allText = results
      .filter(r => r.success && r.description)
      .map(r => `=== ${r.name} ===\n${r.description}\n\n`)
      .join('');

    const blob = new Blob([allText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_descriptions.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                DescriptAI
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/generate" className="text-white/70 hover:text-white transition">Generate</Link>
                <Link href="/history" className="text-white/70 hover:text-white transition">History</Link>
                <Link href="/pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
                <Link href="/bulk" className="text-cyan-400 font-medium">Bulk</Link>
              </div>
            </div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-white/70 hover:text-white">Sign In</Link>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 Bulk Description Generator
          </h1>
          <p className="text-xl text-white/70">
            Generate up to 100 product descriptions at once
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('csv')}
              className={`px-6 py-2 rounded-md transition ${
                activeTab === 'csv' ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              📄 Upload CSV
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-6 py-2 rounded-md transition ${
                activeTab === 'manual' ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              ✏️ Manual Entry
            </button>
          </div>
        </div>

        {/* CSV Input */}
        {activeTab === 'csv' && (
          <div className="bg-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Upload CSV File</h2>
            <p className="text-white/60 mb-4">
              CSV format: name, features, category (optional)
            </p>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              placeholder={`name,features,category\nWireless Headphones,Bluetooth 5.0, noise cancelling, 30hr battery,Electronics\nSmart Watch,Fitness tracker, heart rate monitor, waterproof,Wearables`}
              className="w-full h-48 bg-black/30 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 font-mono text-sm"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleCSVParse}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
              >
                Parse CSV
              </button>
            </div>
          </div>
        )}

        {/* Manual Input */}
        {activeTab === 'manual' && (
          <div className="bg-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Add Products Manually</h2>
            {manualProducts.map((product, index) => (
              <div key={index} className="mb-4 p-4 bg-black/20 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => updateManualProduct(index, 'name', e.target.value)}
                    placeholder="Product Name"
                    className="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="text"
                    value={product.features}
                    onChange={(e) => updateManualProduct(index, 'features', e.target.value)}
                    placeholder="Features (comma separated)"
                    className="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={product.category || ''}
                      onChange={(e) => updateManualProduct(index, 'category', e.target.value)}
                      placeholder="Category (optional)"
                      className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => removeManualProduct(index)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-4">
              <button
                onClick={addManualProduct}
                className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
              >
                + Add Product
              </button>
              <button
                onClick={handleManualAdd}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
              >
                Add to Queue
              </button>
            </div>
          </div>
        )}

        {/* Products Queue */}
        {products.length > 0 && (
          <div className="bg-white/10 rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">
                📋 Products Queue ({products.length})
              </h2>
              <button
                onClick={generateBulk}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition disabled:opacity-50"
              >
                {isLoading ? '⏳ Generating...' : '🚀 Generate All'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-lg">
                  <h3 className="text-white font-medium truncate">{product.name}</h3>
                  <p className="text-white/50 text-sm truncate">{product.features}</p>
                  {product.category && (
                    <span className="inline-block mt-2 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                      {product.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && summary && (
          <div className="bg-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">✨ Results</h2>
              <div className="flex gap-4">
                <button
                  onClick={downloadCSV}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                >
                  📥 Download CSV
                </button>
                <button
                  onClick={downloadAll}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                  📄 Download All
                </button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-white">{summary.total}</div>
                <div className="text-white/60">Total</div>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-400">{summary.successful}</div>
                <div className="text-green-400/70">Successful</div>
              </div>
              <div className="bg-red-500/20 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-400">{summary.failed}</div>
                <div className="text-red-400/70">Failed</div>
              </div>
            </div>

            {/* Result Cards */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    result.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium">{result.name}</h3>
                    {result.success ? (
                      <span className="text-green-400 text-sm">✅ Success</span>
                    ) : (
                      <span className="text-red-400 text-sm">❌ Failed</span>
                    )}
                  </div>
                  {result.success && result.description && (
                    <p className="text-white/70 text-sm">{result.description}</p>
                  )}
                  {!result.success && result.error && (
                    <p className="text-red-400 text-sm">{result.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
