"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Edit, Trash2, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SubSubCategory {
  id: string
  code: string
  name: string
  department: string
}

interface SubCategory {
  id: string
  code: string
  name: string
  department: string
  subSubCategories: SubSubCategory[]
}

interface MainCategory {
  id: string
  code: string
  name: string
  department: string
  subCategories: SubCategory[]
}

const dummyData: MainCategory[] = [
  {
    id: "1",
    code: "001",
    name: "Hırdavat Malzemeleri",
    department: "Lojistik",
    subCategories: [
      {
        id: "1-1",
        code: "1406",
        name: "Kapı ve Pencere Malzemeleri",
        department: "Lojistik",
        subSubCategories: [
          {
            id: "1-1-1",
            code: "085",
            name: "Yapıştırıcı ve Bant",
            department: "Lojistik",
          },
          {
            id: "1-1-2",
            code: "086",
            name: "Hırdavat Ürünleri",
            department: "İç Dizayn",
          },
          {
            id: "1-1-3",
            code: "087",
            name: "Bilgisayar Ürünleri",
            department: "IT",
          },
        ],
      },
      {
        id: "1-2",
        code: "1406",
        name: "Bilgisayar Malzemeleri",
        department: "IT",
        subSubCategories: [],
      },
      {
        id: "1-3",
        code: "1407",
        name: "Hırdavat Malzemeleri",
        department: "İç Dizayn",
        subSubCategories: [],
      },
    ],
  },
  {
    id: "2",
    code: "002",
    name: "Kırtasiye Malzemeleri",
    department: "Muhasebe",
    subCategories: [
      {
        id: "2-1",
        code: "2001",
        name: "Yazı Gereçleri",
        department: "Muhasebe",
        subSubCategories: [
          {
            id: "2-1-1",
            code: "201",
            name: "Kalemler",
            department: "Muhasebe",
          },
          {
            id: "2-1-2",
            code: "202",
            name: "Defterler",
            department: "Muhasebe",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    code: "003",
    name: "Elektronik Malzemeleri",
    department: "IT",
    subCategories: [
      {
        id: "3-1",
        code: "3001",
        name: "Bilgisayar Donanımları",
        department: "IT",
        subSubCategories: [
          {
            id: "3-1-1",
            code: "301",
            name: "İşlemciler",
            department: "IT",
          },
          {
            id: "3-1-2",
            code: "302",
            name: "Bellek Modülleri",
            department: "IT",
          },
          {
            id: "3-1-3",
            code: "303",
            name: "Ekran Kartları",
            department: "IT",
          },
        ],
      },
      {
        id: "3-2",
        code: "3002",
        name: "Ağ Ekipmanları",
        department: "IT",
        subSubCategories: [],
      },
    ],
  },
  {
    id: "4",
    code: "004",
    name: "Temizlik Malzemeleri",
    department: "Genel İşler",
    subCategories: [
      {
        id: "4-1",
        code: "4001",
        name: "Deterjanlar",
        department: "Genel İşler",
        subSubCategories: [
          {
            id: "4-1-1",
            code: "401",
            name: "Bulaşık Deterjanı",
            department: "Genel İşler",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    code: "005",
    name: "Mobilya ve Dekorasyon",
    department: "İç Dizayn",
    subCategories: [
      {
        id: "5-1",
        code: "5001",
        name: "Ofis Mobilyaları",
        department: "İç Dizayn",
        subSubCategories: [],
      },
    ],
  },
]

export default function NestedAccordionTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const itemsPerPage = 3

  const totalPages = Math.ceil(dummyData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = dummyData.slice(startIndex, startIndex + itemsPerPage)

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const ActionButtons = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onEdit}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onDelete}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Düzenle</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ürün Grupları</h1>
          <p className="text-gray-600 mt-1">Ürün grubu ekleyin, güncelleyin, yönetin.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Ana Ürün Grubu Oluştur
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Ana Kod</TableHead>
              <TableHead className="font-semibold text-gray-700">Ana Ürün Grubu Adı</TableHead>
              <TableHead className="font-semibold text-gray-700">İlgili Departman</TableHead>
              <TableHead className="w-32"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((mainCategory) => (
              <TableRow key={mainCategory.id} className="border-b">
                <TableCell colSpan={4} className="p-0">
                  <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems}>
                    <AccordionItem value={mainCategory.id} className="border-none">
                      <div className="flex items-center px-6 py-4">
                        <div className="flex-1 grid grid-cols-3 gap-4">
                          <div className="font-medium">{mainCategory.code}</div>
                          <div>{mainCategory.name}</div>
                          <div className="text-gray-600">{mainCategory.department}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ActionButtons
                            onEdit={() => console.log("Edit main category:", mainCategory.id)}
                            onDelete={() => console.log("Delete main category:", mainCategory.id)}
                          />
                          <AccordionTrigger className="hover:no-underline p-2">
                            {expandedItems.includes(mainCategory.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </AccordionTrigger>
                        </div>
                      </div>

                      <AccordionContent className="pb-0">
                        <div className="bg-blue-50 border-l-4 border-teal-500">
                          {/* Sub Categories Header */}
                          <div className="flex items-center justify-between px-6 py-3 bg-blue-100">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                              <span className="font-medium text-teal-700">Ara Ürün Grubu</span>
                              <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                                {mainCategory.subCategories.length}
                              </span>
                            </div>
                            <Button variant="outline" size="sm" className="text-teal-600 border-teal-600">
                              <Plus className="h-4 w-4 mr-1" />
                              Ara Ürün Grubu Oluştur
                            </Button>
                          </div>

                          {/* Sub Categories */}
                          {mainCategory.subCategories.map((subCategory) => (
                            <div key={subCategory.id} className="border-b border-blue-200 last:border-b-0">
                              <div className="flex items-center px-6 py-3 bg-white ml-8">
                                <div className="flex-1 grid grid-cols-3 gap-4">
                                  <div className="text-gray-600">{subCategory.code}</div>
                                  <div>{subCategory.name}</div>
                                  <div className="text-gray-600">{subCategory.department}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ActionButtons
                                    onEdit={() => console.log("Edit sub category:", subCategory.id)}
                                    onDelete={() => console.log("Delete sub category:", subCategory.id)}
                                  />
                                  {subCategory.subSubCategories.length > 0 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleExpanded(`sub-${subCategory.id}`)}
                                    >
                                      {expandedItems.includes(`sub-${subCategory.id}`) ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {/* Sub-Sub Categories */}
                              {expandedItems.includes(`sub-${subCategory.id}`) &&
                                subCategory.subSubCategories.length > 0 && (
                                  <div className="bg-gray-50 ml-12">
                                    <div className="flex items-center justify-between px-6 py-2 bg-gray-100 border-b">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Alt Ürün Grubu</span>
                                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                          {subCategory.subSubCategories.length}
                                        </span>
                                      </div>
                                      <Button variant="outline" size="sm" className="text-teal-600 border-teal-600">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Alt Ürün Grubu Ekle
                                      </Button>
                                    </div>

                                    {subCategory.subSubCategories.map((subSubCategory) => (
                                      <div
                                        key={subSubCategory.id}
                                        className="flex items-center px-6 py-3 bg-white border-b border-gray-200 last:border-b-0 ml-4"
                                      >
                                        <div className="flex-1 grid grid-cols-3 gap-4">
                                          <div className="text-gray-500 text-sm">Alt Ürün Grubu Kodu</div>
                                          <div className="text-gray-500 text-sm">Alt Ürün Grubu Adı</div>
                                          <div className="text-gray-500 text-sm">İlgili Departman</div>
                                        </div>
                                      </div>
                                    ))}

                                    {subCategory.subSubCategories.map((subSubCategory) => (
                                      <div
                                        key={`data-${subSubCategory.id}`}
                                        className="flex items-center px-6 py-3 bg-white border-b border-gray-200 last:border-b-0 ml-4"
                                      >
                                        <div className="flex-1 grid grid-cols-3 gap-4">
                                          <div>{subSubCategory.code}</div>
                                          <div>{subSubCategory.name}</div>
                                          <div className="text-gray-600">{subSubCategory.department}</div>
                                        </div>
                                        <ActionButtons
                                          onEdit={() => console.log("Edit sub-sub category:", subSubCategory.id)}
                                          onDelete={() => console.log("Delete sub-sub category:", subSubCategory.id)}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, dummyData.length)} of {dummyData.length}{" "}
          entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
