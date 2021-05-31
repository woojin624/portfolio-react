import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ColorPicker } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import styles from './AdminWrite.module.scss';

const ColorTab = ({ color, setColor }) => {
  const [colorOpen, setColorOpen] = useState(false);

  const colorTabHandler = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setColorOpen(!colorOpen);
  };

  const colorTabClose = () => {
    setColorOpen(false);
  };

  return (
    <div className={styles.colorTab} onClick={colorTabHandler}>
      {color ? (
        <>
          <p onClick={colorTabHandler}>{color.hex}</p>
          <div onClick={colorTabHandler} className={styles.colorBox} style={{ backgroundColor: color.hex }}></div>
          {colorOpen ? (
            <div className={styles.colorPickerWrap}>
              <div>
                <h3>Color Picker</h3>
                <AiFillCloseCircle onClick={colorTabClose} style={{ fontSize: '22px', cursor: 'pointer' }} />
              </div>
              <ColorPicker width={268} height={180} color={color} onChange={setColor} hideHSV dark />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ColorTab;
