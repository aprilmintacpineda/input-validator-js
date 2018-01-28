export default {
  required: value => {
    if (!value || !value.length || !value.trim().length) return -1;
  },
  equals: (val, b) => {
    if (val.length && b.length && val != b) return -1;
  },
  min: (val, len) => {
    if (val.length && val.length < len) return -1;
  },
  max: (val, len) => {
    if (val.length && val.length > len) return -1;
  },
  between: (val, min, max) => {
    if (val.length
     && (val.length > max
      || val.length < min)) return -1;
  },
  email: val => {
    if (val && val.length) {
      let regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      if (val.length > 254
      || !regex.test(val)) return -1;

      let [address, domain] = val.split('@');
      let [provider, ext] = domain.split('.');

      if (address.length > 64
      || provider.length > 63
      || ext.length > 63) return -1;
    }
  },
  in: (...args) => {
    let value = args.shift();

    if (value.length && !args.includes(value)) return -1;
  },
  allowedChars(...args) {
    let value = args.shift();
    let regex = '';

    if (args.includes('alphabets')) regex += 'A-Za-z';
    if (args.includes('spaces')) regex += ' ';
    if (args.includes('numbers')) regex += '0-9';

    regex = new RegExp(`[^${regex}]+`, 'igm');

    if (regex.test(value)) return -1;
  }
};