const {Shop, Item} = require("../src/gilded_rose");
const { mockNomralItems } = require("./mockData");

describe("Gilded Rose", function() {
  describe("for normal items decrease quality", function() {
    let mockNomralItemsCopy = [];
    let gildedRose = null;

    beforeEach(() => {
      mockNomralItemsCopy = [...mockNomralItems];
      gildedRose = new Shop(mockNomralItemsCopy);
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
});
