const {Shop, Item} = require("../src/gilded_rose");
const { ITEM_NAMES, QUALITY, SELLIN } = require('../src/constants');
const { mockNomralItems, mockAgedBrieItems, mockBackstageItems } = require("./mockData");

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
      gildedRose = new Shop([{ name: "test 1", sellIn: 0, quality: QUALITY.MIN }]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY.MIN);
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
      gildedRose = new Shop([{ name: ITEM_NAMES.AGED_BRIE, sellIn: 5, quality: 30 }]);
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

      expect(items.reduce((max, item) => Math.max(max, item.quality), 0)).toBeLessThanOrEqual(QUALITY.MAX);
    });
  });

  describe("for Sulfuras, Hand of Ragnaros", function() {
    let gildedRose = null;

    beforeEach(() => {
      gildedRose = new Shop([{ name: ITEM_NAMES.SULFURAS, sellIn: 1, quality: QUALITY.LEGENDARY }]);
    });

    it("quality will not change", function() {
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY.LEGENDARY);
    });
  });

  describe("for Backstage passes to a TAFKAL80ETC concert", function() {
    let mockBackstageItemsCopy = [];
    let gildedRose = null;

    beforeEach(() => {
      mockBackstageItemsCopy = [...mockBackstageItems];
      gildedRose = new Shop(mockBackstageItemsCopy);
    });

    it("if more then 10 days left normal increase in quality", function() {
      gildedRose = new Shop([{ name: ITEM_NAMES.BACKSTAGE_PASSES, sellIn: 11, quality: 20 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(21);
    });

    it("if 10 days left double increase in quality", function() {
      gildedRose = new Shop([{ name: ITEM_NAMES.BACKSTAGE_PASSES, sellIn: SELLIN.BACKSTAGE_TIER_1, quality: 20 }]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(22);
    });

    it("if 6 days left double increase in quality", function() {
      gildedRose = new Shop([{ name: ITEM_NAMES.BACKSTAGE_PASSES, sellIn: 6, quality: 20 }]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(22);
    });

    it("if 5 days left triple increase in quality", function() {
      gildedRose = new Shop([{ name: ITEM_NAMES.BACKSTAGE_PASSES, sellIn: SELLIN.BACKSTAGE_TIER_2, quality: 20 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it("if 1 days left triple increase in quality", function() {
      gildedRose = new Shop([{ name: ITEM_NAMES.BACKSTAGE_PASSES, sellIn: 1, quality: 20 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it("if 0 or less days left value drops to 0", function() {
      gildedRose = new Shop([{ name: ITEM_NAMES.BACKSTAGE_PASSES, sellIn: SELLIN.EXPIRED, quality: 20 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY.MIN);
    });

    it("but quality will be no more 50", function() {
      const maximumDay = mockBackstageItems.reduce((max, item) => Math.max(max, item.sellIn), 0);

      let items;
      for (let i = 1; i <= maximumDay; i++) {
        items = gildedRose.updateQuality();
      }

      expect(items.reduce((max, item) => Math.max(max, item.quality), 0)).toBeLessThanOrEqual(QUALITY.MAX);
    });
  });

  describe("for conjured items ", function() {
    it("double decrease quality", function() {
      const gildedRose = new Shop([{ name: ITEM_NAMES.CONJURED + " Mana Cake", sellIn: 3, quality: 6 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(4);
    });

    
    it("quality not decreases below 0", function() {
      const gildedRose = new Shop([{ name: ITEM_NAMES.CONJURED + " Mana Cake", sellIn: 2, quality: 1 }]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY.MIN);
    });
  });
});
