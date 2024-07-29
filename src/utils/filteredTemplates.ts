const componentOrder: string[] = [
  'Bronce 4ta maza LT',
  'Corona 4ta maza LT',
  'Bronce cañera LT',
  'Corona cañera LT',
  'Bronce superior LT',
  'Corona superior LT',
  'Bronce bagacera LT',
  'Corona bagacera LT',
  'Bronce bagacera LS',
  'Corona bagacera LS',
  'Bronce superior LS',
  'Corona superior LS',
  'Bronce cañera LS',
  'Corona cañera LS',
  'Bronce 4ta maza LS',
  'Corona 4ta maza LS',
];

export function filterComponents(arr: any) {
  return arr.sort((a: any, b: any) => {
    // Primero ordenamos por millName
    if (a.millName < b.millName) return -1;
    if (a.millName > b.millName) return 1;

    // Luego ordenamos por tandemNumber
    if (a.tandemNumber < b.tandemNumber) return -1;
    if (a.tandemNumber > b.tandemNumber) return 1;

    // Después ordenamos por el orden específico en componentOrder
    const indexA = componentOrder.indexOf(a.componentName);
    const indexB = componentOrder.indexOf(b.componentName);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // Si uno de los componentes no está en componentOrder, los ponemos al final
    if (indexA === -1 && indexB !== -1) return 1;
    if (indexA !== -1 && indexB === -1) return -1;

    // Finalmente, ordenamos alfabéticamente por componentName si no están en componentOrder
    if (a.componentName < b.componentName) return -1;
    if (a.componentName > b.componentName) return 1;

    return 0;
  });
}
