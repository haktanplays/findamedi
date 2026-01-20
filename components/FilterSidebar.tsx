'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterSidebarProps {
  categories: {
    id: string
    name: string
    slug: string
    _count: {
      clinics: number
    }
  }[]
  onFiltersChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

export interface FilterState {
  category: string
  location: string
  priceRange: [number, number]
  rating: number
  sort: string
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Öne Çıkanlar' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'price-asc', label: 'En Düşük Fiyat' },
  { value: 'price-desc', label: 'En Yüksek Fiyat' },
]

export function FilterSidebar({ categories, onFiltersChange, initialFilters }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      category: '',
      location: '',
      priceRange: [0, 200000],
      rating: 0,
      sort: 'featured',
    }
  )
  const [isExpanded, setIsExpanded] = useState(true)

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      category: '',
      location: '',
      priceRange: [0, 200000],
      rating: 0,
      sort: 'featured',
    }
    setFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <Card className="lg:sticky lg:top-4">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtreler
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden"
        >
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>

      <CardContent className={cn("space-y-6", !isExpanded && "hidden lg:block")}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Arama</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Klinik veya konum ara..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Kategori</label>
          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tüm kategoriler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tüm kategoriler</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name} ({category._count.clinics})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Fiyat Aralığı: ${filters.priceRange[0].toLocaleString('tr-TR')} - ${filters.priceRange[1].toLocaleString('tr-TR')}
          </label>
          <Slider
            min={0}
            max={200000}
            step={5000}
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
            className="mt-4"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Minimum Puan: {filters.rating > 0 ? `${filters.rating}+` : 'Tümü'}
          </label>
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[filters.rating]}
            onValueChange={(value) => handleFilterChange('rating', value[0])}
            className="mt-4"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sıralama</label>
          <Select
            value={filters.sort}
            onValueChange={(value) => handleFilterChange('sort', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full"
        >
          Filtreleri Temizle
        </Button>
      </CardContent>
    </Card>
  )
}
