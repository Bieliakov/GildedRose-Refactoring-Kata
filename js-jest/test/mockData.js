const mockNomralItems = [
    { name: "test 1", sellIn: 10, quality: 20 },
    { name: "test 2", sellIn: 2, quality: 0 },
    { name: "test 3", sellIn: 5, quality: 7 },
    { name: "Sulfur", sellIn: 0, quality: 80 },
    { name: "Sulfur", sellIn: -1, quality: 80 },
    { name: "Backstage concert", sellIn: 15, quality: 20 },
    { name: "Test Backstage passes TAFKAL80ETC concert", sellIn: 10, quality: 49 },
    { name: "TAFKAL80ETC", sellIn: 5, quality: 49 },
]

const mockAgedBrieItems = [
    { name: "Aged Brie", sellIn: 2, quality: 0 },
    { name: "Aged Brie", sellIn: 3, quality: 10 },
    { name: "Aged Brie", sellIn: 10, quality: 30 },
    { name: "Aged Brie", sellIn: 30, quality: 30 },
]

module.exports = { mockNomralItems, mockAgedBrieItems };