import 'components/printer/fake-printer/FakePrinter.css';
import React from 'react';

interface Props {
  readonly children: React.ReactNode;
  readonly onFinished: () => void;
}

export const FakePrinter: React.FC<Props> = ({children, onFinished}) => {
  const printableRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    const iframe = window.document.createElement('iframe');
    window.document.body.appendChild(iframe);

    const onFinish = () => {
      window.document.body.removeChild(iframe);
      onFinished();
    };

    iframe.src = 'javascript:void(0)';
    iframe.style.display = 'none';
    iframe.contentWindow.addEventListener('afterprint', onFinish);
    iframe.contentWindow.addEventListener('beforeunload', onFinish);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(printableRef.current.innerHTML);
    iframe.contentWindow.document.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, []);

  return (
    <div className={'FakePrinter_root'}>
      <div ref={printableRef} className={'page'}>
        {children}
      </div>
    </div>
  );
};
