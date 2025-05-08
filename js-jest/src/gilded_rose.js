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
    
    if (this.item.sellIn < 0) {
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
    
    if (this.item.sellIn < 11) {
      this.increaseQuality(1);
    }

    if (this.item.sellIn < 6) {
      this.increaseQuality(1);
    }
  }

  updateExpiredItemQuality() {
    this.item.quality = 0;
  }
}

// Handler for Sulfuras, which doesn't change
class SulfurasHandler extends ItemHandler {
  updateQuality() {
    // Quality never changes for Sulfuras
  }
}

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
    if (item.name === 'Aged Brie') {
      return new AgedBrieHandler(item);
    }
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      return new BackstagePassHandler(item);
    }
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return new SulfurasHandler(item);
    }
    if (item.name.toLowerCase().includes('Conjured'.toLocaleLowerCase())) {
      return new ConjuredItemHandler(item);
    }
    return new NormalItemHandler(item);
  }
}

module.exports = {
  Item,
  Shop
}
