'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react'

// JSON data
const rawData = [
  ['Act', 'Genre', 'Description'],
  [
    'Âme',
    'Deep house / Tech-house',
    'German duo Kristian Beyer & Frank Wiedemann run Innervisions, known for emotional, forward-thinking techno and the classic “Rej”.',
  ],
  ['Andhim', 'House / Tech-house', 'German duo celebrated for uplifting, melodic house sets at major festivals.'],
  ['Andy S', 'House / Techno', "Long-standing member of Berlin's underground electronic scene."],
  ['Andy Snatch', 'Techno', 'Berlin-based DJ and producer with a strong underground reputation.'],
  ['Anja Schneider', 'Techno', "Founder of Mobilee Records and staple of Berlin's techno community."],
  ['Ankytrixx', 'Dub-Techno', 'Berlin-based producer combining Jamaican dub roots with techno textures.'],
  ['Anna Reusch', 'Techno / House', 'Berlin selector and producer known for vibrant club and festival sets.'],
  ['Borella', 'Techno / House', 'Emerging European producer gaining recognition in the club circuit.'],
  ['BUSH.IDA', 'Global-Electronic Fusion', 'Live global-electronic act featured in recent Fusion lineup leaks.'],
  ['Christian Smith', 'Techno', 'Internationally touring techno producer and frequent festival headliner.'],
  ['Cinthie b2b Meat', 'Techno / House', 'Berlin underground favorites known for b2b club performances.'],
  ['Die Anstalt', 'German Punk / Satire', 'Underground punk-satire band with cult appeal.'],
  [
    'Dirty Sound Magnet',
    'Rock-Electronic Fusion',
    'Swiss band blending rock and electronic styles with festival impact.',
  ],
  ['Dobet Gnahoré', 'Afro-Soul / World Music', 'Ivorian singer whose rich vocal fusion has worldwide acclaim.'],
  ['Dubfire', 'Techno', 'Iranian-American DJ/producer and Grammy-winning Deep Dish veteran, leading minimal techno.'],
  ['DVS1', 'Techno', 'U.S. techno heavyweight famous for dark, immersive DJ sets.'],
  ['Fastmusic', 'Electronic Dance', 'Festival dance-floor act noted in lineup leaks.'],
  ['Flanko', 'Techno', 'Techno DJ featured in community lineup leaks.'],
  ['Gregor Tresher', 'Techno', 'German producer regularly appearing on Beatport charts.'],
  ['Ian Pooley', 'House', 'Veteran German house producer with decades of dancefloor hits.'],
  ['King Buffalo', 'Psychedelic Rock', 'American psych-rock trio praised for immersive live performances.'],
  [
    'Kishi Bashi',
    'Indie Pop / Orchestral',
    'American multi-instrumentalist known for orchestral, loop-based live shows.',
  ],
  ['Masma Dream World', 'Experimental Electronica', 'An experimental electronica act featured in festival leaks.'],
  ['Michael Mayer', 'Minimal / Deep Techno', 'Founder of Kompakt Records and influential figure in minimal techno.'],
  ['Mind Against', 'Techno', 'Italian duo known for emotive, melodic techno productions and festival sets.'],
  ['Mira', 'Trance / Live', 'Trance DJ/producer linked to Turmbühne stage mixes via community reports.'],
  ['Model/Actriz', 'Art-Punk', 'Emerging art-punk band gaining international buzz.'],
  ['Parra for Cuva', 'Downtempo Electronica', 'German producer offering melodic, downtempo live performances.'],
  ['Rampue', 'Minimal / Deep House', 'Berlin-based live house act known for hypnotic minimal sets.'],
  [
    'Rich Aucoin',
    'Electro-Pop / Rock',
    'Canadian stage performer who blends electronic production with energetic live shows.',
  ],
  ['Robag Wruhme', 'Minimal / Deep Techno', 'German producer/DJ respected for deep, playful minimal techno sets.'],
  ['Sebastian Mullaert', 'Techno / Electronica', 'Swedish artist known for melodic techno sets on Fusion’s lineup.'],
  ['Stuzzi', 'Techno', 'Techno DJ included in bandsintown festival line-up leaks.'],
  ['Sven Dohse', 'Deep Electronica', 'German producer featured multiple times in Fusion programming.'],
  ['UTO', 'World Electronica', 'World-electronic project featured in festival leaks.'],
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
