class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// Base item handler with common logic
class ItemHandler {
  constructor(item) {
    this.item = item;
  }

  update() {
    this.updateQuality();
    this.updateSellIn();
    this.updateQualityAfterExpired();
  }

  updateQuality() {
    this.decreaseQuality(1);
  }

  updateSellIn() {
    this.item.sellIn -= 1;
  }

  updateQualityAfterExpired() {
    if (this.item.sellIn < 0) {
      this.decreaseQuality(1);
    }
  }

  increaseQuality(amount = 1) {
    if (this.item.quality < 50) {
      this.item.quality = Math.min(50, this.item.quality + amount);
    }
  }

  decreaseQuality(amount = 1) {
    if (this.item.quality > 0) {
      this.item.quality = Math.max(0, this.item.quality - amount);
    }
  }
}

// Handler for Aged Brie
class AgedBrieHandler extends ItemHandler {
  updateQuality() {
    this.increaseQuality(1);
  }

  updateQualityAfterExpired() {
    if (this.item.sellIn < 0) {
      this.increaseQuality(1);
    }
  }
}

// Handler for Backstage passes
class BackstagePassHandler extends ItemHandler {
  updateQuality() {
    this.increaseQuality(1);

    if (this.item.sellIn < 11) {
      this.increaseQuality(1);
    }

    if (this.item.sellIn < 6) {
      this.increaseQuality(1);
    }
  }

  updateQualityAfterExpired() {
    if (this.item.sellIn < 0) {
      this.item.quality = 0;
    }
  }
}

// Handler for Sulfuras, which doesn't change
class SulfurasHandler extends ItemHandler {
  updateQuality() {
    // Quality doesn't change
  }

  updateSellIn() {
    // Sell-in doesn't change
  }

  updateQualityAfterExpired() {
    // Nothing happens after expiry
  }
}

// Handler for Conjured items
class ConjuredItemHandler extends ItemHandler {
  updateQuality() {
    this.decreaseQuality(2);
  }

  updateQualityAfterExpired() {
    if (this.item.sellIn < 0) {
      this.decreaseQuality(2);
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      const handler = this.createHandlerForItem(item);
      handler.update();
    });

    return this.items;
  }

  createHandlerForItem(item) {
    if (item.name === 'Aged Brie') {
      return new AgedBrieHandler(item);
    }
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      return new BackstagePassHandler(item);
    }
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return new SulfurasHandler(item);
    }
    if (item.name.includes('Conjured')) {
      return new ConjuredItemHandler(item);
    }
    return new ItemHandler(item);
  }
}

module.exports = {
  Item,
  Shop
}
