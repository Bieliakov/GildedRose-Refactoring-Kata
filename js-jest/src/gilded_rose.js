const { ITEM_NAMES, QUALITY, SELLIN } = require('./constants');

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// Simplified base ItemHandler with minimal shared logic
class ItemHandler {
  constructor(item) {
    this.item = item;
  }

  update() {
    this.updateQuality();
    this.updateSellIn();
    
    if (this.item.sellIn < SELLIN.EXPIRED) {
      this.updateExpiredItemQuality();
    }
  }

  // Default implementations - subclasses can override as needed
  updateQuality() {}
  updateExpiredItemQuality() {}
  
  updateSellIn() {
    this.item.sellIn -= 1;
  }

  // Utility methods for subclasses to use
  increaseQuality(amount = 1) {
    if (this.item.quality < QUALITY.MAX) {
      this.item.quality = Math.min(QUALITY.MAX, this.item.quality + amount);
    }
  }

  decreaseQuality(amount = 1) {
    if (this.item.quality > QUALITY.MIN) {
      this.item.quality = Math.max(QUALITY.MIN, this.item.quality - amount);
    }
  }
}

// Handler for normal items
class NormalItemHandler extends ItemHandler {
  updateQuality() {
    this.decreaseQuality();
  }

  updateExpiredItemQuality() {
    this.decreaseQuality();
  }
}

class AgedBrieHandler extends ItemHandler {
  updateQuality() {
    this.increaseQuality();
  }

  updateExpiredItemQuality() {
    this.increaseQuality();
  }
}

class BackstagePassHandler extends ItemHandler {
  updateQuality() {
    this.increaseQuality(1);
    
    if (this.item.sellIn <= SELLIN.BACKSTAGE_TIER_1) {
      this.increaseQuality(1);
    }

    if (this.item.sellIn <= SELLIN.BACKSTAGE_TIER_2) {
      this.increaseQuality(1);
    }
  }

  updateExpiredItemQuality() {
    this.item.quality = QUALITY.MIN;
  }
}

// Handler for Sulfuras, which doesn't change
class SulfurasHandler extends ItemHandler {}

class ConjuredItemHandler extends ItemHandler {
  updateQuality() {
    this.decreaseQuality(2);
  }

  updateExpiredItemQuality() {
    this.decreaseQuality(2);
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
    if (item.name === ITEM_NAMES.AGED_BRIE) {
      return new AgedBrieHandler(item);
    }
    if (item.name === ITEM_NAMES.BACKSTAGE_PASSES) {
      return new BackstagePassHandler(item);
    }
    if (item.name === ITEM_NAMES.SULFURAS) {
      return new SulfurasHandler(item);
    }
    if (item.name.includes(ITEM_NAMES.CONJURED)) {
      return new ConjuredItemHandler(item);
    }
    return new NormalItemHandler(item);
  }
}

module.exports = {
  Item,
  Shop
}
