export function getCommonAttributes(variants) {
  const attrs = [];

  variants.forEach((item) => {
    item.attrs.forEach((attr) => {
      const index = attrs.findIndex(
        (el) => el.name === attr.name && el.value === attr.value
      );
      if (index !== -1) attrs[index].count += 1;
      else attrs.push({ name: attr.name, value: attr.value, count: 1 });
    });
  });

  return attrs.filter((item) => item.count === variants.length);
}

export function getDiscount(variant) {
  const { sp, mp } = variant;
  const discount = ((mp - sp) / mp) * 100;
  return discount.toFixed(0);
}

export function getDifferent(variant) {
  const res = [];
  const req = ["Size", "Color"];

  variant.attrs.forEach((attr) => {
    if (req.includes(attr.name)) res.push(attr);
  });

  return res.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function getDDValuesForQty(stock) {
  let res = [];

  for (let i = 1; i <= 10 && i < stock; ++i) {
    res.push(i);
  }

  return res;
}
