const {Shop, Item} = require("../src/gilded_rose");
const { mockNomralItems } = require("./mockData");

describe("Gilded Rose", function() {
  describe("for normal items", function() {
    it("properly decrease quality if 1 day passes", function() {
      const gildedRose = new Shop(mockNomralItems);
      const items = gildedRose.updateQuality();
      expect(items).toMatchSnapshot();
    });
  });
});
