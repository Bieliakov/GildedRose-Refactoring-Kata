const {Shop, Item} = require("../src/gilded_rose");
const { mockNomralItems, mockAgedBrieItems } = require("./mockData");

describe("Gilded Rose", function() {
  describe("for normal items decrease quality", function() {
    let mockNomralItemsCopy = [];
    let gildedRose = null;

    beforeEach(() => {
      mockNomralItemsCopy = [...mockNomralItems];
      gildedRose = new Shop(mockNomralItemsCopy);
    });

    it("for one item", function() {
      gildedRose = new Shop([{ name: "test 1", sellIn: 10, quality: 20 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    
    it("quality not decreases below 0", function() {
      gildedRose = new Shop([{ name: "test 1", sellIn: 0, quality: 0 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("if 1 day passes", function() {
      const items = gildedRose.updateQuality();
      expect(items).toMatchSnapshot();
    });
    it("if 5 day passes", function() {
      let items;
      for (let i = 1; i < 5; i++) {
        items = gildedRose.updateQuality();
      }

      expect(items).toMatchSnapshot();
    });
    it("if item's maximum item's day passed", function() {
      const maximumDay = mockNomralItems.reduce((max, item) => Math.max(max, item.sellIn), 0);

      let items;
      for (let i = 1; i <= maximumDay; i++) {
        items = gildedRose.updateQuality();
      }

      expect(items).toMatchSnapshot();
    });
    it("if more then item's maximum item's day passed", function() {
      const maximumDay = mockNomralItems.reduce((max, item) => Math.max(max, item.sellIn), 0);

      let items;
      for (let i = 1; i <= maximumDay + 1; i++) {
        items = gildedRose.updateQuality();
      }

      expect(items).toMatchSnapshot();
    });
  });
  describe("for Aged Brie increase quality", function() {
    let mockAgedBrieItemsCopy = [];
    let gildedRose = null;

    beforeEach(() => {
      mockAgedBrieItemsCopy = [...mockAgedBrieItems];
      gildedRose = new Shop(mockAgedBrieItemsCopy);
    });
    it("for one item", function() {
      gildedRose = new Shop([{ name: "Aged Brie", sellIn: 5, quality: 30 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(31);
    });
    it("if 1 day passes", function() {
      const items = gildedRose.updateQuality();
      expect(items).toMatchSnapshot();
    });

    it("if 5 day passes", function() {
      let items;
      for (let i = 1; i < 5; i++) {
        items = gildedRose.updateQuality();
      }

      expect(items).toMatchSnapshot();
    });

    it("but quality will be no more 50", function() {
      const maximumDay = mockAgedBrieItems.reduce((max, item) => Math.max(max, item.sellIn), 0);

      let items;
      for (let i = 1; i <= maximumDay; i++) {
        items = gildedRose.updateQuality();
      }

      expect(items.reduce((max, item) => Math.max(max, item.quality), 0)).toBeLessThanOrEqual(50);
    });
  });
});
