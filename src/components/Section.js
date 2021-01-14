export default class Section{
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  renderItems(items){
    items.forEach(item=>{
      this._renderer(item);
    })
  }

  addItem(node){
    this._container.prepend(node);
  }
}