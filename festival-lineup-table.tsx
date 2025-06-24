'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react'

// JSON data
const rawData = [
  ['Act', 'Genre', 'Why/How Prominent'],
  ['Âme', 'Deep house / Tech-house', 'German duo on Innervisions; global festival headliners since "Rej"'],
  ['Dubfire', 'Techno', 'Ex-Deep Dish member, global techno icon'],
  ['DVS1', 'Techno', 'High-profile U.S. techno DJ'],
  ['Ian Pooley', 'House', 'Veteran German producer with decades of releases'],
  ['Robag Wruhme', 'Minimal / Deep Techno', 'Respected producer featured on Dirtybird Radio'],
  ['Mind Against', 'Techno', 'Italian duo known for melodic techno'],
  ['Cinthie b2b Meat', 'Techno / House', 'Berlin underground favorites'],
  ['Michael Mayer', 'Minimal / Deep Techno', 'Kompakt Records founder, long-time club promoter'],
  ['Rampue', 'Minimal / Deep House', 'Berlin-based melodic house standout'],
  ['Gregor Tresher', 'Techno', 'Beatport chart fixture'],
  ['Andhim', 'House / Tech-house', 'Festival mainstays with uplifting sets'],
  ['Parra for Cuva', 'Downtempo Electronica', 'Known for melodic, guitar-infused productions'],
  ['Kishi Bashi', 'Indie Pop / Orchestral', 'U.S. multi-instrumentalist with captivating live performance'],
  ['Dobet Gnahoré', 'Afro-Soul / World Music', 'Ivorian singer noted for rich fusion music'],
  ['Dirty Sound Magnet', 'Rock-Electronic Fusion', 'Swiss crossover band with strong festival presence'],
  ['King Buffalo', 'Psychedelic Rock', 'U.S. psych-rock band praised for immersive live shows'],
  ['Model/Actriz', 'Art-Punk', 'Rising act gaining international attention'],
  ['Rich Aucoin', 'Electro-Pop / Rock', 'Canadian known for energetic festival performances'],
  ['Anja Schneider', 'Techno', 'Berlin label and club founder'],
  ['Christian Smith', 'Techno', 'Global touring techno producer'],
  ['Anna Reusch', 'Techno / House', 'Berlin-based selector with club influence'],
  ['Ankytrixx', 'Dub-Techno', 'Berlin-based Jamaican dub innovator'],
  ['Andy Snatch', 'Techno', 'Renowned Berlin DJ and producer'],
  ['Andy S', 'House / Techno', 'Underground Berlin staple'],
  ['Borella', 'Techno / House', 'Emerging producer recognized across Europe'],
  ['Sebastian Mullaert', 'Techno / Electronica', 'Frequently included in Fusion programming'],
  ['Sven Dohse', 'Deep Electronica', 'Known from Fusion line-ups'],
  ['BUSH.IDA', 'Global-Electronic Fusion', 'Listed in leaked lineup'],
  ['Die Anstalt', 'German Punk / Satire', 'Notable underground act'],
  ['Fastmusic', 'Electronic Dance', 'Listed in leaks'],
  ['Parra for Cuva', 'Downtempo Electronica', 'Confirmed via Instagram leak'],
  ['Mira', 'Trance / Live', 'Forum reports mix on Turmbühne'],
  ['UTO', 'World Electronica', 'Leaked via Bandsintown'],
  ['Masma Dream World', 'Experimental Electronica', 'Leaked via Instagram'],
  ['Flanko', 'Techno', 'Forum leak with date'],
  ['Stuzzi', 'Techno', 'Leaked via Bandsintown'],
  ['Mira', 'Trance DJ', 'Forum mention by Reddit user'],
  ['Masma Dream World', 'Experimental Electronica', 'Forums'],
  ['Sven Dohse', 'Deep Electronica', 'Repeated inclusion in Fusion lineups'],
]

type SortConfig = {
  key: string
  direction: 'asc' | 'desc'
}

type TableData = {
  act: string
  genre: string
  prominence: string
}

export default function FestivalLineupTable() {
  const [filterText, setFilterText] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'act', direction: 'asc' })

  // Parse the raw data
  const headers = rawData[0]
  const tableData: TableData[] = rawData.slice(1).map((row) => ({
    act: row[0],
    genre: row[1],
    prominence: row[2],
  }))

  // Filter and sort the data
  const processedData = useMemo(() => {
    let filteredData = tableData

    // Apply text filter
    if (filterText) {
      filteredData = tableData.filter(
        (item) =>
          item.act.toLowerCase().includes(filterText.toLowerCase()) ||
          item.genre.toLowerCase().includes(filterText.toLowerCase()) ||
          item.prominence.toLowerCase().includes(filterText.toLowerCase())
      )
    }

    // Apply sorting
    if (sortConfig) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof TableData]
        const bValue = b[sortConfig.key as keyof TableData]

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filteredData
  }, [tableData, filterText, sortConfig])

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }

    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
    }

    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 text-red-400" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-red-400" />
    )
  }

  return (
    <div className="w-full space-y-3 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-red-400" />
          <Input
            placeholder="Filter by act, genre, or description..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="min-w-3xs bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-red-500 h-8"
          />
          {filterText && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterText('')}
              className="bg-red-900 border-red-700 text-red-100 hover:bg-red-800 h-8 px-3"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          Showing {processedData.length} of {tableData.length} acts, sorted by {sortConfig.key} (
          {sortConfig.direction === 'asc' ? 'ascending' : 'descending'})
        </div>
      </div>

      <div className="rounded-md border border-gray-800 bg-gray-900">
        <Table>
          <TableHeader className="bg-gray-800">
            <TableRow className="border-gray-700 hover:bg-gray-800">
              <TableHead className="w-[200px] py-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('act')}
                  className="h-auto p-0 font-semibold text-red-400 hover:text-red-300 hover:bg-gray-700"
                >
                  {headers[0]}
                  {getSortIcon('act')}
                </Button>
              </TableHead>
              <TableHead className="w-[250px] py-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('genre')}
                  className="h-auto p-0 font-semibold text-red-400 hover:text-red-300 hover:bg-gray-700"
                >
                  {headers[1]}
                  {getSortIcon('genre')}
                </Button>
              </TableHead>
              <TableHead className="py-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('prominence')}
                  className="h-auto p-0 font-semibold text-red-400 hover:text-red-300 hover:bg-gray-700"
                >
                  {headers[2]}
                  {getSortIcon('prominence')}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData.length === 0 ? (
              <TableRow className="border-gray-700">
                <TableCell colSpan={3} className="h-16 text-center text-gray-400">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((item, index) => (
                <TableRow key={`${item.act}-${index}`} className="border-gray-700 hover:bg-gray-800">
                  <TableCell className="font-medium text-white py-2">{item.act}</TableCell>
                  <TableCell className="py-2">
                    <span className="inline-flex items-center rounded-full bg-red-900 px-2 py-1 text-xs font-medium text-red-100 ring-1 ring-inset ring-red-700">
                      {item.genre}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-300 py-2">{item.prominence}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
