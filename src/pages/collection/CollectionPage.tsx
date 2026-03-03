'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Category } from './types';
import ProductCard from './ProductCard';
import CollectionHeader from './CollectionHeader';
import { Link, useSearchParams } from 'react-router-dom';
import { useShopifyCollection, searchProducts } from '../../hooks/useShopifyCollection';
import type { Product as CollectionProduct } from './types';

type SortOption = 'Featured' | 'Best Selling' | 'Price, Low To High' | 'Price, High To Low';

const VALID_CATEGORIES: Category[] = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants'];

const CollectionPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') ?? '';
  const initialCategory: Category = VALID_CATEGORIES.includes(categoryParam as Category) ? (categoryParam as Category) : 'All';

  const [currentCategory, setCurrentCategory] = useState<Category>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<CollectionProduct[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { products: catalogueProducts, loading: catalogueLoading } = useShopifyCollection();

  // Sync category from URL params when they change (e.g. navigating from navbar)
  useEffect(() => {
    const param = searchParams.get('category');
    const newCategory: Category = VALID_CATEGORIES.includes(param as Category) ? (param as Category) : 'All';
    setCurrentCategory(newCategory);
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  const runSearch = useCallback((query: string) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (!query || query.length < 2) {
      setSearchResults(null);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchProducts(query);
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
  }, []);

  useEffect(() => {
    runSearch(searchQuery);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [searchQuery, runSearch]);

  const processedProducts = useMemo(() => {
    // When a search is active, use search results (or empty while loading)
    if (searchQuery && searchQuery.length >= 2) {
      return searchResults ?? [];
    }

    let result = [...catalogueProducts];
    if (currentCategory !== 'All') {
      result = result.filter(p => p.category === currentCategory);
    }
    switch (sortBy) {
      case 'Best Selling':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'Price, Low To High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price, High To Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Featured':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return result;
  }, [catalogueProducts, currentCategory, sortBy, searchQuery, searchResults]);

  const handleSortSelect = (option: SortOption) => {
    setSortBy(option);
    setIsSortOpen(false);
  };

  const clearSearch = () => {
    const next: Record<string, string> = {};
    if (categoryParam && categoryParam !== 'All') next.category = categoryParam;
    setSearchParams(next);
  };

  const isSearchMode = Boolean(searchQuery && searchQuery.length >= 2);
  const isLoading = catalogueLoading || searchLoading;

  return (
    <div className="bg-[#FFFFFF] pb-[120px] -mb-[120px]">
      <CollectionHeader
        currentCategory={currentCategory}
        onCategoryChange={(category) => {
          setCurrentCategory(category);
          const next: Record<string, string> = {};
          if (category !== 'All') next.category = category;
          if (searchQuery) next.search = searchQuery;
          setSearchParams(next);
        }}
      />

      <main className="max-w-wide mx-auto px-6 md:px-12 pb-section-xl">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-16 text-caption uppercase tracking-widest text-orea-dark/70 border-b border-orea-linen/40 pb-6">
          <div className="flex items-center gap-6">
            {isSearchMode ? (
              <>
                <span className="opacity-60">
                  {isLoading ? 'Searching…' : `${processedProducts.length} result${processedProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`}
                </span>
                <button
                  onClick={clearSearch}
                  className="hover:text-orea-dark border-l border-orea-linen pl-6 transition-colors font-medium underline underline-offset-4"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <span className="opacity-60">{processedProducts.length} Pieces</span>
                {currentCategory !== 'All' && (
                  <button
                    onClick={() => { setCurrentCategory('All'); setSearchParams({}); }}
                    className="hover:text-orea-dark border-l border-orea-linen pl-6 transition-colors font-medium underline underline-offset-4"
                  >
                    Clear
                  </button>
                )}
              </>
            )}
          </div>

          {/* Sort — hidden during search since results are ordered by relevance */}
          {!isSearchMode && (
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 hover:text-orea-dark transition-colors font-medium"
              >
                Sort: {sortBy}
                <svg className={`w-3 h-3 transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-4 w-56 bg-[#FFFFFF] border border-orea-linen shadow-sm z-50 py-4">
                  {(['Featured', 'Best Selling', 'Price, Low To High', 'Price, High To Low'] as SortOption[]).map((option) => (
                    <button key={option} onClick={() => handleSortSelect(option)} className={`w-full text-left px-6 py-2 text-caption tracking-widest transition-colors uppercase ${sortBy === option ? 'text-orea-dark font-bold bg-orea-linen/20' : 'text-orea-dark/60 hover:text-orea-dark'}`}>{option}</button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-section-xl">
            <div className="w-8 h-8 border border-orea-dark/30 border-t-orea-dark rounded-full animate-spin" />
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24">
            {processedProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.shopifyHandle || product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}

            {processedProducts.length === 0 && (
              <div className="col-span-full py-section-xl text-center opacity-40">
                <p className="text-caption tracking-widest uppercase">
                  {isSearchMode ? `No results for "${searchQuery}"` : 'No pieces found in this selection'}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionPage;
