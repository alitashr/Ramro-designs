import * as React from 'react';

export interface IFooterProps {
}

export default function Footer (props: IFooterProps) {
  const OpenLink = (link: string)=> {
    window.open(link,'_blank')
  }
  return (
    <div className="rd-footer">
    <div className="rd-subtext">
      © Alternative Technology 2020 - All rights reserved
    </div>
    <div className="rd-footer-texts">
      <p>Disclaimer</p> | <p>Privacy Policy</p> | <p onClick={()=>OpenLink('https://ramrodesigns.com/termsofuse.html')}>Terms of Use</p>
    </div>
  </div>
  );
}
