import * as React from 'react';
import './style.css';

export default function App() {
  const data = [{ str: 'hello' }, { str: 'Bye!!!!!!' }];
  const [lists, setLists] = React.useState(data);
  const [dragItem, setDragItem] = React.useState(null);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [isDragUpper, setIsDragUpper] = React.useState(false);

  const onDragStart = (e) => {
    setDragItem(e.currentTarget);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    const currentDragTarget = e.currentTarget;
    const currentDragTargetRect = currentDragTarget.getBoundingClientRect();
    // 이 조건이 true면 다른 대상 위에 올라가있다는 뜻
    if (e.currentTarget !== dragItem) {
      if (
        e.clientY <
        currentDragTargetRect.top + currentDragTarget.offsetHeight / 2
      ) {
        // top + height/2 >> 대상 1/2 윗쪽에 커서가 있다면
        setIsDragUpper(true);
      } else {
        // 아랫쪽에 커서가 있다면
        setIsDragUpper(false);
      }
    }

    if (e.currentTarget !== dragTarget) {
      setDragTarget(e.currentTarget);
    }
  };
  console.log(isDragUpper);
  const onDragEnd = (e) => {
    e.preventDefault();
    const dragItemPos = +dragItem.dataset.position;
    const dragTargetPos = +dragTarget.dataset.position;
    setLists((current) => {
      const newLists = [...current];
      newLists[dragItemPos] = current[dragTargetPos];
      newLists[dragTargetPos] = current[dragItemPos];
      return newLists;
    });
  };

  return (
    <div>
      {lists.map((item, index) => {
        return (
          <h1
            key={index}
            data-position={index}
            draggable={true}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            style={{ border: '1px solid red' }}
          >
            {item.str}
          </h1>
        );
      })}
    </div>
  );
}
