import * as React from 'react';

export interface IDesignColorsContainerProps {
  designColors: any
}

export default function DesignColorsContainer (props: IDesignColorsContainerProps) {
  const designColors = props.designColors
  return (
    <div className='rd-design-colors-container'>
    { designColors && designColors.map((designColor:any, index:number)=> {
      return (
      <div className="rd-colorpatch" key={index}
      style={{
        backgroundColor:designColor.Color
      }}>
     {designColor.ColorName}
     </div>)
    }
      )}
    </div>
  );
}
