const dragLayout = document.querySelector('.drag-layout');

let activeIndex = -1;
let dragToIndex = -1;
let prevItems = [];

function getItemIndex(item){
  let elem = item;
  let index = -1;
  if(!elem || !elem.parentElement){
    return index;
  }
  index = 0;
  elem = elem.previousElementSibling;
  while(elem){
    index++;
    elem = elem.previousElementSibling;
  }
  return index;
}

dragLayout.addEventListener('dragstart', (e) => {
  const dom = e.target;
  const isItem = dom.classList.contains('drag-item');
  if(isItem){
    const itemDOMs = document.querySelectorAll('.drag-item');
    prevItems = Array.from(itemDOMs);

    const itemIndex = getItemIndex(dom);
    activeIndex = itemIndex;
    dom.classList.add('active');
  }
})

dragLayout.addEventListener('dragover', (e) => {
  e.preventDefault();
  const dom = e.target;
  const isItem = dom.classList.contains('drag-item');
  if(isItem){
    const overItemIndex = getItemIndex(dom);
    dragToIndex = overItemIndex;
    resetItems();
  }
});

function resetItems(){
  if(!prevItems[activeIndex]){
    return;
  }
  if(dragToIndex >= 0 && dragToIndex <  prevItems.length){
    const newList = prevItems.map((item) => item);
    const [activeItem] = newList.splice(activeIndex, 1);
    if(dragToIndex === 0){
      newList.unshift(activeItem);
    }else{
      newList.splice(dragToIndex,0,activeItem);
    }
    Array.from(dragLayout.children).forEach((child)=>{
      dragLayout.removeChild(child);
    });
    newList.forEach((item)=>{
      dragLayout.appendChild(item)
    })
  }
}

dragLayout.addEventListener('dragend', (e)=>{
  e.preventDefault();
  prevItems.forEach((item)=>{
    item.classList.remove('active');
  });
  dragToIndex = -1;
  activeIndex = -1;
})