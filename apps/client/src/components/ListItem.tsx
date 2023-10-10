import React, { useState } from 'react';
import styles from './ListItem.module.css';

interface ListItemProps {
  key: number;
  start: string;
  end: string;
  subtitle: string;
}

const ListItem: React.FC<ListItemProps> = ({ start, end, subtitle }) => {

  const [text, setText] = useState(subtitle);
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (e: any) => {
    setText(e.target.innerText);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditEnd = () => {
    setIsEditing(false);
  };

  return (
      <div className={styles.item}>
        <div className={styles.timeColumn}>
          {start}
          <br />
          {end}
        </div>
        <div
          className={styles.textColumn}
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onClick={handleEditStart}
          onBlur={handleEditEnd}
          onInput={handleTextChange}>
          {text}
        </div>
      </div>
  );
};

export default ListItem;
