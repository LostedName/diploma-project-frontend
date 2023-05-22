import { createRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import './cellInput.scss';
export type CellInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cellNumber: number;
  isFilled?: boolean;
  sixDigitCode: string;
  authErrorMessage: string;
  setSixDigitCode: (sixDigitCode: string) => void;
  setAuthErrorMessage: (errorLengthMessage: string) => void;
};

const CellInput: React.FC<CellInputProps> = ({
  sixDigitCode,
  setSixDigitCode,
  setAuthErrorMessage,
  cellNumber,
  authErrorMessage,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [cellValues, setCellValues] = useState<string[]>(Array.from(''.repeat(cellNumber)));
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>(
    Array(cellNumber)
      .fill(null)
      .map(() => createRef())
  );
  Array.from(Array(cellNumber)).map((ref, index) => (inputRefs.current[index] = createRef()));

  const onCellChange = (order: number, inputSign: string) => {
    setCellValues((prev) => {
      const newCellValues = [...prev];
      newCellValues[order] = inputSign.slice(-1).toUpperCase();
      if (inputSign && order !== cellNumber - 1) {
        inputRefs.current[order + 1].current?.focus();
      }
      setSixDigitCode(newCellValues.join(''));
      if (sixDigitCode.length < 6) {
        setAuthErrorMessage("");
      }
      return newCellValues;
    });
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // const getClipboard = (text: string[]) => {
  //   for (let i = 0; i < cellNumber; i++) {
  //     const inputRef = inputRefs?.current[i];
  //     if (inputRef?.current && isMounted) {
  //       inputRef.current.value = text[i];
  //     }
  //     onCellChange(i, text[i]);
  //     if (text.length < 6) {
  //       setAuthErrorMessage('Код должен состоять из 6-ти символов');
  //       if (i === text.length - 1) {
  //         break;
  //       }
  //     } else {
  //       setAuthErrorMessage('');
  //     }
  //   }
  // };

  const onKeyDown = (order: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!e.currentTarget.value && inputRefs.current[order - 1]) {
        inputRefs.current[order - 1].current?.focus();
      }
    }
  };

  // const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
  //   const pasteString = event.clipboardData?.getData('Text').split('');
  //   console.log("ON PASTE", pasteString);
  //   getClipboard(pasteString);
  // };

  const renderInputs = (): ReactNode[] => {
    const inputs: ReactNode[] = [];
    inputRefs.current.forEach((inputRef, i) => {
      inputs.push(
        <input
          className={`${!!authErrorMessage ? 'border-error' : ''}`}
          ref={inputRef}
          // eslint-disable-next-line react/no-array-index-key
          key={i.toString()} //TODO fix it a bit later
          value={cellValues[i] || ''}
          onKeyDown={onKeyDown(i)}
          // onPaste={onPaste}
          onChange={(e) => {
            onCellChange(i, e.target.value);
          }}
          type="text"
        />
      );
    });
    return inputs;
  };

  return <div id="cells_container">{renderInputs()}</div>;
};

export default CellInput;
