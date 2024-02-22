export function shortenHexString(_hexString: string) {
    if (_hexString === undefined) {
        _hexString = "0x0000000000000000000000000000000"
    }
    const start = _hexString.slice(0, 6);
    const end = _hexString.slice(-6);

    const shortenedString = `${start}...${end}`;
  
    return shortenedString;
  }